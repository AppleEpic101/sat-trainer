<script>
	export let min = 0;
	export let max;

	export let current;

	// Calculate the width of the progress bar based on the value, min, and max
	$: width = ((current - min) / (max - min)) * 100 + '%';
</script>

<div class="progress-bar-container">
	<div class="progress-bar" style="width: {width};"></div>
</div>

<style>
	.progress-bar-container {
		@apply relative h-4 w-full bg-gray-200 rounded;
	}

	.progress-bar {
		@apply h-full bg-blue-600 rounded transition-all ease-out duration-300;
	}
</style>
