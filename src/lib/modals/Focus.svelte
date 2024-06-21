<script>
	import { READING_SKILLS, READING_SKILL_LIST, MATH_SKILLS, MATH_SKILL_LIST } from '$lib/util.js';
	import { invalidate } from '$app/navigation';
	export let showModal; // boolean

	let dialog;
	$: if (dialog && showModal) dialog.showModal();

	export let skills;

	export let user;
	export let selection;
	export let skillsArray;

	let unsavedSelection = selection;
	$: {
		if (!showModal) unsavedSelection = selection;
	}

	// $: {
	// 	if (selection === 'All') {
	// 		skillsArray = [...READING_SKILL_LIST];
	// 	} else if (READING_SKILLS[selection]) {
	// 		skillsArray = READING_SKILLS[selection];
	// 	} else {
	// 		skillsArray = [selection];
	// 	}
	// }

	const changeFocus = async () => {
		selection = unsavedSelection;

		await fetch('/api/changeFocus', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ newFocus: selection, user })
		});
		invalidate('var');
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
{#if showModal}
	<dialog
		class="m-auto block w-full max-w-md p-6 bg-white rounded-md shadow-lg overflow-scroll"
		bind:this={dialog}
		on:close={() => {
			showModal = false;
		}}
		on:click|self={() => dialog.close()}
	>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="flex flex-col items-center" on:click|stopPropagation>
			<!-- svelte-ignore a11y-autofocus -->
			<button
				class="bg-cyan-500 text-white p-2 rounded-md"
				autofocus
				on:click={() => dialog.close()}>Close</button
			>

			<div class="m-8">
				<p class="text-2xl">Change Reading Focus</p>

				<input type="radio" bind:group={unsavedSelection} value={'All'} />
				<label>All Reading Topics</label>

				{#each Object.keys(skills) as domain}
					<div>
						<input type="radio" bind:group={unsavedSelection} value={domain} />
						<label>{domain}</label>

						<div class="ml-4">
							{#each skills[domain] as skill}
								<div>
									<input type="radio" bind:group={unsavedSelection} value={skill} />
									<label>{skill}</label>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>

			<button
				class="bg-cyan-500 text-white p-2 rounded-md"
				on:click={() => {
					changeFocus();
					showModal = false;
				}}
			>
				Save
			</button>
			<hr />
		</div>
	</dialog>
{/if}
