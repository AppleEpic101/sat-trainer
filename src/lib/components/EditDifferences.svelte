<script>
	import { formatDate, capitalizeFirstLetter } from '$lib/util.js';
	import { onMount } from 'svelte';
	import * as diff from 'diff';

	export let message;
	export let index;

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

<div>Version {index + 1}</div>
<div>Authored by {message.meta.user.username}</div>
<div>{formatDate(message.meta.date)}</div>

<div class="flex flex-col">
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
