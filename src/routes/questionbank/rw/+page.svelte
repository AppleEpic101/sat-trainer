<script>
	import OldQuestion from '$lib/components/OldQuestion.svelte';
	import NewQuestion from '$lib/components/NewQuestion.svelte';
	import Tags from '$lib/components/Tags.svelte';
	import ReadingTags from '$lib/components/ReadingTags.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import { getLevel, updateRating } from '$lib/question/rating.js';

	let isLoading = true;

	let q = {};

	let document, count;
	const fetchData = async () => {
		isLoading = true;
		const res = await fetch('/api/getQuestion', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ section: 'Reading', query: q })
		});

		document = await res.json();
		isLoading = false;
	};

	const countDocs = async () => {
		const res = await fetch(`/api/countDocs?program=rw&query=${JSON.stringify(q)}`);
		const data = await res.json();

		count = data.count;
	};

	$: onMount(() => {
		fetchData();
	});
	$: if (browser) q && countDocs();
</script>

<div class="px-24 py-4">
	<div class="">
		<ReadingTags bind:tags={q} />
		<!-- <Tags bind:tags={q} section={'Reading'} /> -->

		<button class="bg-cyan-500 w-full my-4 p-2 rounded-md" on:click={fetchData}
			>New Question
			{#if count}
				({count} questions)
			{/if}
		</button>
	</div>

	<NewQuestion {isLoading} data={document} />
</div>
