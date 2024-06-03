<script>
	export let data;

	let { questions } = data;
</script>

<div class="mx-24">
	<div class="text-xl">Questions</div>

	<table class="table-fixed w-full">
		<thead>
			<tr>
				<th class="text-left">ID</th>
				<th class="text-left">Skill</th>
				<th class="text-left">Source</th>
				<th class="text-left">Difficulty</th></tr
			>
		</thead>
		<tbody>
			{#each questions as question}
				<tr
					class="hover:cursor-pointer hover:bg-gray-200"
					on:click={() => (window.location.href = '/problems/' + question.id.SAT)}
				>
					<td>{question.id.SAT}</td>
					<td>{question.skill}</td>
					<td>{question.domain}</td>
					<td>{question.difficulty}</td></tr
				>
			{/each}
		</tbody>
	</table>
</div>
