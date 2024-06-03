<script>
	export let data;

	console.log(data);
</script>

{#each data.overall as user}
	<div>
		{user.username}
		{user.stats.rating}
	</div>
{/each}
