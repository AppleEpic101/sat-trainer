<script>
	import { onMount } from 'svelte';
	import Focus from '$lib/modals/Focus.svelte';
	import Question from '$lib/components/Question.svelte';

	let showModal = false;
	let selectedSkillsArray;

	let data;
	let isLoading = true;
	let showAnswer, selectedAnswer;

	const fetchQuestion = async () => {
		isLoading = true;
		let res = await fetch('/api/getQuestion', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ section: 'Math', focus: selectedSkillsArray })
		});
		data = await res.json();
		isLoading = false;
	};
	onMount(() => {
		fetchQuestion();
	});

	const skills = {
		Algebra: [
			'Linear equations in one variable',
			'Linear functions',
			'Linear equations in two variables',
			'System of two linear equations in two variables',
			'Linear inequalities in one or two variables'
		],
		'Advanced Math': [
			'Nonlinear functions',
			'Nonlinear equations in one variable',
			'Equivalent expressions'
		],
		'Problem-Solving and Data Analysis': [
			'Ratios, rates, proportional relationships, and units',
			'Percentages',
			'One-variable data: Distributions and measures of center and spread',
			'Two-variable data: Models and scatterplots',
			'Probability and conditional probability',
			'Inference from sample statistics and margin of error',
			'Evaluating statistical claims: Observational studies and experiments'
		],
		'Geometry and Trigonometry': [
			'Area and volume',
			'Lines, angles, and triangles',
			'Right triangles and trigonometry',
			'Circles'
		]
	};
</script>

<div class="m-4">
	<div class="flex flex-row justify-evenly">
		<div>
			<div>Math</div>
			{#if selectedSkillsArray?.length == 1}
				<div>Focus: {selectedSkillsArray[0]}</div>
			{:else if selectedSkillsArray?.length === 19}
				<div>All focuses selected</div>
			{:else if selectedSkillsArray?.length > 1}
				<div>{selectedSkillsArray.length} focuses selected</div>
			{/if}
		</div>
		<div><a class="cursor-pointer" on:click={() => (showModal = true)}> Change Focus </a></div>
	</div>
	<div>
		{#if showAnswer}
			<button class="bg-cyan-500 w-full my-1 p-2 rounded-md" on:click={fetchQuestion}
				>Continue</button
			>
		{/if}
		<Focus {skills} bind:showModal bind:selectedSkillsArray />
		<Question {data} bind:isLoading bind:showAnswer bind:selectedAnswer />
	</div>
</div>
