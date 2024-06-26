<script>
	import InputText from '$lib/components/InputText.svelte';
	import Select from '$lib/components/Select.svelte';
	export let data;

	$: {
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
</script>

<div class="bg-red-300 p-4 my-4">
	<div class="text-xl">Admin Panel</div>
	<div class="text-lg">Metadata</div>

	<InputText label={'ID'} selectedValue={data.id.SAT} />
	<Select
		label={'Status'}
		options={['active', 'inactive', 'pending']}
		selectedValue={data.status}
	/>
	<Select
		label={'Source'}
		options={['College Board', 'Sigma SAT']}
		bind:selectedValue={data.source}
	/>
	<Select label={'Section'} options={['Reading', 'Math']} bind:selectedValue={data.section} />
	<Select label={'Type'} options={['mcq', 'spr']} bind:selectedValue={data.questionType} />
	<Select
		label={'Difficulty'}
		options={[1, 2, 3, 4, 5, 6, 7]}
		bind:selectedValue={data.difficulty}
	/>

	<div class="text-lg">Question</div>
	<InputText label={'Stimulus (HTML)'} bind:selectedValue={data.question.stimulus} />
	<InputText label={'Stem (HTML)'} bind:selectedValue={data.question.stem} />

	{#if data.questionType === 'mcq'}
		<InputText label={'Answer Options'} bind:selectedValue={data.question.answerOptions[0]} />
		<InputText bind:selectedValue={data.question.answerOptions[1]} />
		<InputText bind:selectedValue={data.question.answerOptions[2]} />
		<InputText bind:selectedValue={data.question.answerOptions[3]} />
	{/if}

	{#if data.questionType === 'mcq'}
		<Select
			label={'Correct Answer'}
			options={['A', 'B', 'C', 'D']}
			bind:selectedValue={data.question.correctAnswer}
		/>
	{:else}
		<InputText label={'Correct Answer'} bind:selectedValue={data.question.correctAnswer} />
	{/if}

	{#if data.questionType === 'mcq'}
		<InputText label={'Rationale'} bind:selectedValue={data.question.rationale[0]} />
		<InputText bind:selectedValue={data.question.rationale[1]} />
		<InputText bind:selectedValue={data.question.rationale[2]} />
		<InputText bind:selectedValue={data.question.rationale[3]} />
	{:else}
		<InputText label={'Rationale'} bind:selectedValue={data.question.rationale} />
	{/if}
</div>
