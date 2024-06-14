<script>
	export let data;
	export let domain;
	export let skill;
	export let field;
</script>

<div>{skill}</div>
{#each data as user, i}
	{i + 1}
	{user.username}
	{console.log(user[field])}
{/each}
