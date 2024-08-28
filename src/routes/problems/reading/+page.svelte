<script>
	import { goto } from '$app/navigation';
	import ReadingTags from '$lib/components/ReadingTags.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import PageHeader from '$lib/components/PageHeader.svelte';
	export let data;

	let currentQuery = data.query; // query from the URL
	let query = data.query; // query from the input field

	$: list = data.questions;

	const handleKeyDown = async (event) => {
		if (event.key === 'Enter') {
			goto(`?search=${encodeURIComponent(query)}`);
			currentQuery = query;
		}
	};

	let q = {
		source: ['College Board']
	};

	const fetchData = async () => {
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
	};

	// Reactively call fetchData and countDocs when `q` changes, but only in the browser
	let init = true;
	onMount(() => {
		init = false;
	});
	$: if (q && browser && !init) {
		fetchData();
	}
</script>

<PageHeader
	title="Reading/Writing Question Database"
	description="Search for reading and writing questions from the College Board."
/>

<div class="px-24 py-4">
	<div class="border-2 border-black p-4">
		<div class="text-3xl pb-4">Reading/Writing Question Database</div>
		<ReadingTags bind:tags={q} />
		<input
			type="text"
			placeholder="Search..."
			class="w-full p-2 border border-gray-600 rounded bg-orange-300 text-black placeholder-black"
			bind:value={query}
			on:keydown={handleKeyDown}
		/>

		<div class="text-xl mt-2">Questions ({data?.questions?.length} questions in database)</div>
	</div>
	{#if currentQuery === ''}
		<div class="">Query: {currentQuery}</div>
	{/if}

	<table class="table-fixed w-full mt-4 border-collapse border border-gray-600">
		<thead>
			<tr class="bg-orange-300">
				<th class="text-left p-2 border border-gray-600 w-14">No.</th>
				<th class="text-left p-2 border border-gray-600 w-1/12">ID</th>
				<th class="text-left p-2 border border-gray-600 w-2/12">Skill</th>
				<th class="text-left p-2 border border-gray-600">Stimulus</th>
				<th class="text-left p-2 border border-gray-600 w-1/12">Difficulty</th>
			</tr>
		</thead>
		<tbody>
			{#each list as question, i}
				<tr
					class="hover:cursor-pointer hover:bg-orange-200"
					on:click={() => (window.location.href = '/problems/' + question.id.SAT)}
				>
					<td class="p-2 border border-gray-600">{i + 1}</td>
					<td class="p-2 border border-gray-600">{question.id.SAT}</td>
					<td class="p-2 border border-gray-600">{question.skill}</td>
					<td
						class="p-2 border border-gray-600 h-12 overflow-hidden text-ellipsis whitespace-nowrap"
						>{@html question.question.stimulus}</td
					>
					<td class="p-2 border border-gray-600">{question.difficulty}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
