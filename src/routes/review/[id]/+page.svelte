<script>
	import { formatDate, capitalizeFirstLetter } from '$lib/util.js';
	import Question from '$lib/components/Question.svelte';
	import CreateDifferences from '$lib/components/CreateDifferences.svelte';
	import EditDifferences from '$lib/components/EditDifferences.svelte';
	import MessageInput from '$lib/components/MessageInput.svelte';
	import Comment from '$lib/components/Comment.svelte';
	import Approve from '$lib/modals/Approve.svelte';
	export let data;

	let { meta } = data;
	// $: console.log(data);

	let showApproveModal = false;
</script>

<div class="m-4 flex flex-col gap-4">
	<div
		class="block w-full p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
	>
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			{capitalizeFirstLetter(meta.type)} by {meta.user.username}
		</h5>
		<div class="font-normal text-gray-700 dark:text-gray-400">
			<div>{formatDate(meta.date)}</div>
			{#if meta.questionID}
				<div>Question ID: {meta.questionID}</div>
			{/if}
			<div>Status: {capitalizeFirstLetter(meta.state)}</div>
			<div>Description: {meta.comments}</div>
		</div>
	</div>

	<div class="border border-back p-4">
		{#each data.messageLog as message, i}
			{#if message.meta.type === 'Version Initial'}
				<CreateDifferences {data} {message} _id={data._id} />
			{:else if message.meta.type === 'Version'}
				<EditDifferences {message} index={i} />
			{:else if message.meta.type === 'Comment'}
				<Comment {message} />
			{/if}
		{/each}
	</div>

	<div class="">
		<MessageInput review={data} />
	</div>

	{#if data.user.isAdmin}
		<div class="flex flex-col gap-4">
			<button
				class="w-full h-10 bg-green-400"
				on:click={() => {
					showApproveModal = true;
				}}>Approve</button
			>
			<Approve review={data} bind:showModal={showApproveModal} />
			<button class="w-full h-10 bg-red-400" on:submit={() => {}}>Reject</button>
		</div>
	{/if}
</div>
