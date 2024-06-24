<script>
	import { formatDate } from '$lib/util.js';
	export let data;

	const { reviews, user } = data;

	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	$: console.log(data);
</script>

<div class="flex flex-row flex-wrap m-4 gap-2">
	{#each reviews as review}
		<a href={`/review/${review}`}>
			<div class="bg-slate-300 w-96 p-4 hover:bg-slate-400 cursor-pointer">
				<div class="text-2xl">{capitalizeFirstLetter(review.meta.type)} by {user.username}</div>
				<div>{formatDate(review.meta.date)}</div>
				<div>Question ID: {review.meta.questionID}</div>
				<div>Status: {capitalizeFirstLetter(review.meta.decision)}</div>
				<div>Description: {review.meta.comments}</div>
			</div></a
		>
	{/each}
</div>
