<script>
	import { Button, Dropdown, DropdownItem, Checkbox } from 'flowbite-svelte';
	import { ChevronDownSolid } from 'flowbite-svelte-icons';

	export let placeholder;
	export let field;
	export let options;
	export let tags;

	$: console.log(placeholder, tags.field);
</script>

<Button class="bg-blue-500 hover:bg-blue-600 ring-0 focus:bg-blue-600 focus:ring-0"
	>{placeholder}<ChevronDownSolid class="w-3 h-3 ms-2 text-white dark:text-white" /></Button
>
<Dropdown class="w-44 p-3 space-y-3 text-sm">
	{#each Object.keys(options) as option}
		<Checkbox bind:group={tags[field]} value={options[option]}>{option}</Checkbox>
	{/each}
</Dropdown>
