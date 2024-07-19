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

<div class="">
	<div class="bg-slate-300 w-full p-4 m-4 cursor-pointer">
		<div class="text-2xl">{capitalizeFirstLetter(meta.type)} by {meta.user.username}</div>
		<div>{formatDate(meta.date)}</div>
		<div>Question ID: {meta.questionID}</div>
		<div>Status: {capitalizeFirstLetter(meta.state)}</div>
		<div>Description: {meta.comments}</div>
	</div>

	<div class="border border-back p-4 m-4">
		{#each data.messageLog as message, i}
			{#if message.meta.type === 'Version Initial'}
				<CreateDifferences newData={message.newData} />
			{:else if message.meta.type === 'Version'}
				<EditDifferences {message} index={i} />
			{:else if message.meta.type === 'Comment'}
				<Comment {message} />
			{/if}
		{/each}
	</div>

	<div class="m-4">
		<MessageInput review={data} />
	</div>

	{#if data.user.isAdmin}
		<div class="flex flex-col gap-4 mx-4 mb-4">
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
