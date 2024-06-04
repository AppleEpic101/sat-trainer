<script>
	export let data;

	let { questions } = data;

	let query = '';
	const filter = () => {
		const res = fetch('/api/questionTextSearch/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ query })
		});
	};
</script>

<div class="mx-24 my-8">
	<input
		type="text"
		placeholder="Search..."
		class="w-full p-2 border-gray-300 rounded"
		bind:value={query}
	/>
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
			{#each questions as question, i}
				<tr
					class="hover:cursor-pointer hover:bg-gray-200"
					on:click={() => (window.location.href = '/problems/' + question.id.SAT)}
				>
					<td>{i + 1}) {question.id.SAT}</td>
					<td>{question.skill}</td>
					<td>{question.domain}</td>
					<td>{question.difficulty}</td></tr
				>
			{/each}
		</tbody>
	</table>
</div>
