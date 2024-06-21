<script>
	import { format } from '$lib/parser.js';
	export let data;

	export let showAnswer;
	export let selectedAnswer = '';

	let hideSubmit = false;
	let lockedAnswers = [];
	const submit = () => {
		let index = selectedAnswer.charCodeAt(0) - 'A'.charCodeAt(0);
		lockedAnswers = data.question.answerOptions.map((_, i) => i).filter((i) => i !== index);
		showAnswer = true;
		hideSubmit = true;
	};
</script>

{#each data.question.answerOptions as answerOption, i}
	<label class="flex flex-col">
		<input
			type="radio"
			name="r"
			bind:group={selectedAnswer}
			value={String.fromCharCode('A'.charCodeAt(0) + i)}
			disabled={lockedAnswers.includes(i)}
			class="hidden"
		/>
		<div
			class="flex items-center justify-start border-2 border-black rounded-lg min-h-16 my-2 p-1 hover:cursor-pointer"
		>
			<span class="self-center text-lg font-bold mx-2"
				>{String.fromCharCode('A'.charCodeAt(0) + i)}
			</span>
			<span class="self-center text-md">{@html format(answerOption)} </span>
		</div>
	</label>
{/each}
<button
	class={`submit ${
		selectedAnswer !== '' && !hideSubmit ? '' : 'invisible'
	} bg-aquamarine border border-black rounded p-1 w-full cursor-pointer`}
	on:click={submit}>Submit</button
>

<style>
	.submit {
		@apply bg-teal-400;
	}

	input[type='radio']:checked + div {
		@apply border-teal-400 text-teal-400 shadow-md;
	}

	input[type='radio']:disabled + div {
		@apply border-gray-400 text-gray-400;
	}
</style>
