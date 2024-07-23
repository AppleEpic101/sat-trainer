<script>
	import { formatDate } from '$lib/util.js';
	import Question from '$lib/components/Question.svelte';
	export let data;

	const { version } = data;
	let activeTab = 'new';
</script>

<div class="ml-4">
	<div class="text-2xl">Version {version.meta.versionNumber}</div>
	<div class="text-lg">By {version.meta.user.username}, {formatDate(version.meta.date)}</div>
	<div class="text-lg">Comments: {version.meta.comments}</div>
</div>

<div class="tabs flex justify-center space-x-4 mt-4 mb-1">
	<button
		class="px-4 py-2 text-white rounded hover:bg-blue-700 transition duration-300 {activeTab ===
		'old'
			? 'bg-blue-800'
			: 'bg-blue-400'}"
		on:click={() => (activeTab = 'old')}>Previous Version</button
	>
	<button
		class="px-4 py-2 text-white rounded hover:bg-green-700 transition duration-300 {activeTab ===
		'new'
			? 'bg-blue-800 border-black border-2'
			: 'bg-blue-400'}"
		on:click={() => (activeTab = 'new')}
		>Proposed Version (Version {version.meta.versionNumber})</button
	>
</div>
<div class="border border-black mx-4">
	{#if activeTab === 'old'}
		<div class="p-2 shadow-lg rounded-lg bg-gray-100">
			{#if version.oldData}
				<Question data={version.oldData} showAnswer={true} />
			{:else}
				<div class="text-center">
					Question created by {version.meta.user.username}. A previous version does not exist.
				</div>
			{/if}
		</div>
	{:else if activeTab === 'new'}
		<div class="p-2 shadow-lg rounded-lg bg-gray-100">
			<Question data={version.newData} showAnswer={true} />
		</div>
	{/if}
</div>
