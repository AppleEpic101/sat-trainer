<script>
	import ProgressBar from '$lib/components/ProgressBar.svelte';

	export let name;
	export let level;

	export let current;
	export let total;
</script>

<div class="border-black border-2 p-2">
	<div class="text-3xl">{name}</div>
	<div class="text-xl">Level {level} ({current}/{total})</div>
	<ProgressBar {current} max={total} />
</div>
