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
			<a
				href={`/review/${review._id}`}
				class="block w-72 min-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
			>
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					{capitalizeFirstLetter(review.meta.type)} by {review.meta.user.username}
				</h5>
				<div class="font-normal text-gray-700 dark:text-gray-400">
					<div>{formatDate(review.meta.date)}</div>
					{#if review.meta.questionID}
						<div>Question ID: {review.meta.questionID}</div>
					{/if}
					<div>Status: {capitalizeFirstLetter(review.meta.state)}</div>
					<div>Description: {review.meta.comments}</div>
				</div>
			</a>
			<button
				class="bg-blue-300 hover:bg-blue-400"
				on:click={() => {
					deleteReview(review._id);
				}}>Delete</button
			>
		{/each}
	</div>
</div>
