<script>
	export let review;
	let comment = '';
	// $: console.log('before comment', review);
	const postComment = async () => {
		console.log('NIGGA', comment, review);
		const response = await fetch('/api/review/comment', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ comment, review })
		});

		if (response.ok) {
			console.log('Comment posted');
		} else {
			console.error('Failed to post comment');
		}
	};
</script>

<div
	class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
>
	<div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
		<label for="comment" class="sr-only">Your comment</label>
		<textarea
			id="comment"
			rows="4"
			class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
			placeholder="Write a comment..."
			required
			bind:value={comment}
		></textarea>
	</div>
	<div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
		<button
			type="submit"
			class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
			on:click={postComment}
		>
			Post comment
		</button>
	</div>
</div>
