<script>
	import OldQuestion from '$lib/OldQuestion.svelte';
	import NewQuestion from '$lib/NewQuestion.svelte';
	import { onMount } from 'svelte';
	let data;

	let isLoading = true;

	const fetchData = async () => {
		isLoading = true;
		try {
			const res = await fetch('/api/questions?program=sat-math');
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
			domain: 'Algebra',
			skills: [
				'Linear equations in one variable',
				'Linear functions',
				'Linear equations in two variables',
				'Systems of two linear equations in two variables',
				'Linear inequalities in one or two variables'
			]
		},
		{
			domain: 'Advanced Math',
			skills: [
				'Nonlinear functions',
				'Nonlinear equations in one variable and system of equations in two variables',
				'Equivalent expressions'
			]
		},
		{
			domain: 'Problem-Solving and Data Analaysis',
			skills: [
				'Ratios, rates, proportional relationships, and units',
				'Percentages',
				'One-variable data: Distributions and measures of center and spread',
				'Two-variable data: Models and scatterplots',
				'Probability and conditional probability',
				'Inferences from sample statistics and margin of error',
				'Evaluating statistical claims: Observational studies and experiments'
			]
		},
		{
			domain: 'Geometry and Trigonometry',
			skills: [
				'Area and volume',
				'Lines, angles, and triangles',
				'Right triangles and trigonometry',
				'Circles'
			]
		}
	];
</script>

<button on:click={fetchData}>New Question</button>

{#if isLoading}
	<p>...loading</p>
{:else if data?.isNew}
	<NewQuestion {data} />
{:else}
	<OldQuestion {data} />
{/if}
