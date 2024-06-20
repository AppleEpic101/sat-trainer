<script>
	export let data;
	export let title;
	export let path;

	const getNestedProperty = (obj, path) => {
		return path.split('.').reduce((acc, part) => acc && acc[part], obj);
	};
</script>

<div class="text-lg">{title}</div>

<div class="overflow-x-auto relative">
	<table class="w-96 text-sm text-left">
		<thead class="text-xs text-gray-700 uppercase bg-emerald-400">
			<tr>
				<th scope="col" class="py-2 px-6">Rank</th>
				<th scope="col" class="py-2 px-6">Username</th>
				<th scope="col" class="py-2 px-6">Level</th>
			</tr>
		</thead>
		<tbody>
			{#each data as user, i}
				<tr class="bg-white border">
					<td class="py-1 px-6">{i + 1}</td>
					<td class="py-1 px-6">{user.username}</td>
					<td class="py-1 px-6">{getNestedProperty(user, path).experience}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
