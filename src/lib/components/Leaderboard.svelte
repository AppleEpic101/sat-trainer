<script>
	export let data;
	export let domain;
	export let skill;
	export let section;
</script>

<div class="text-lg">{skill}</div>

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
					<td class="py-1 px-6">{user[section][domain][skill].experience}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
