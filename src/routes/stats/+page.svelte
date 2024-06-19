<script>
	import { READING_SKILLS } from '$lib/util.js';
	import Leaderboard from '$lib/components/Leaderboard.svelte';
	export let data;

	let { readingLeaderboard } = data;
</script>

<div class="mx-8 my-4">
	{#each data.overall as user}
		<div>
			{user.username}
			{user.stats.rating}
		</div>
	{/each}

	<div>Reading</div>

	{#each Object.keys(READING_SKILLS) as domain}
		<div class="text-xl text-center">{domain}</div>
		<div class="w-full border border-black my-4 p-4">
			<div class="flex flex-row justify-around gap-4">
				{#each READING_SKILLS[domain] as skill}
					<div>
						<Leaderboard data={readingLeaderboard[skill]} {domain} {skill} section={'reading'} />
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>
