<script>
	import { formatDate, capitalizeFirstLetter } from '$lib/util.js';
	import Question from '$lib/components/Question.svelte';
	import CreateDifferences from '$lib/components/CreateDifferences.svelte';
	import EditDifferences from '$lib/components/EditDifferences.svelte';
	export let data;

	let { meta } = data;
</script>

<div class="">
	<div class="bg-slate-300 w-full p-4 m-4 cursor-pointer">
		<div class="text-2xl">{capitalizeFirstLetter(meta.type)} by {meta.user.username}</div>
		<div>{formatDate(meta.date)}</div>
		<div>Question ID: {meta.questionID}</div>
		<div>Status: {capitalizeFirstLetter(meta.state)}</div>
		<div>Description: {meta.comments}</div>
	</div>

	{#each data.messageLog as message, i}
		<div class="border border-back p-4 m-4">
			<div>Version {i + 1}</div>
			<div>Authored by {message.meta.user.username}</div>
			<div>{formatDate(message.meta.date)}</div>

			{#if message.meta.type === 'Version Initial'}
				<CreateDifferences newData={message.newData} />
			{:else if message.meta.type === 'Version'}
				<EditDifferences {message} index={i} />
			{/if}
		</div>
	{/each}

	{#if data.user.isAdmin}
		<button on:submit={() => {}}>Approve</button>
		<button on:submit={() => {}}>Reject</button>
	{/if}
</div>
