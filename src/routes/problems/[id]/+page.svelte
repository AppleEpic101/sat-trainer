<script>
	import Unsaved from '$lib/modals/Unsaved.svelte';
	import StaticQuestion from '$lib/components/StaticQuestion.svelte';
	import ReviewInterface from '$lib/components/ReviewInterface.svelte';
	export let data;

	const { question, user } = data;

	const copy = JSON.parse(JSON.stringify(data.question)); //copy

	let showModal = false;
</script>

<div class="m-4">
	<StaticQuestion bind:data={data.question} />

	{#if data.user.isAdmin}
		<ReviewInterface bind:newData={data.question} {user} oldData={copy} />
	{/if}
</div>
