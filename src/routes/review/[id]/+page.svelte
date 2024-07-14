<script>
	import { formatDate, capitalizeFirstLetter } from '$lib/util.js';
	import Question from '$lib/components/Question.svelte';
	import EditDifferences from '$lib/components/EditDifferences.svelte';
	export let data;

	let { meta } = data;

	const deepDiff = (obj1, obj2, path = '') => {
		// Base case: If both objects are identical, return an empty object.
		if (obj1 === obj2) {
			return {};
		}
		// Check if both objects are objects and not null.
		if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
			const fullPath = path.length > 0 ? `${path}` : 'root';
			return { [fullPath]: { obj1, obj2 } };
		}
		// Get the keys of both objects.
		const keys1 = Object.keys(obj1);
		const keys2 = Object.keys(obj2);
		// Create a difference object.
		let diff = {};
		// Iterate through the keys of the first object.
		for (const key of keys1) {
			const currentPath = path.length > 0 ? `${path}.${key}` : key;
			if (!keys2.includes(key)) {
				diff[currentPath] = { obj1: obj1[key], obj2: undefined };
			} else {
				const keyDiff = deepDiff(obj1[key], obj2[key], currentPath);
				diff = { ...diff, ...keyDiff };
			}
		}
		// Iterate through the keys of the second object to find keys not in the first object.
		for (const key of keys2) {
			if (!keys1.includes(key)) {
				const currentPath = path.length > 0 ? `${path}.${key}` : key;
				diff[currentPath] = { obj1: undefined, obj2: obj2[key] };
			}
		}
		// Return the difference object.
		return diff;
	};
</script>

<div class="">
	<div class="bg-slate-300 w-full p-4 m-4 cursor-pointer">
		<div class="text-2xl">{capitalizeFirstLetter(meta.type)} by {meta.user.username}</div>
		<div>{formatDate(meta.date)}</div>
		<div>Question ID: {meta.questionID}</div>
		<div>Status: {capitalizeFirstLetter(meta.state)}</div>
		<div>Description: {meta.comments}</div>
	</div>

	{#each data.versions as version, i}
		<div class="border border-back p-4 m-4">
			<div>Version {i + 1}</div>
			<div>Authored by {version.user.username}</div>
			<div>{formatDate(version.date)}</div>
			<EditDifferences diffObj={deepDiff(version.oldData, version.newData)} />
		</div>
	{/each}
</div>
