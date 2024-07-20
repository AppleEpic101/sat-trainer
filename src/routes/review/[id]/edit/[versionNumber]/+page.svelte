<script>
	import { formatDate } from '$lib/util.js';
	import Question from '$lib/components/Question.svelte';
	import ReviewInterface from '$lib/components/ReviewInterface.svelte';
	export let data;

	let copy = JSON.parse(JSON.stringify(data.version.newData)); //copy

	const { version, versionNumber, user } = data;
	let activeTab = 'new';
</script>

<div class="ml-4">
	<div class="text-2xl">Version {versionNumber}</div>
	<div class="text-lg">By {version.meta.user.username}, {formatDate(version.meta.date)}</div>
	<div class="text-lg">Comments: {version.meta.comments}</div>
</div>

<div class="p-2 shadow-lg rounded-lg bg-gray-100">
	<Question data={version.newData} showAnswer={true} />
</div>

<div class="m-4">
	<ReviewInterface bind:newData={version.newData} {user} oldData={copy} />
</div>
