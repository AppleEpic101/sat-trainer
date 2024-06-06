<script>
	import { format } from '$lib/parser.js';

	let hideSubmit = true;

	export let showAnswer;
	export let selectedAnswer = '';
</script>

<input type="text" bind:value={selectedAnswer} />
<button
	class={`submit ${
		selectedAnswer !== '' && !hideSubmit ? '' : 'invisible'
	} bg-aquamarine border border-black rounded p-1 w-full cursor-pointer`}
	on:click={submit}>Submit</button
>
