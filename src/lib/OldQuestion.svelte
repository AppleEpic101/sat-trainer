<script>
	export let data;
</script>

{data.questionId}

{@html data.question.body}
{@html data.question.prompt}

<div class="answer-choices">
	{#if data.question.answer.style === 'Multiple Choice'}
		{@html data.question.answer.choices.a.body}
		{@html data.question.answer.choices.b.body}
		{@html data.question.answer.choices.c.body}
		{@html data.question.answer.choices.d.body}
	{/if}
</div>
