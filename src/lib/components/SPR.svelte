<script>
	export let showAnswer = false;
	export let selectedAnswer = '';
</script>

<input type="text" bind:value={selectedAnswer} />

{#if selectedAnswer !== '' && !showAnswer}
	<button
		class="bg-teal-400 border border-black rounded my-4 p-1 w-full cursor-pointer"
		on:click={() => {
			showAnswer = !showAnswer;
		}}>Submit</button
	>
{/if}
