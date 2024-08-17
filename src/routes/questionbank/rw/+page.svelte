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

	let q = {
		source: ['College Board']
	};

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

	let lastClickTime = 0;
	const debounce = (func, delay) => {
		return function (...args) {
			const now = Date.now();
			if (now - lastClickTime >= delay) {
				lastClickTime = now;
				func(...args);
			}
		};
	};

	const debouncedFetchData = debounce(fetchData, 1000);

	$: onMount(() => {
		fetchData();
	});
	$: if (browser) q && countDocs();
</script>

<svelte:head>
	<title>Reading/Writing QB</title>
	<meta
		name="description"
		content="Reading/Writing training from College Board's Educator Question Bank for the SAT!"
	/>
	<meta name="og:title" content="Sigma SAT | Reading/Writing QuestionBank" />
	<meta
		name="og:description"
		content="Reading/Writing training from College Board's Educator Question Bank for the SAT!"
	/>
</svelte:head>

<div class="px-24 py-4">
	<div class="">
		<ReadingTags bind:tags={q} />
		<!-- <Tags bind:tags={q} section={'Reading'} /> -->

		<button class="bg-cyan-500 w-full my-4 p-2 rounded-md" on:click={debouncedFetchData}
			>New Question
			{#if count}
				({count} questions)
			{/if}
		</button>
	</div>

	<NewQuestion {isLoading} data={document} />
</div>
