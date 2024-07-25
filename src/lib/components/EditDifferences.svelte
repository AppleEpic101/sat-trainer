<script>
	import { formatDate, capitalizeFirstLetter } from '$lib/util.js';
	import { onMount } from 'svelte';
	import * as diff from 'diff';

	export let message;
	export let index;
	export let _id;

	const deepDiff = (obj1, obj2, path = '') => {
		if (obj1 === obj2) {
			return {};
		}

		if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
			const fullPath = path.length > 0 ? `${path}` : 'root';
			return { [fullPath]: { obj1, obj2 } };
		}

		const keys1 = Object.keys(obj1);
		const keys2 = Object.keys(obj2);

		let diff = {};

		for (const key of keys1) {
			const currentPath = path.length > 0 ? `${path}.${key}` : key;
			if (!keys2.includes(key)) {
				diff[currentPath] = { obj1: obj1[key], obj2: undefined };
			} else {
				const keyDiff = deepDiff(obj1[key], obj2[key], currentPath);
				diff = { ...diff, ...keyDiff };
			}
		}

		for (const key of keys2) {
			if (!keys1.includes(key)) {
				const currentPath = path.length > 0 ? `${path}.${key}` : key;
				diff[currentPath] = { obj1: undefined, obj2: obj2[key] };
			}
		}
		return diff;
	};

	let diffObj = deepDiff(message.oldData, message.newData);
	let diffs = {};

	onMount(() => {
		Object.entries(diffObj).forEach(([key, value]) => {
			diffs[key] = {
				diffResult: diff.diffChars(value.obj1, value.obj2),
				obj1: value.obj1,
				obj2: value.obj2
			};
		});
	});
</script>

<div class="flex items-center gap-2.5">
	<img class="w-8 h-8 rounded-full" src="/pfp.jpg" />
	<div>
		<span class="text-sm font-semibold text-gray-900 dark:text-white"
			>{message.meta.user.username}</span
		>
		created a new question (Version {index + 1}) on
		<span class="text-sm font-normal text-gray-500 dark:text-gray-400"
			>{formatDate(message.meta.date)}</span
		>
	</div>
</div>
<div
	class="flex flex-col gap-4 leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700"
>
	<a href={`/review/${_id}/view/1`}
		><button class="bg-green-300 text-center w-full h-8"
			>View This Version (Version {index + 1})</button
		></a
	>
	<a href={`/review/${_id}/edit/1`}
		><button class="bg-teal-300 text-center w-full h-8"
			>Modify This Version (Version {index + 1})</button
		></a
	>
	{#each Object.entries(diffs) as [key, value]}
		<h3 class="text-lg font-semibold">{key}</h3>
		<div class="flex -mx-3">
			<div class="w-full px-3 mb-6 md:w-1/3">
				<div class="">
					<p>Obj1: {value.obj1}</p>
				</div>
			</div>
			<div class="w-full px-3 mb-6 md:w-1/3">
				<div class="">
					<p>Obj2: {value.obj2}</p>
				</div>
			</div>
			<div class="w-full px-3 mb-6 md:w-1/3">
				<div class="column">
					<div class="mt-2">
						{#each value.diffResult as part}
							<span class:added={part.added} class:removed={part.removed}>{part.value}</span>
						{/each}
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	.column {
		@apply flex flex-col;
	}
	.added {
		background-color: #d4fcbc; /* Highlight additions in light green */
	}
	.removed {
		background-color: #fbb6c2; /* Highlight removals in light red */
	}
</style>
