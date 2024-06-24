<script>
	import { formatDate } from '$lib/util.js';
	export let data;

	const { reviews, user } = data;

	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

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

<div class="flex flex-row flex-wrap m-4 gap-2">
	{#each reviews as review}
		<a href={`/review/${review._id}`}>
			<div class="bg-slate-300 w-96 p-4 hover:bg-slate-400 cursor-pointer">
				<div class="text-2xl">{capitalizeFirstLetter(review.meta.type)} by {user.username}</div>
				<div>{formatDate(review.meta.date)}</div>
				<div>Question ID: {review.meta.questionID}</div>
				<div>Status: {capitalizeFirstLetter(review.meta.decision)}</div>
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
