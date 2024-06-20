<script>
	import { READING_DOMAIN_LIST, MATH_DOMAIN_LIST, READING_SKILLS, MATH_SKILLS } from '$lib/util.js';
	import Leaderboard from '$lib/components/Leaderboard.svelte';
	export let data;

	let { overall, overallReading, overallMath, readingLeaderboard, mathLeaderboard } = data;
</script>

<div class="mx-8 my-4">
	<div>
		<Leaderboard data={overall} title={'Overall'} path={`stats`} />
	</div>

	<div>
		<Leaderboard data={overallReading} title={'Reading'} path={`reading`} />
		<Leaderboard data={overallMath} title={'Math'} path={`math`} />
	</div>

	<div>Reading Domains</div>

	{#each READING_DOMAIN_LIST as domain}
		<Leaderboard data={readingLeaderboard[domain]} title={domain} path={`reading.${domain}`} />
	{/each}

	<div>Math Domains</div>

	{#each MATH_DOMAIN_LIST as domain}
		<Leaderboard data={mathLeaderboard[domain]} title={domain} path={`math.${domain}`} />
	{/each}

	<div>Reading Skills</div>

	{#each Object.keys(READING_SKILLS) as domain}
		<div class="text-xl text-center">{domain}</div>
		<div class="w-full border border-black my-4 p-4">
			<div class="flex flex-row justify-around gap-4">
				{#each READING_SKILLS[domain] as skill}
					<div>
						<Leaderboard
							data={readingLeaderboard[skill]}
							title={skill}
							path={`reading.${domain}.${skill}`}
						/>
					</div>
				{/each}
			</div>
		</div>
	{/each}

	<div>Math Skills</div>

	{#each Object.keys(MATH_SKILLS) as domain}
		<div class="text-xl text-center">{domain}</div>
		<div class="w-full border border-black my-4 p-4">
			<div class="flex flex-row flex-wrap justify-around gap-4">
				{#each MATH_SKILLS[domain] as skill}
					<div>
						<Leaderboard
							data={mathLeaderboard[skill]}
							title={skill}
							path={`math.${domain}.${skill}`}
						/>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>
