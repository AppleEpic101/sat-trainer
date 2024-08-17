<script>
	import OldQuestion from '$lib/components/OldQuestion.svelte';
	import NewQuestion from '$lib/components/NewQuestion.svelte';
	import MathTags from '$lib/components/MathTags.svelte';
	import Tags from '$lib/components/Tags.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	let data;

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
			body: JSON.stringify({ section: 'Math', query: q })
		});

		document = await res.json();
		isLoading = false;
	};

	const countDocs = async () => {
		const res = await fetch(`/api/countDocs?program=math&query=${JSON.stringify(q)}`);
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
	<title>Math QB</title>
	<meta
		name="description"
		content="Math training from College Board's Educator Question Bank for the SAT!"
	/>
	<meta name="og:title" content="Sigma SAT | Math QB" />
	<meta
		name="og:description"
		content="Math training from College Board's Educator Question Bank for the SAT!"
	/>
</svelte:head>

<div class="px-24 py-4">
	<div class="">
		<MathTags bind:tags={q} />
		<!-- <Tags bind:tags={q} section={'Math'} /> -->

		<button class="bg-cyan-500 w-full my-4 p-2 rounded-md" on:click={debouncedFetchData}
			>New Question
			{#if count}
				({count} questions)
			{/if}
		</button>
	</div>

	<NewQuestion {isLoading} user={data} data={document} />
</div>
