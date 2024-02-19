<script>
	import OldQuestion from '$lib/components/OldQuestion.svelte';
	import NewQuestion from '$lib/components/NewQuestion.svelte';
	import Tags from '$lib/components/Tags.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';

	let data;

	let isLoading = true;

	const domains = [
		{
			domain: 'Information and Ideas',
			skills: {
				'Central Ideas and Details': 'Central Ideas and Details',
				Inferences: 'Inferences',
				'Command of Evidence': 'Command of Evidence'
			}
		},
		{
			domain: 'Craft and Structure',
			skills: {
				'Words in Context': 'Words in Context',
				'Text Structure and Purpose': 'Text Structure and Purpose',
				'Cross-Text Connections': 'Cross-Text Connections'
			}
		},
		{
			domain: 'Expression of Ideas',
			skills: { 'Rhetorical Synthesis': 'Rhetorical Synthesis', Transitions: 'Transitions' }
		},
		{
			domain: 'Standard English Conventions',
			skills: {
				Boundaries: 'Boundaries',
				'Form, Structure, and Sense': 'Form, Structure, and Sense'
			}
		}
	];

	let skills = [];
	for (let i = 0; i < domains.length; i++) {
		skills.push(...Object.keys(domains[i].skills));
	}
	let q = {};

	$: console.log('query', q);

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

<div class="mt-4">
	<div class="">
		<Tags {domains} bind:tags={q} />

		<button class="bg-cyan-500 w-full my-4 p-2 rounded-md" on:click={fetchData}
			>New Question
			{#if count}
				({count} questions)
			{/if}
		</button>
	</div>

	<NewQuestion {isLoading} data={document} />
</div>
