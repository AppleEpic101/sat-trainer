<script>
	import { formatDate, capitalizeFirstLetter } from '$lib/util.js';
	export let data;

	const { reviews } = data;

	const deleteReview = async (id) => {
		const res = await fetch('/api/review/postReview', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				_id: id
			})
		});
	};
</script>

<div class="mx-4 my-2">
	<a href="/create">
		<div class="bg-green-300 text-4xl p-4 text-center">Create New Question</div>
	</a>
	<div class="text-3xl my-4">Review Board</div>
	<div class="flex flex-row flex-wrap gap-2">
		{#each reviews as review}
			<a href={`/review/${review._id}`}>
				<div class="bg-slate-300 w-96 p-4 hover:bg-slate-400 cursor-pointer">
					<div class="text-2xl">
						{capitalizeFirstLetter(review.meta.type)} by {review.meta.user.username}
					</div>
					<div>{formatDate(review.meta.date)}</div>
					<div>Question ID: {review.meta.questionID}</div>
					<div>Status: {capitalizeFirstLetter(review.meta.state)}</div>
					<div>Description: {review.meta.comments}</div>
				</div></a
			><button
				class="bg-blue-300 hover:bg-blue-400"
				on:click={() => {
					deleteReview(review._id);
				}}>Delete</button
			>
		{/each}
	</div>
</div>
