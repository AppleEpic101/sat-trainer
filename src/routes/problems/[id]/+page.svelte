<script>
	import Unsaved from '$lib/modals/Unsaved.svelte';
	import StaticQuestion from '$lib/components/StaticQuestion.svelte';
	import ReviewInterface from '$lib/components/ReviewInterface.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';

	import { user } from '$lib/stores/user.js';
	export let data;

	const { question } = data;

	const copy = JSON.parse(JSON.stringify(data.question)); //copy

	let showModal = false;
</script>

<PageHeader title="{data.question.id.SAT} " />

<div class="p-4">
	<StaticQuestion bind:data={data.question} />

	<!-- {#if $user.meta.isAdmin}
		<ReviewInterface bind:newData={data.question} {user} oldData={copy} />
	{/if} -->
</div>
