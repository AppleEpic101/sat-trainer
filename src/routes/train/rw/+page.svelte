<script>
	import OldQuestion from '$lib/components/OldQuestion.svelte';
	import NewQuestion from '$lib/components/NewQuestion.svelte';
	import Tags from '$lib/components/Tags.svelte';
	import { onMount } from 'svelte';
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
	$: str = JSON.stringify(q);

	$: console.log(q);

	let document, count;
	const fetchData = async () => {
		isLoading = true;
		try {
			const res = await fetch(`/api/questions?program=rw&q=${str}`);
			if (res.ok) {
				let data = await res.json();
				document = data.document;
				count = data.count;
			} else {
				console.error('Error fetching data:', res.status, res.statusText);
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			isLoading = false;
		}
	};

	onMount(fetchData);
</script>

<div class="mt-4">
	<Tags {domains} bind:tags={q} />
	<br />
	{count}
	<br />
	<button on:click={fetchData}>New Question</button>
	{#if isLoading}
		<p>...loading</p>
	{:else}
		<NewQuestion data={document} />
	{/if}
</div>
