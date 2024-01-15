<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { activeDropdown } from '$lib/stores.js';

	let dropdownOpen = false;
	export let placeholder;
	export let field;
	export let options;
	export let tags;

	function toggleDropdown() {
		dropdownOpen = !dropdownOpen;
		activeDropdown.set(dropdownOpen ? placeholder : null);
	}

	activeDropdown.subscribe((value) => {
		if (value !== placeholder) {
			dropdownOpen = false;
		}
	});

	if (tags[field] === undefined) tags[field] = [];

	function isChecked(dict, key) {
		return tags[field].includes(dict[key]);
	}

	function toggleCheckbox(event, dict, key) {
		tags[field] = event.target.checked
			? [...tags[field], dict[key]]
			: tags[field].filter((tag) => tag !== dict[key]);
	}

	function handleClickOutside(event) {
		if (!event.target.closest('.dropdown')) {
			dropdownOpen = false;
		}
	}

	function handleEscapeKey(event) {
		if (event.key === 'Escape') {
			dropdownOpen = false;
		}
	}

	if (browser) {
		onMount(() => {
			window.addEventListener('click', handleClickOutside);
			window.addEventListener('keydown', handleEscapeKey);
		});

		onDestroy(() => {
			window.removeEventListener('click', handleClickOutside);
			window.removeEventListener('keydown', handleEscapeKey);
		});
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="dropdown" on:click={toggleDropdown}>
	<button>{placeholder}</button>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="dropdown-content"
		on:click|stopPropagation
		style="visibility: {dropdownOpen ? 'visible' : 'hidden'}; height: {dropdownOpen
			? 'auto'
			: '0'};"
	>
		{#if !Array.isArray(options)}
			{#each Object.keys(options) as option}
				<div class="choice">
					<label>
						<input
							type="checkbox"
							checked={isChecked(options, option)}
							on:change={(event) => toggleCheckbox(event, options, option)}
						/>
						{option}
					</label>
				</div>
			{/each}
		{:else}
			{#each options as domain}
				<div>{domain.domain}</div>
				{#each Object.keys(domain.skills) as skill}
					<div class="choice">
						<label>
							<input
								type="checkbox"
								checked={isChecked(domain.skills, skill)}
								on:change={(event) => toggleCheckbox(event, domain.skills, skill)}
							/>
							{skill}
						</label>
					</div>
				{/each}
			{/each}
		{/if}
	</div>
</div>

<style>
	button {
		background-color: darkcyan;
		color: white;
		padding: 10px;
		border: 2px solid black;
		box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 16px 0px;
		cursor: pointer;
	}
	.dropdown {
		position: relative;
		display: inline-block;
	}

	.dropdown-content {
		display: flex;
		flex-direction: column;
		position: absolute;
		background-color: darkcyan;
		min-width: 200px;
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
		z-index: 1;
	}

	label {
		display: block;
		padding: 10px 0;
		width: 100%;
		cursor: pointer;
	}

	input {
		cursor: pointer;
	}
</style>
