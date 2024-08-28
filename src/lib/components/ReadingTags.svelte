<script>
	import { READING_SKILL_LIST, MATH_SKILL_LIST } from '$lib/util.js';
	import MultiSelect from '$lib/components/MultiSelect.svelte';
	export let tags;

	const source = [
		{ value: 'College Board', name: 'College Board' },
		{ value: 'Sigma SAT', name: 'Sigma Staff' }
	];

	const difficulty = [
		{ value: [1, 2, 3], name: 'Easy (1-3)' },
		{ value: [4, 5], name: 'Medium (4-5)' },
		{ value: [6, 7], name: 'Hard (6-7)' }
	];

	const qType = [
		{ value: 'mcq', name: 'Multiple Choice Question' },
		{ value: 'spr', name: 'Student-Produced Response' }
	];

	const readingSkills = READING_SKILL_LIST.map((skill) => ({ value: skill, name: skill }));
	const mathSkills = MATH_SKILL_LIST.map((skill) => ({ value: skill, name: skill }));

	let isLive = false;

	// tags.source = ['College Board'];

	$: {
		if (isLive) {
			tags.isLive = [false];
		} else {
			tags.isLive = [];
		}
	}
</script>

<div class="flex flex-wrap gap-4 mb-4 items-center">
	<!-- <MultiSelect class="mr-4 grow" items={source} label={'Choose source'} bind:value={tags.source} /> -->
	<MultiSelect class="grow" items={readingSkills} label={'Choose skills'} bind:value={tags.skill} />
	<MultiSelect
		class="mr-4 grow"
		items={difficulty}
		label={'Choose difficulty'}
		bind:value={tags.difficulty}
	/>
	<!-- <MultiSelect
		class="grow"
		items={qType}
		label={'Choose question type'}
		bind:value={tags.questionType}
	/> -->
	<label class="relative cursor-pointer hover:underline checkbox-label">
		<input type="checkbox" bind:checked={isLive} class="mr-2" />Exclude Active Questions
		<span class="tooltip"
			>Excludes questions from official BlueBook and linear paper practice exams</span
		>
	</label>
</div>

<style>
	.tooltip {
		position: absolute;
		left: 0;
		top: 100%;
		background: #f9f9f9;
		border: 1px solid #ccc;
		padding: 5px;
		width: 200px;
		font-size: 12px;
		white-space: wrap;
		z-index: 1;
		color: black;
		display: none;
	}

	.checkbox-label:hover .tooltip {
		display: block;
	}
</style>
