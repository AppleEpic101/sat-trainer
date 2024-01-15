<script>
	import Dropdown from '$lib/components/Dropdown.svelte';
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
</script>

<div class="tags">
	<Dropdown options={programs} field={'program'} placeholder={'Select program(s)'} bind:tags />
	<Dropdown options={difficulty} field={'difficulty'} placeholder={'Select Difficulty'} bind:tags />
	<Dropdown options={type} field={'isNew'} placeholder={'Select Type'} bind:tags />
	<Dropdown options={domains} field={'skill_desc'} placeholder={'Select Domain'} bind:tags />
</div>
