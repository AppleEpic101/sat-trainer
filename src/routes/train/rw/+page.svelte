<script>
	import NewQuestion from '$lib/NewQuestion.svelte';
	import { onMount } from 'svelte';
	let data;

	let isLoading = true;

	const fetchData = async () => {
		isLoading = true;
		try {
			const res = await fetch('/api/questions?program=sat-rw');
			if (res.ok) {
				data = await res.json();
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

	const domains = [
		{
			domain: 'Information and Ideas',
			skills: ['Central Ideas and Details', 'Inferences', 'Command of Evidence']
		},
		{
			domain: 'Craft and Structure',
			skills: ['Words in Context', 'Text Structure and Purpose', 'Cross-Text Connections']
		},
		{
			domain: 'Expression of Ideas',
			skills: ['Rhetorical Synthesis', 'Transitions']
		},
		{
			domain: 'Standard English Conventions',
			skills: ['Boundaries', 'Form, Structure, and Sense']
		}
	];

	console.log(data);
</script>

<button on:click={fetchData}>New Question</button>

{#if isLoading}
	<p>Loading...</p>
{:else}
	<NewQuestion {data} />
{/if}
