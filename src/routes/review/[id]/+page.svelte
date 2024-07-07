<script>
	import { formatDate, capitalizeFirstLetter } from '$lib/util.js';
	import Question from '$lib/components/Question.svelte';
	export let data;

	let { meta } = data;

	$: console.log(data);
</script>

<div class="bg-gray-300">
	<div class="bg-slate-300 w-96 p-4 hover:bg-slate-400 cursor-pointer">
		<div class="text-2xl">{capitalizeFirstLetter(meta.type)} by {meta.user.username}</div>
		<div>{formatDate(meta.date)}</div>
		<div>Question ID: {meta.questionID}</div>
		<div>Status: {capitalizeFirstLetter(meta.state)}</div>
		<div>Description: {meta.comments}</div>
	</div>
</div>
