<script>
	import OldQuestion from '$lib/components/OldQuestion.svelte';
	import NewQuestion from '$lib/components/NewQuestion.svelte';
	import Tags from '$lib/components/Tags.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	let data;

	let isLoading = true;

	let q = {};

	let document, count;
	const fetchData = async () => {
		isLoading = true;
		try {
			const res = await fetch(`/api/questions?program=math&q=${JSON.stringify(q)}`);
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
		const res = await fetch(`/api/countDocs?program=math&query=${JSON.stringify(q)}`);
		const data = await res.json();

		count = data.count;
	};

	$: onMount(() => {
		fetchData();
	});
	$: if (browser) q && countDocs();
</script>

<div class="mx-24 my-4">
	<div class="">
		<Tags bind:tags={q} section={'Math'} />

		<button class="bg-cyan-500 w-full my-4 p-2 rounded-md" on:click={fetchData}
			>New Question
			{#if count}
				({count} questions)
			{/if}
		</button>
	</div>

	<NewQuestion {isLoading} user={data} data={document} />
</div>
