<script>
	import { READING_SKILLS } from '$lib/util.js';
	import Leaderboard from '$lib/components/Leaderboard.svelte';
	export let data;

	let { readingLeaderboard } = data;
</script>

{#each data.overall as user}
	<div>
		{user.username}
		{user.stats.rating}
	</div>
{/each}

<div>Reading</div>

{#each Object.keys(READING_SKILLS) as domain}
	<div>{domain}</div>
	{#each READING_SKILLS[domain] as skill}
		<div>
			<Leaderboard data={readingLeaderboard[skill]} {domain} {skill} section={'reading'} />
		</div>
	{/each}
{/each}
