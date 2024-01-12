<script>
	export let data;
	console.log(data);
</script>

<div class="meta">
	{data.questionId}
	{data.difficulty}
	{data.skill_desc}
</div>

<div class="content">
	<div class="stimulus">
		<div>
			{@html data.question.stimulus || ''}
			{@html data.question.stem || ''}
		</div>
	</div>

	<div class="answers">
		{#each data.question.answerOptions as answerOption, i}
			<button class="answer-choice">
				<div class="letter">
					{String.fromCharCode('A'.charCodeAt(0) + i)}
				</div>
				<div class="answer">
					{@html answerOption.content}
				</div>
			</button>
		{/each}
	</div>
</div>

<style>
	.content {
		display: flex;
	}

	.stimulus,
	.answers {
		flex: 1;
	}

	.stimulus {
		margin: 20px 10px 0 0;
	}

	.answers {
		margin: 20px 0 0 10px;
	}

	:global(.stimulus p) {
		line-height: 1.5;
	}

	.question {
		font-size: 1.2rem;
	}
	.answer-choice {
		cursor: pointer;
		display: flex;
		justify-content: left;
		align-items: center;
		border: 2px solid white;
		border-radius: 15px;
		background-color: inherit;
		width: 100%;
		min-height: 50px;
		color: inherit;
		margin: 20px 0;
		padding: 5px;
	}

	.letter {
		font-size: 1.3rem;
		font-weight: bold;
		margin: 0 10px;
	}

	.answer {
		font-size: 1rem;
		padding-top: 3px;
		text-align: left;
	}
</style>
