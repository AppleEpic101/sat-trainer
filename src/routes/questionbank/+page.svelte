<script>
	import { onMount } from 'svelte';

	let countdown = '';

	function updateCountdown() {
		const targetDate = new Date(new Date().getFullYear(), 7, 24, 8, 0, 0); // August 24 of the current year
		const now = new Date();
		const timeDifference = targetDate - now;

		if (timeDifference <= 0) {
			countdown = 'The event has started!';
			return;
		}

		const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
		const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

		countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
	}

	onMount(() => {
		updateCountdown();
		const interval = setInterval(updateCountdown, 1000);

		return () => clearInterval(interval);
	});
</script>

<div class="bg-sky-950 h-screen flex flex-col gap-8 items-center p-4">
	<div>
		<div class="text-3xl text-white mb-4">QuestionBank Mode</div>

		<div class="ml-12">
			<div class="text-xl text-white mb-4">
				Each section sources questions from the <a
					href="https://satsuitequestionbank.collegeboard.org/digital/search"
					target="_blank"
					class="underline text-cyan-300">Official College Board Question Bank.</a
				>
			</div>
			<div class="text-xl text-white mb-4">
				Each question is tagged with the relevant skill and difficulty level. You can query
				questions by skill or difficulty level.
			</div>
			<div class="text-xl text-white mb-4">
				Questions are rated 1-7 in increasing order of difficulty (official difficulty per College
				Board)
			</div>
			<div class="text-xl text-white mb-4">Find any errors? Report it to me :)</div>
		</div>
	</div>
	<div class="text-4xl text-white mb-4">Lock in! You have {countdown} until the August SAT</div>
	<div class="flex flex-row gap-8">
		<a
			class="font-bold text-2xl bg-orange-300 hover:bg-orange-400 text-black w-48 text-center p-6 rounded-lg shadow-lg transition duration-300"
			href="/questionbank/rw"
		>
			Reading
		</a>
		<a
			class="font-bold text-2xl bg-indigo-300 hover:bg-indigo-400 text-black w-48 text-center p-6 rounded-lg shadow-lg transition duration-300"
			href="/questionbank/math"
		>
			Math
		</a>
	</div>
</div>
