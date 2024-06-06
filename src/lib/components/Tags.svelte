<script>
	import { Badge } from 'flowbite-svelte';
	import MultiSelect from '$lib/components/MultiSelect.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import SkillDropdown from '$lib/components/SkillDropdown.svelte';
	export let tags;
	export let section;
	const programs = {
		SAT: 'SAT',
		PSAT: 'PSAT',
		'PSAT8/9': 'PSAT8/9'
	};

	// const difficulty = {
	// 	Easy: 'E',
	// 	Medium: 'M',
	// 	Hard: 'H'
	// };

	const source = [
		{ value: 'College Board', name: 'College Board' }
		// { value: 'Sigma Staff', name: 'Sigma Staff' }
	];

	const difficulty = [
		{ value: [1, 2, 3], name: 'Easy (1-3)' },
		{ value: [4, 5], name: 'Medium (4-5)' },
		{ value: [6, 7], name: 'Hard (6-7)' }
	];

	const readingSkills = [
		{ value: 'Central Ideas and Details', name: 'Central Ideas and Details' },
		{ value: 'Inferences', name: 'Inferences' },
		{ value: 'Command of Evidence', name: 'Command of Evidence' },
		{ value: 'Words in Context', name: 'Words in Context' },
		{ value: 'Text Structure and Purpose', name: 'Text Structure and Purpose' },
		{ value: 'Cross-Text Connections', name: 'Cross-Text Connections' },
		{ value: 'Rhetorical Synthesis', name: 'Rhetorical Synthesis' },
		{ value: 'Transitions', name: 'Transitions' },
		{ value: 'Boundaries', name: 'Boundaries' },
		{ value: 'Form, Structure, and Sense', name: 'Form, Structure, and Sense' }
	];

	const mathSkills = [
		{ value: 'Linear equations in one variable', name: 'Linear equations in one variable' },
		{ value: 'Linear functions', name: 'Linear functions' },
		{ value: 'Linear equations in two variables', name: 'Linear equations in two variables' },
		{
			value: 'Systems of two linear equations in two variables',
			name: 'Systems of two linear equations in two variables'
		},
		{
			value: 'Linear inequalities in one or two variables',
			name: 'Linear inequalities in one or two variables'
		},
		{ value: 'Nonlinear functions', name: 'Nonlinear functions' },
		{
			value: 'Nonlinear equations in one variable and systems of equations in two variables',
			name: 'Nonlinear equations in one variable and systems of equations in two variables'
		},
		{ value: 'Equivalent expressions', name: 'Equivalent expressions' },
		{
			value: 'Ratios, rates, proportional relationships, and units',
			name: 'Ratios, rates, proportional relationships, and units'
		},
		{ value: 'Percentages', name: 'Percentages' },
		{
			value: 'One-variable data: Distributions and measures of center and spread',
			name: 'One-variable data: Distributions and measures of center and spread'
		},
		{
			value: 'Two-variable data: Models and scatterplots',
			name: 'Two-variable data: Models and scatterplots'
		},
		{
			value: 'Probability and conditional probability',
			name: 'Probability and conditional probability'
		},
		{
			value: 'Inference from sample statistics and margin of error',
			name: 'Inference from sample statistics and margin of error'
		},
		{
			value: 'Evaluating statistical claims: Observational studies and experiments',
			name: 'Evaluating statistical claims: Observational studies and experiments'
		},
		{ value: 'Area and volume', name: 'Area and volume' },
		{ value: 'Lines, angles, and triangles', name: 'Lines, angles, and triangles' },
		{ value: 'Right triangles and trigoometry', name: 'Right triangles and trigoometry' },
		{ value: 'Circles', name: 'Circles' }
	];

	const skills = section === 'Reading' ? readingSkills : mathSkills;

	const type = {
		New: true,
		Old: false
	};

	let selected = [];

	$: console.log(tags);
</script>

<div class="flex flex-wrap">
	<MultiSelect class="mr-4 grow" items={source} label={'Choose source'} bind:value={tags.source} />
	<MultiSelect
		class="mr-4 grow"
		items={difficulty}
		label={'Choose difficulty'}
		bind:value={tags.difficulty}
	/>
	<MultiSelect class="grow" items={skills} label={'Choose skills'} bind:value={tags.skill} />
</div>
