<script>
	import Unsaved from '$lib/modals/Unsaved.svelte';
	import StaticQuestion from '$lib/components/StaticQuestion.svelte';
	import ReviewInterface from '$lib/components/ReviewInterface.svelte';
	export let data;

	const { question, user } = data;

	let copy = { ...data }; // copy

	let showModal = false;
	$: console.log(data);

	export let form;
</script>

<div class="m-4">
	<StaticQuestion bind:data={data.question} />

	{#if data.user.isAdmin}
		<ReviewInterface bind:data={data.question} {user} {copy} />
	{/if}
</div>
