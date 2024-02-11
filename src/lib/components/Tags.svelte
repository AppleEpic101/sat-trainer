<script>
	import { Badge } from 'flowbite-svelte';
	import { MultiSelect } from 'flowbite-svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import SkillDropdown from '$lib/components/SkillDropdown.svelte';
	export let domains;
	export let tags;

	const programs = {
		SAT: 'SAT',
		PSAT: 'PSAT',
		'PSAT8/9': 'PSAT8/9'
	};

	const difficulty = {
		Easy: 'E',
		Medium: 'M',
		Hard: 'H'
	};

	const type = {
		New: true,
		Old: false
	};

	console.log(tags);
</script>

<!-- <div class="p-2 w-full bg-slate-300 flex flex-wrap">
	{#each tags.difficulty as diff}
		<Badge dismissable large color="green">{diff}</Badge>
	{/each}
</div> -->

<div class="">
	<Dropdown options={programs} field={'program'} placeholder={'Select program(s)'} bind:tags />
	<Dropdown options={difficulty} field={'difficulty'} placeholder={'Select Difficulty'} bind:tags />
	<Dropdown options={type} field={'isNew'} placeholder={'Select Type'} bind:tags />
	<SkillDropdown options={domains} field={'skill_desc'} name={'Select Domain'} bind:tags />
</div>
