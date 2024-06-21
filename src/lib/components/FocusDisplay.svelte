<script>
	export let selection;
	export let showModal;
</script>

<div class="border-black border-2 p-2 h-full">
	<div class="text-3xl">Focus: {selection}</div>
	<div class="cursor-pointer" on:click={() => (showModal = true)}>Change Focus</div>
</div>
