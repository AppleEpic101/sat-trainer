<script>
	import { goto } from '$app/navigation';
	import ReadingTags from '$lib/components/ReadingTags.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	export let data;

	let currentQuery = data.query;
	let query = data.query;

	$: list = data.questions;

	const handleKeyDown = async (event) => {
		if (event.key === 'Enter') {
			goto(`?search=${encodeURIComponent(query)}`);
			currentQuery = query;
		}
	};

	let q = {};
	$: console.log(q);
	let count;

	const fetchData = async () => {
		console.log('LOADING');
		const res = await fetch('/api/questionTextSearch', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				query: currentQuery,
				section: 'Reading',
				tags: q
			})
		});

		data.questions = await res.json();
		console.log('PENIS', data.questions);
	};

	const countDocs = async () => {
		const res = await fetch(`/api/countDocs?program=rw&query=${JSON.stringify(q)}`);
		const data = await res.json();

		count = data.count;
	};

	// onMount(() => {
	// 	if (browser) {
	// 		fetchData();
	// 		countDocs();
	// 	}
	// });
	// Reactively call fetchData and countDocs when `q` changes, but only in the browser
	let init = true;
	onMount(() => {
		init = false;
	});
	$: if (q && browser && !init) {
		fetchData();
		countDocs();
	}

	// $: q, browser && fetchData();
	// $: q, browser && countDocs();
</script>

<div class="mx-24 my-8">
	<ReadingTags bind:tags={q} />
	<input
		type="text"
		placeholder="Search..."
		class="w-full p-2 border-gray-300 rounded"
		bind:value={query}
		on:keydown={handleKeyDown}
	/>
	<div>Query: {currentQuery}</div>
	<div class="text-xl">Questions ({data?.questions?.length} questions in database)</div>

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
