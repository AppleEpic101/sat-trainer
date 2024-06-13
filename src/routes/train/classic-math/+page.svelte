<script>
	import { onMount } from 'svelte';
	import Focus from '$lib/modals/Focus.svelte';
	import Question from '$lib/components/Question.svelte';
	import { getLevel, gainXP } from '$lib/question/rating.js';

	export let data;

	let showModal = false;
	let selectedSkillsArray;

	let questionData;
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
		questionData = await res.json();
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

	$: mathStats = data?.math;
	$: mathLevel = getLevel(mathStats.experience);

	let domainStats, domainLevel;
	let skillStats, skillLevel;

	$: {
		if (mathStats && questionData) {
			domainStats = mathStats[questionData.domain];
			domainLevel = getLevel(domainStats.experience);
			skillStats = mathStats[questionData.domain][questionData.skill];
			skillLevel = getLevel(skillStats.experience);
		}
	}

	const update = async () => {
		const res = await fetch('/api/updateXP', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				section: 'Math',
				user: data,
				question: questionData,
				selectedAnswer
			})
		});

		let obj = await res.json();
		data = obj.user;
	};
	$: {
		if (showAnswer) {
			update();
		}
	}
</script>

<div class="m-4">
	<div class="flex flex-row justify-between gap-4 m-4">
		<div class="border border-black w-1/2">
			<!-- <div>
				Reading Level {readingLevel.level}
				{readingLevel.currentXP} / {readingLevel.xpNeededToNext}
			</div>
			<div>
				{questionData?.domain} Level {domainLevel?.level}
				{domainLevel?.currentXP} / {domainLevel?.xpNeededToNext}
			</div> -->
			<div>
				<div>
					{questionData?.skill}
				</div>
				<div>
					Level {skillLevel?.level}
				</div>
				<div>
					{skillLevel?.currentXP} / {skillLevel?.xpNeededToNext}
				</div>
			</div>
		</div>
		<div class="w-1/2 border border-black">
			<div>Math</div>
			{#if selectedSkillsArray?.length == 1}
				<div>Focus: {selectedSkillsArray[0]}</div>
			{:else if selectedSkillsArray?.length === 19}
				<div>All focuses selected</div>
			{:else if selectedSkillsArray?.length > 1}
				<div>{selectedSkillsArray.length} focuses selected</div>
			{/if}

			<a class="cursor-pointer" on:click={() => (showModal = true)}> Change Focus </a>
		</div>
	</div>
	<div>
		{#if showAnswer}
			<button class="bg-cyan-500 w-full my-1 p-2 rounded-md" on:click={fetchQuestion}
				>Continue</button
			>
		{/if}
		<Focus {skills} bind:showModal bind:selectedSkillsArray />
		<Question data={questionData} bind:isLoading bind:showAnswer bind:selectedAnswer />
	</div>
</div>
