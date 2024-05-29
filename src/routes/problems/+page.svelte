<script>
	export let data;

	let { questions } = data;
</script>

<div class="mx-24">
	<div>Questions</div>

	<div class="flex flex-row flex-wrap">
		{#each questions as question}
			<a href="/problems/{question.id.SAT}">
				<div class="border-2 border-black m-4 w-96 h-48">
					<div>{question.id.SAT}</div>
					<div>Level {question.difficulty}</div>
					<div>{question.skill}</div>
					<div>{question.domain}</div>
					<div></div>
				</div></a
			>
		{/each}
	</div>
</div>
