<script>
	import OldQuestion from '$lib/components/OldQuestion.svelte';
	import NewQuestion from '$lib/components/NewQuestion.svelte';
	import Tags from '$lib/components/Tags.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import { getLevel, updateRating } from '$lib/question/rating.js';

	export let data;

	let isLoading = true;

	let q = {};

	let document, count;
	const fetchData = async () => {
		isLoading = true;
		try {
			const res = await fetch(`/api/questions?program=rw&q=${JSON.stringify(q)}`);
			if (res.ok) {
				let data = await res.json();
				document = data.document;
			} else {
				console.error('Error fetching data:', res.status, res.statusText);
			}
		} catch (e) {
			console.log(e);
		} finally {
			isLoading = false;
		}
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

<!-- {data?.reading?.rating}
{data?.reading?.experience} -->

<div class="mx-24 my-4">
	<div class="">
		<Tags bind:tags={q} section={'Reading'} />

		<button class="bg-cyan-500 w-full my-4 p-2 rounded-md" on:click={fetchData}
			>New Question
			{#if count}
				({count} questions)
			{/if}
		</button>
	</div>

	<NewQuestion {isLoading} user={data} data={document} />
</div>
