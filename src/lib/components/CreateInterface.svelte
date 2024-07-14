<script>
	import {
		READING_SKILLS,
		READING_DOMAIN_LIST,
		READING_SKILL_LIST,
		MATH_SKILLS,
		MATH_DOMAIN_LIST,
		MATH_SKILL_LIST
	} from '$lib/util.js';
	import InputText from '$lib/components/InputText.svelte';
	import Select from '$lib/components/Select.svelte';
	import { goto } from '$app/navigation';
	export let data;
	export let user;

	$: {
		if (data.section === 'Reading') {
			data.questionType = 'mcq';
		}

		if (data.section === 'Reading' && !READING_DOMAIN_LIST.includes(data.domain)) {
			data.domain = READING_DOMAIN_LIST[0];
		}

		if (data.section === 'Reading' && !READING_SKILLS[data.domain].includes(data.skill)) {
			data.skill = READING_SKILLS[data.domain][0];
		}

		if (data.section === 'Math' && !MATH_DOMAIN_LIST.includes(data.domain)) {
			data.domain = MATH_DOMAIN_LIST[0];
		}

		if (data.section === 'Math' && !MATH_SKILLS[data.domain].includes(data.skill)) {
			data.skill = MATH_SKILLS[data.domain][0];
		}

		if (data.questionType === 'mcq' && typeof data.question.answerOptions === 'string') {
			data.question.answerOptions = ['', '', '', ''];
		}

		if (data.questionType === 'mcq' && typeof data.question.rationale === 'string') {
			data.question.rationale = ['', '', '', ''];
		}

		if (data.questionType === 'spr' && Array.isArray(data.question.answerOptions)) {
			data.question.answerOptions = '';
		}

		if (data.questionType === 'spr' && Array.isArray(data.question.rationale)) {
			data.question.rationale = '';
		}
	}

	$: isMCQ = data.questionType === 'mcq';
	$: skills = data.section === 'Reading' ? READING_SKILLS : MATH_SKILLS;
	$: DOMAIN_LIST = data.section === 'Reading' ? READING_DOMAIN_LIST : MATH_DOMAIN_LIST;

	let showButton = true;
	let comments = '';

	const submit = async () => {
		showButton = false;

		let date = new Date();

		if (comments === '') {
			comments = 'None';
		}

		const res = await fetch('/api/review/postReview', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				versions: [
					{
						oldData: null,
						newData: data,
						user,
						date,
						comments: comments
					}
				],
				messageLog: [
					{
						oldData,
						newData,
						meta: {
							type: 'Version Initial',
							user,
							date,
							comments
						}
					}
				],
				meta: {
					state: 'open',
					type: 'create',
					comments: comments,
					date: date,
					user
				}
			})
		});
		goto('/review');
	};
</script>

<div class="bg-red-300 p-4 my-4">
	<div class="text-xl">Admin Panel</div>
	<div class="text-lg">Metadata</div>

	<Select
		label={'Source'}
		options={['College Board', 'Sigma SAT']}
		bind:selectedValue={data.source}
	/>

	<Select label={'Section'} options={['Reading', 'Math']} bind:selectedValue={data.section} />
	<Select label={'Domain'} options={DOMAIN_LIST} bind:selectedValue={data.domain} />
	<Select label={'Skill'} options={skills[data.domain]} bind:selectedValue={data.skill} />

	<Select label={'Type'} options={['mcq', 'spr']} bind:selectedValue={data.questionType} />
	<Select
		label={'Difficulty'}
		options={[1, 2, 3, 4, 5, 6, 7]}
		bind:selectedValue={data.difficulty}
	/>

	<div class="text-lg">Question</div>
	<InputText label={'Stimulus (HTML)'} bind:selectedValue={data.question.stimulus} />
	<InputText label={'Stem (HTML)'} bind:selectedValue={data.question.stem} />

	{#if isMCQ}
		<InputText label={'Answer Options'} bind:selectedValue={data.question.answerOptions[0]} />
		<InputText bind:selectedValue={data.question.answerOptions[1]} />
		<InputText bind:selectedValue={data.question.answerOptions[2]} />
		<InputText bind:selectedValue={data.question.answerOptions[3]} />
	{/if}

	{#if isMCQ}
		<Select
			label={'Correct Answer'}
			options={['A', 'B', 'C', 'D']}
			bind:selectedValue={data.question.correctAnswer}
		/>
	{:else}
		<InputText label={'Correct Answer'} bind:selectedValue={data.question.correctAnswer} />
	{/if}

	{#if isMCQ}
		<InputText label={'Rationale'} bind:selectedValue={data.question.rationale[0]} />
		<InputText bind:selectedValue={data.question.rationale[1]} />
		<InputText bind:selectedValue={data.question.rationale[2]} />
		<InputText bind:selectedValue={data.question.rationale[3]} />
	{:else}
		<InputText label={'Rationale'} bind:selectedValue={data.question.rationale} />
	{/if}

	{#if showButton}
		<button button class="bg-green-400 w-full p-2" on:click={submit}>Submit</button>
		<InputText label={'Explain what you changed'} bind:selectedValue={comments} />
	{/if}
</div>
