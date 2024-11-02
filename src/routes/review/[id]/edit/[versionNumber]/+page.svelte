<script>
	import { formatDate } from '$lib/util.js';
	import Question from '$lib/components/Question.svelte';
	import ModifyInterface from '$lib/components/ModifyInterface.svelte';
	export let data;

	let copy = JSON.parse(JSON.stringify(data.version.newData)); //copy

	const { version, user, id, versionNumber } = data;
</script>

<div class="ml-4">
	<div class="text-2xl">Version {version.meta.versionNumber}</div>
	<div class="text-lg">By {version.meta.user.username}, {formatDate(version.meta.date)}</div>
	<div class="text-lg">Comments: {version.meta.comments}</div>
</div>

<div class="p-2 shadow-lg rounded-lg bg-gray-100">
	<Question data={version.newData} showAnswer={true} />
</div>

<div class="p-4">
	<ModifyInterface reviewID={id} bind:newData={version.newData} {version} {user} oldData={copy} />
</div>
