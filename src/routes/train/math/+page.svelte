<script>
	import OldQuestion from '$lib/components/OldQuestion.svelte';
	import NewQuestion from '$lib/components/NewQuestion.svelte';
	import Tags from '$lib/components/Tags.svelte';
	import { onMount } from 'svelte';
	let data;

	let isLoading = true;

	const domains = [
		{
			domain: 'Algebra',
			skills: {
				'Linear equations in one variable': 'Linear equations in one variable',
				'Linear functions': 'Linear functions',
				'Linear equations in two variables': 'Linear equations in two variables',
				'Systems of two linear equations in two variables':
					'Systems of two linear equations in two variables',
				'Linear inequalities in one or two variables': 'Linear inequalities in one or two variables'
			}
		},
		{
			domain: 'Advanced Math',
			skills: {
				'Nonlinear functions': 'Nonlinear functions',
				'Nonlinear equations in one variable and system of equations in two variables':
					'Nonlinear equations in one variable and system of equations in two variables',
				'Equivalent expressions': 'Equivalent expressions'
			}
		},
		{
			domain: 'Problem-Solving and Data Analaysis',
			skills: {
				'Ratios, rates, proportional relationships, and units':
					'Ratios, rates, proportional relationships, and units',
				Percentages: 'Percentages',
				'One-variable data: Distributions and measures of center and spread':
					'One-variable data: Distributions and measures of center and spread',
				'Two-variable data: Models and scatterplots': 'Two-variable data: Models and scatterplots',
				'Probability and conditional probability': 'Probability and conditional probability',
				'Inferences from sample statistics and margin of error':
					'Inferences from sample statistics and margin of error',
				'Evaluating statistical claims: Observational studies and experiments':
					'Evaluating statistical claims: Observational studies and experiments'
			}
		},
		{
			domain: 'Geometry and Trigonometry',
			skills: {
				'Area and volume': 'Area and volume',
				'Lines, angles, and triangles': 'Lines, angles, and triangles',
				'Right triangles and trigonometry': 'Right triangles and trigonometry',
				Circles: 'Circles'
			}
		}
	];

	let skills = [];
	for (let i = 0; i < domains.length; i++) {
		skills.push(...Object.keys(domains[i].skills));
	}
	let q = {
		program: ['SAT'],
		difficulty: ['E', 'M', 'H'],
		isNew: [true],
		skill_desc: skills
	};
	$: str = JSON.stringify(q);

	$: console.log(q);

	const fetchData = async () => {
		isLoading = true;
		try {
			const res = await fetch(`/api/questions?program=sat-math&q=${str}`);
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
</script>

<div class="mt-4">
	<Tags {domains} bind:tags={q} />
	<br />
	<button on:click={fetchData}>New Question</button>
	{#if isLoading}
		<p>...loading</p>
	{:else if data?.isNew}
		<NewQuestion {data} />
	{:else}
		<OldQuestion {data} />
	{/if}
</div>
