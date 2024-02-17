<script>
	import { Badge } from 'flowbite-svelte';
	import MultiSelect from '$lib/components/MultiSelect.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import SkillDropdown from '$lib/components/SkillDropdown.svelte';
	export let tags;

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

	const skills = [
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
