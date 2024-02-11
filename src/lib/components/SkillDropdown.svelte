<script>
	import { MultiSelect } from 'flowbite-svelte';
	import { Button, Dropdown, DropdownItem, Checkbox } from 'flowbite-svelte';
	import { ChevronDownSolid } from 'flowbite-svelte-icons';

	export let name;
	export let field;
	export let options;
	export let tags;
</script>

<Button class="bg-cyan-500 hover:bg-cyan-600 ring-0 focus:bg-cyan-600 focus:ring-0"
	>{name}<ChevronDownSolid class="w-3 h-3 ms-2 text-white dark:text-white" /></Button
>

<Dropdown class="w-44 h-96 overflow-y-auto p-3 space-y-3 text-sm">
	{#each options as domain}
		<div>{domain.domain}</div>
		{#each Object.keys(domain.skills) as skill}
			<Checkbox bind:group={tags[field]} value={skill}>{skill}</Checkbox>
		{/each}
	{/each}
</Dropdown>
