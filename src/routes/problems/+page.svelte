<svelte:head>
	<title>Problem List</title>
	<meta
		name="description"
		content="Search SAT questions in our database by skill, difficulty, and section!"
	/>
	<meta name="og:title" content="Sigma SAT | Problem List" />
	<meta
		name="og:description"
		content="Search SAT questions in our database by skill, difficulty, and section!"
	/>
</svelte:head>

<div class="bg-sky-950 h-screen flex flex-col gap-8 items-center p-4">
	<div>
		<div class="text-3xl text-white mb-4">Problem List</div>

		<div class="ml-12">
			<div class="text-xl text-white mb-4">
				Most questions are from the <a
					href="https://satsuitequestionbank.collegeboard.org/digital/search"
					target="_blank"
					class="underline text-cyan-300">Official College Board Question Bank.</a
				>
			</div>
			<div class="text-xl text-white mb-4">
				Additional questions are from BlueBook Practice Test 5 and 6. These questions are not yet
				part of the <a
					href="https://satsuitequestionbank.collegeboard.org/digital/search"
					target="_blank"
					class="underline text-cyan-300">Official College Board Question Bank.</a
				>
			</div>
			<div class="text-xl text-white mb-4">
				Each question is tagged with the relevant skill and difficulty level. You can query
				questions by skill or difficulty level.
			</div>
			<div class="text-xl text-white mb-4">Find any errors? Report it to me :)</div>
		</div>
	</div>

	<div class="flex flex-row gap-8">
		<a
			class="font-bold text-2xl bg-orange-300 hover:bg-orange-400 text-black w-48 text-center p-6 rounded-lg shadow-lg transition duration-300"
			href="/problems/reading"
		>
			Reading
		</a>
		<a
			class="font-bold text-2xl bg-indigo-300 hover:bg-indigo-400 text-black w-48 text-center p-6 rounded-lg shadow-lg transition duration-300"
			href="/problems/math"
		>
			Math
		</a>
	</div>
</div>
