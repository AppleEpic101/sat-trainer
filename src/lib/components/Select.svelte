<script>
	export let label = 'Select an option';
	export let options;
	export let selectedValue;
</script>

<div class="flex flex-row items-center my-4">
	<label class="w-36">{label}</label>
	<select bind:value={selectedValue}>
		{#each options as option}
			<option>{option}</option>
		{/each}
	</select>
</div>
