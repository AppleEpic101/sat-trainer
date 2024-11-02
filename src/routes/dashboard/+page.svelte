<script>
	import { user } from '$lib/stores/user.js';

	const { stats, log, username } = $user;

	const reading = log['All Reading Topics'].stats;
	const math = log['All Math Topics'].stats;
</script>

<div class="bg-slate-300 border-black p-4">
	<div class="text-4xl font-bold">Welcome {username}!</div>
	<div class="text-2xl mt-4">General Stats</div>
	<div class="flex flex-col ml-4">
		<div>Attempted Questions: {stats.correct + stats.incorrect + stats.skipped}</div>
		<div>Correct: {stats.correct}</div>
		<div>Incorrect: {stats.incorrect}</div>
		<div>Skipped: {stats.skipped}</div>
	</div>

	<div class="text-2xl mt-4">Reading Stats</div>
	<div class="flex flex-col ml-4">
		<div>
			Attempted Questions: {reading.correct + reading.incorrect + reading.skipped}
		</div>
		<div>Correct: {reading.correct}</div>
		<div>Incorrect: {reading.incorrect}</div>
		<div>Skipped: {reading.skipped}</div>
	</div>

	<div class="text-2xl mt-4">Math Stats</div>
	<div class="flex flex-col ml-4">
		<div>
			Attempted Questions: {math.correct + math.incorrect + math.skipped}
		</div>
		<div>Correct: {math.correct}</div>
		<div>Incorrect: {math.incorrect}</div>
		<div>Skipped: {math.skipped}</div>
	</div>
</div>
