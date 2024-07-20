<script>
	import InputText from '$lib/components/InputText.svelte';
	import Select from '$lib/components/Select.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let showModal = false;
	export let review;
	$: console.log(review);

	let dialog;
	$: if (dialog && showModal) dialog.showModal();

	let selectedVersion = 'Version 1';
	$: versionIndex = parseInt(selectedVersion.split(' ')[1]) - 1;

	const approveQuestion = async () => {
		dialog.close();
		const res = await fetch('/api/review/approve', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				data: review,
				versionIndex
			})
		});
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
		<div class="">
			This question will be added to the question database. The current thread will now be closed.
			This action cannot be undone. Are you sure you want to do this?
		</div>
		<Select
			label={'Select the version'}
			options={Array.from({ length: review.versions.length }, (_, i) => `Version ${i + 1}`)}
			bind:selectedValue={selectedVersion}
		/>

		<button
			class="w-full bg-green-400 my-2"
			on:click={() => {
				approveQuestion();
			}}>Yes</button
		>
		<button class="w-full bg-red-400" on:click={() => dialog.close()}>No</button>
	</dialog>
{/if}
