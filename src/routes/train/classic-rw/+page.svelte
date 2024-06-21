<script>
	import Leveling from '$lib/components/Leveling.svelte';
	import FocusDisplay from '$lib/components/FocusDisplay.svelte';
	import Focus from '$lib/modals/Focus.svelte';
	import Question from '$lib/components/Question.svelte';
	import { getLevel, gainXP } from '$lib/question/rating.js';
	import { generateSkillsArray } from '$lib/util.js';

	export let data;

	let showModal = false;

	$: selection = data?.user.log.focus;
	$: skillsArray = generateSkillsArray(data.user.log.focus, 'Reading');

	let isLoading = false;
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

		data.question = await res.json();

		await fetch('/api/log/saveLog', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user: data.user,
				section: 'Reading',
				focus: selection,
				questionID: data.question._id
			})
		});
		isLoading = false;
	};

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

	$: readingStats = data?.user?.reading;
	$: readingLevel = getLevel(readingStats?.experience);

	let domainStats, domainLevel;
	let skillStats, skillLevel;

	$: {
		if (readingStats && data.question) {
			domainStats = readingStats[data.question.domain];
			domainLevel = getLevel(domainStats.experience);
			skillStats = readingStats[data.question.domain][data.question.skill];
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
				user: data.user,
				question: data.question,
				selectedAnswer
			})
		});

		let obj = await res.json();
		data.user = obj.user;
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
				name={data.question?.skill}
				level={skillLevel?.level}
				current={skillLevel?.currentXP}
				total={skillLevel?.xpNeededToNext}
			/>
		</div>
		<div class="w-1/2">
			<FocusDisplay {selection} bind:showModal />
			<Focus {skills} bind:showModal bind:selection bind:skillsArray user={data.user} />
		</div>
	</div>
	<div>
		{#if showAnswer}
			<button class="bg-cyan-500 w-full my-1 p-2 rounded-md" on:click={fetchQuestion}
				>Continue</button
			>
		{/if}
		<Question
			data={data.question}
			user={data.user}
			bind:isLoading
			bind:showAnswer
			bind:selectedAnswer
		/>
	</div>
</div>
