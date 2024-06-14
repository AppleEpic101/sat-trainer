<script>
	export let data;
	export let domain;
	export let skill;
	export let section;
</script>

<div>{skill}</div>
{#each data as user, i}
	{i + 1})
	{user.username}
	{user[section][domain][skill].experience}
{/each}
