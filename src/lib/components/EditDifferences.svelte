<script>
	import { onMount } from 'svelte';
	import * as diff from 'diff';

	export let diffObj;

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

<div class="flex flex-col">
	{#each Object.entries(diffs) as [key, value]}
		<h3 class="text-lg font-semibold">{key}</h3>
		<div class="flex -mx-3">
			<div class="w-full px-3 mb-6 md:w-1/3">
				<div class="">
					<!-- Display obj1 -->
					<p>Obj1: {value.obj1}</p>
				</div>
			</div>
			<div class="w-full px-3 mb-6 md:w-1/3">
				<div class="">
					<!-- Display obj2 -->
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
