<script>
	import { onMount } from 'svelte';
	import Leveling from '$lib/components/Leveling.svelte';
	import Focus from '$lib/modals/Focus.svelte';
	import Question from '$lib/components/Question.svelte';
	import { getLevel, gainXP } from '$lib/question/rating.js';

	export let data;

	let showModal = false;

	let selection = data.log.focus;
	let skillsArray;

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
			body: JSON.stringify({ section: 'Reading', focus: skillsArray })
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

	$: readingStats = data?.reading;
	$: readingLevel = getLevel(readingStats.experience);

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

	const update = async () => {
		const res = await fetch('/api/updateXP', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				section: 'Reading',
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
	<div class="flex flex-row justify-between gap-4 mb-2">
		<div class="w-1/2">
			<Leveling
				name={questionData?.skill}
				level={skillLevel?.level}
				current={skillLevel?.currentXP}
				total={skillLevel?.xpNeededToNext}
			/>
		</div>
		<div class="w-1/2 border border-black">
			<div>Reading</div>
			{#if skillsArray?.length == 1}
				<div>Focus: {skillsArray[0]}</div>
			{:else if skillsArray?.length === 10}
				<div>All focuses selected</div>
			{:else if skillsArray?.length > 1}
				<div>{skillsArray.length} focuses selected</div>
			{/if}
			<div class="cursor-pointer" on:click={() => (showModal = true)}>Change Focus</div>
			<Focus {skills} bind:showModal bind:selection bind:skillsArray user={data} />
		</div>
	</div>
	<div>
		{#if showAnswer}
			<button class="bg-cyan-500 w-full my-1 p-2 rounded-md" on:click={fetchQuestion}
				>Continue</button
			>
		{/if}
		<Question data={questionData} user={data} bind:isLoading bind:showAnswer bind:selectedAnswer />
	</div>
</div>
