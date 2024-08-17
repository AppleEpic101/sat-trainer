<script>
	let showModal = true;

	function closeModal() {
		showModal = false;
	}
</script>

{#if showModal}
	<div
		class="w-96 fixed bottom-5 right-5 bg-gray-800 border border-black p-5 shadow-lg rounded-lg z-50 text-white"
	>
		<button
			class="absolute top-2 right-2 bg-none border-none text-lg cursor-pointer"
			on:click={closeModal}>✖</button
		>
		<h2 class="text-xl font-semibold mb-2">Join our Discord!</h2>
		<p class="mb-4">
			Join our Discord community. Join our team (developers and problem-writers needed).
		</p>

		<a href="https://discord.gg/77fHugCbd8" target="_blank" class=""
			><button class="w-full bg-purple-400 py-4 text-xl rounded-full text-black font-bold"
				>Join Discord!</button
			></a
		>
	</div>
{/if}
