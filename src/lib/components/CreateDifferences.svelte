<script>
	import { formatDate } from '$lib/util.js';
	export let message;
	export let _id;

	const { newData } = message;

	const flattenObject = (obj, prefix = '') => {
		if (typeof obj !== 'object' || obj === null) {
			return {};
		}

		let flattened = {};

		for (const key in obj) {
			if (typeof obj[key] === 'object' && obj[key] !== null) {
				const nested = flattenObject(obj[key], `${prefix}${key}.`);
				flattened = { ...flattened, ...nested };
			} else {
				flattened[`${prefix}${key}`] = obj[key];
			}
		}
		return flattened;
	};

	let flat = flattenObject(newData);
</script>

<div class="flex items-center gap-2.5">
	<img class="w-8 h-8 rounded-full" src="/pfp.jpg" />
	<div>
		<span class="text-sm font-semibold text-gray-900 dark:text-white"
			>{message.meta.user.username}</span
		>
		created a new question (Version 1) on
		<span class="text-sm font-normal text-gray-500 dark:text-gray-400"
			>{formatDate(message.meta.date)}</span
		>
	</div>
</div>
<div class="flex flex-col gap-1 w-full mr-16">
	<div
		class="flex flex-col leading-1.5 p-4 mt-4 gap-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700"
	>
		<a href={`/review/${_id}/view/1`}
			><button class="bg-green-300 text-center w-full h-8">View This Version (Version 1)</button></a
		>
		<a href={`/review/${_id}/edit/1`}
			><button class="bg-teal-300 text-center w-full h-8">Modify This Version (Version 1)</button
			></a
		>

		<div class="w-full px-3 mb-6 md:w-1/2">
			<div class="">
				{#each Object.keys(flat) as key}
					<p>{key}: {flat[key]}</p>
				{/each}
			</div>
		</div>
		<p class="text-sm font-normal text-gray-900 dark:text-white"></p>
	</div>
</div>
