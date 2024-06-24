<script>
	export let data;

	const { reviews, user } = data;

	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	$: console.log(data);
</script>

<div class="flex flex-row flex-wrap m-4">
	{#each reviews as review}
		<a href={`/review/${review}`}>
			<div class="bg-slate-300 p-4 hover:bg-slate-400 cursor-pointer">
				<div class="text-2xl">{capitalizeFirstLetter(review.meta.type)} by {user.username}</div>
				<div>{review.meta.questionID}</div>
				<div>{review.meta.date}</div>
				<div>{review.meta.decision}</div>
				<div>{review.meta.comments}</div>
			</div></a
		>
	{/each}
</div>
