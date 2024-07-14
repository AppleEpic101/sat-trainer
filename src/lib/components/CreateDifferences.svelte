<script>
	export let newData;

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

<div class="flex flex-col">
	<div class="flex -mx-3">
		<div class="w-full px-3 mb-6 md:w-1/2">
			<div class="">
				<p>Question created</p>
			</div>
		</div>
		<div class="w-full px-3 mb-6 md:w-1/2">
			<div class="">
				{#each Object.keys(flat) as key}
					<p>{key}: {flat[key]}</p>
				{/each}
			</div>
		</div>
	</div>
</div>
