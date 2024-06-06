<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	export let data;

	let { questions } = data;

	let currentQuery = '';
	let query = '';

	onMount(() => {
		if (browser) {
			const urlParams = new URLSearchParams(window.location.search);
			query = urlParams.get('search') || '';
			currentQuery = urlParams.get('search') || '';
			query && filter();
		}
	});

	let list = questions;

	const filter = async () => {
		const res = await fetch('/api/questionTextSearch/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ query, section: 'Reading' })
		});

		list = await res.json();
	};

	const handleKeyDown = async (event) => {
		if (event.key === 'Enter') {
			await filter();
			goto(`?search=${encodeURIComponent(query)}`);
			currentQuery = query;
		}
	};
</script>

<div class="mx-24 my-8">
	<input
		type="text"
		placeholder="Search..."
		class="w-full p-2 border-gray-300 rounded"
		bind:value={query}
		on:keydown={handleKeyDown}
	/>
	<div>Query: {currentQuery}</div>
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
			{#each list as question, i}
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
