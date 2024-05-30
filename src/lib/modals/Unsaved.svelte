<script>
	export let showModal;

	let dialog;
	$: if (dialog && showModal) dialog.showModal();
</script>

<dialog bind:this={dialog}>
	<div class="p-4">
		<div class="text-lg">Unsaved Changes</div>
		<div class="text-lg">You have unsaved changes.</div>
		<div class="flex flex-row justify-end">
			<button class="btn btn-primary" on:click={() => dialog.close()}>Stay</button>
			<button class="btn btn-secondary" on:click={() => window.location.reload()}>Leave</button>
		</div>
	</div>
</dialog>
