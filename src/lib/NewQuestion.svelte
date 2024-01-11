<script>
	export let data;
</script>

{data.questionId}

{@html data.question.stimulus}
{@html data.question.stem}

{#each data.question.answerOptions as answerOption, i}
	{String.fromCharCode('A'.charCodeAt(0) + i)}
	{@html answerOption.content}
{/each}
