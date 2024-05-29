<script>
	export let data;
	console.log(data);
	const { question, user } = data;
</script>

<div class="m-4">
	<div class="bg-slate-300 px-8 py-2">
		<div class="text-lg">ID: {data.question.id.SAT}</div>
		<div class="text-lg">Section: {data.question.section}</div>
		<div class="text-lg">Level {data.question.difficulty}</div>
		<div class="rawdog">
			{@html data.question.question.stimulus}
			{@html data.question.question.stem}
		</div>
	</div>

	{#if data.user.isAdmin}
		<div class="bg-red-300 p-8 my-4">
			<div class="text-lg">Admin Panel</div>

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

			<div class="flex flex-row items-center my-4">
				<label class="w-40" for="stimulus">Stimulus</label>
				<input
					class="w-full"
					type="text"
					name="stimulus"
					bind:value={data.question.question.stimulus}
				/>
			</div>

			<div class="flex flex-row items-center my-4">
				<label class="w-40" for="stem">Stem</label>
				<input class="w-full" type="text" name="stem" bind:value={data.question.question.stem} />
			</div>
		</div>
	{/if}
</div>
