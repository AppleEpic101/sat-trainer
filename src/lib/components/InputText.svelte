<script>
	export let label = '';
	export let selectedValue;
</script>

<div class="flex flex-row items-center my-4">
	<label class="w-40">{label}</label>
	<input class="w-full" type="text" bind:value={selectedValue} />
</div>
