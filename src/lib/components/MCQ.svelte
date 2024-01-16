<script>
	import { format } from '$lib/parser.js';
	export let data;

	export let showAnswer;
	export let selectedAnswer = '';

	let hideSubmit = false;
	let lockedAnswers = [];
	const submit = () => {
		let index = selectedAnswer.charCodeAt(0) - 'A'.charCodeAt(0);
		if (data.question.correct_answer.includes(selectedAnswer)) {
			lockedAnswers = data.question.answerOptions.map((_, i) => i).filter((i) => i !== index);
			showAnswer = true;
			hideSubmit = true;
		} else {
			lockedAnswers = [...lockedAnswers, index];
			selectedAnswer = '';
		}

		if (lockedAnswers.length === 3) {
			selectedAnswer = data.question.correct_answer[0];
			showAnswer = true;
			hideSubmit = true;
		}
	};

	$: console.log(lockedAnswers);
</script>

{#each data.question.answerOptions as answerOption, i}
	<label>
		<input
			type="radio"
			name="r"
			bind:group={selectedAnswer}
			value={String.fromCharCode('A'.charCodeAt(0) + i)}
			disabled={lockedAnswers.includes(i)}
		/>
		<div class="answer-choice">
			<span class="letter">
				{String.fromCharCode('A'.charCodeAt(0) + i)}
			</span>
			<span class="answer-text">
				{@html format(answerOption.content)}
			</span>
		</div>
	</label>
{/each}
<button class="submit {selectedAnswer !== '' && !hideSubmit ? '' : 'hidden'}" on:click={submit}
	>Submit</button
>

<style>
	.submit {
		background-color: aquamarine;
		border: 1px solid black;
		border-radius: 5px;
		padding: 5px;
		width: 100%;
		cursor: pointer;
	}

	.submit.hidden {
		visibility: hidden;
	}

	.answer-choice {
		cursor: pointer;
		display: flex;
		justify-content: left;
		align-items: center;
		border: 2px solid white;
		border-radius: 15px;
		background-color: inherit;
		min-height: 50px;
		color: inherit;
		margin: 20px 0;
		padding: 5px;
	}

	.answer-choice:first-of-type {
		margin-top: 0;
	}

	label input[type='radio'] {
		display: none;
	}

	input[type='radio']:checked + div {
		border: 2px solid aqua;
		color: aqua;
		text-shadow: 0 2px 2px #808080;
	}

	input[type='radio']:disabled + div {
		border: 2px solid #808080;
		color: #808080;
	}

	.letter {
		font-size: 1.3rem;
		font-weight: bold;
		margin: 0 10px;
	}

	.answer-text {
		font-size: 1rem;
		padding-top: 3px;
		text-align: left;
	}
</style>
