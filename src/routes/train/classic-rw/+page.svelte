<script>
	import { onMount } from 'svelte';
	import Focus from '$lib/modals/Focus.svelte';
	import Question from '$lib/components/Question.svelte';
	import { getLevel } from '$lib/question/rating.js';

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
			body: JSON.stringify({ section: 'Reading', focus: selectedSkillsArray })
		});
		questionData = await res.json();
		isLoading = false;
	};
	onMount(() => {
		fetchQuestion();
	});

	const skills = {
		'Information and Ideas': ['Central Ideas and Details', 'Inferences', 'Command of Evidence'],
		'Craft and Structure': [
			'Words in Context',
			'Text Structure and Purpose',
			'Cross-Text Connections'
		],
		'Expression of Ideas': ['Rhetorical Synthesis', 'Transitions'],
		'Standard English Conventions': ['Boundaries', 'Form, Structure, and Sense']
	};

	let readingStats = data?.reading;
	let readingLevel = getLevel(readingStats.experience);

	let domainStats, domainLevel;
	let skillStats, skillLevel;

	$: {
		if (readingStats && questionData) {
			domainStats = readingStats[questionData.domain];
			domainLevel = getLevel(domainStats.experience);
			skillStats = readingStats[questionData.domain][questionData.skill];
			skillLevel = getLevel(skillStats.experience);
		}
	}

	console.log(getLevel(110));
</script>

<div class="m-4">
	<div class="flex flex-row justify-evenly">
		<div>
			<div>Reading</div>
			{#if selectedSkillsArray?.length == 1}
				<div>Focus: {selectedSkillsArray[0]}</div>
			{:else if selectedSkillsArray?.length === 10}
				<div>All focuses selected</div>
			{:else if selectedSkillsArray?.length > 1}
				<div>{selectedSkillsArray.length} focuses selected</div>
			{/if}

			<div>
				Reading Level {readingLevel.level}
				{readingLevel.currentXP} / {readingLevel.xpNeededToNext}
			</div>
			<div>
				{questionData?.domain} Level {domainLevel?.level}
				{domainLevel?.currentXP} / {domainLevel?.xpNeededToNext}
			</div>
			<div>
				{questionData?.skill}
				{skillLevel?.level}
				{skillLevel?.currentXP} / {skillLevel?.xpNeededToNext}
			</div>
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
		<Question data={questionData} bind:isLoading bind:showAnswer bind:selectedAnswer />
	</div>
</div>
