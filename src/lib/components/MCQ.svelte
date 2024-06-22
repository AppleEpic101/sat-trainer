<script>
	export let data;

	export let showAnswer;
	export let selectedAnswer = '';

	let hideSubmit = false;

	let correctAnswerIndex = data.question.correctAnswer.charCodeAt(0) - 'A'.charCodeAt(0);
	$: selectedAnswerIndex = selectedAnswer.charCodeAt(0) - 'A'.charCodeAt(0);

	const submit = () => {
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
			disabled={showAnswer}
			class="hidden"
		/>
		<div
			class={`flex items-center justify-start border-2 rounded-lg min-h-16 my-2 p-1 hover:cursor-pointer ${
				showAnswer
					? correctAnswerIndex === i
						? 'correct'
						: selectedAnswerIndex === i && selectedAnswerIndex !== correctAnswerIndex
							? 'incorrect'
							: 'disabled'
					: selectedAnswerIndex === i
						? 'selected'
						: 'normal'
			}`}
		>
			<span class="self-center text-lg font-bold mx-2"
				>{String.fromCharCode('A'.charCodeAt(0) + i)}
			</span>
			<span class="self-center text-md">{@html answerOption} </span>
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

	.correct {
		@apply border-green-400 text-green-400;
	}

	.incorrect {
		@apply border-red-400 text-red-400;
	}

	.selected {
		@apply border-teal-400 text-teal-400;
	}

	.disabled {
		@apply border-gray-400 text-gray-400 shadow-md;
	}

	.normal {
		@apply border-black text-black;
	}
</style>
