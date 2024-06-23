<script>
	import Unsaved from '$lib/modals/Unsaved.svelte';
	import StaticQuestion from '$lib/components/StaticQuestion.svelte';
	export let data;

	const { question, user } = data;

	let dataCopy = { ...data }; // copy

	let showModal = false;

	export let form;
</script>

<div class="m-4">
	<StaticQuestion data={data.question} />

	{#if data.user.isAdmin}
		<form method="POST" class="bg-red-300 p-8 my-4">
			<div class="text-xl">Admin Panel</div>

			<div class="text-lg">Metadata</div>

			<div class="flex flex-row items-center my-4">
				<label class="w-40" for="source">Source</label>
				<input class="w-full" type="text" name="source" bind:value={data.question.source} />
			</div>

			<div class="flex flex-row items-center my-4">
				<label class="w-40" for="section">Section</label>
				<input class="w-full" type="text" name="section" bind:value={data.question.section} />
			</div>

			<div class="flex flex-row items-center my-4">
				<label class="w-40" for="questionType">Type</label>
				<input
					class="w-full"
					type="text"
					name="questionType"
					bind:value={data.question.questionType}
				/>
			</div>

			<div class="text-lg">Question</div>

			<div class="flex flex-row items-center my-4">
				<label class="w-40" for="stimulus">Stimulus (HTML)</label>
				<input
					class="w-full"
					type="text"
					name="stimulus"
					bind:value={data.question.question.stimulus}
				/>
			</div>

			<div class="flex flex-row items-center my-4">
				<label class="w-40" for="stem">Stem (HTML)</label>
				<input class="w-full" type="text" name="stem" bind:value={data.question.question.stem} />
			</div>

			<div class="flex flex-row items-center my-4">
				<label class="w-40" for="answerOption1">Answer Options</label>
				<input
					class="w-full"
					type="text"
					name="answerOption1"
					bind:value={data.question.question.answerOptions[0]}
				/>
			</div>

			<div class="flex flex-row items-center my-4">
				<label class="w-40" for="answerOption2"></label>
				<input
					class="w-full"
					type="text"
					name="answerOption2"
					bind:value={data.question.question.answerOptions[1]}
				/>
			</div>

			<div class="flex flex-row items-center my-4">
				<label class="w-40" for="answerOption3"></label>
				<input
					class="w-full"
					type="text"
					name="answerOption3"
					bind:value={data.question.question.answerOptions[2]}
				/>
			</div>

			<div class="flex flex-row items-center my-4">
				<label class="w-40" for="answerOption4"></label>
				<input
					class="w-full"
					type="text"
					name="answerOption4"
					bind:value={data.question.question.answerOptions[3]}
				/>
			</div>

			<button type="submit" class="bg-green-400 w-full p-2"
				>Update Question Data<button> </button>
			</button>
		</form>
	{/if}
</div>
