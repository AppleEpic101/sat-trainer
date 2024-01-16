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
		{@html data.question.body || ''}
		{@html data.question.prompt || ''}
	</div>

	{#if data.question.answer.style !== 'SPR'}
		<div class="answers">
			{#each ['a', 'b', 'c', 'd'] as choice, i}
				<button class="answer-choice">
					<div class="letter">
						{String.fromCharCode('A'.charCodeAt(0) + i)}
					</div>
					<div class="answer-text">
						{@html data.question.answer.choices[choice].body}
					</div>
				</button>
			{/each}
		</div>
	{:else}
		<div id="spr" class="answers">
			<input type="text" placeholder="Type your answer here" />
		</div>
	{/if}
</div>

<link rel="stylesheet" href="/question.css" />
