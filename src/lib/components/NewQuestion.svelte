<script>
	export let data;
	import MCQ from '$lib/components/MCQ.svelte';
	import { format } from '$lib/parser.js';

	let showAnswer = false;

	console.log(data);

	let difficulty = {
		E: 'Easy',
		M: 'Medium',
		H: 'Hard'
	};

	let selectedAnswer = '';
</script>

<div class="">
	<div
		class="px-4 py-2 bg-cyan-500 border-black border-x-2 border-t-2 flex flex-start justify-between"
	>
		<div>
			ID: {data.questionId}
		</div>
		<div>
			{difficulty[data.difficulty]} &bull;
			{data.skill_desc}
		</div>
	</div>

	<div class="border-black border-2 flex flex-start">
		{#if data.question.type === 'spr'}
			<div id="spr" class="stimulus">
				<div>
					{@html format(data.question.stimulus || '')}
					{@html format(data.question.stem || '')}
				</div>
			</div>
		{:else}
			<div class="basis-1/2 p-4">
				<div>
					{@html format(data.question.stimulus || '')}
					{@html format(data.question.stem || '')}
				</div>
			</div>

			<div class="basis-1/2 p-4">
				<MCQ {data} bind:showAnswer bind:selectedAnswer />
			</div>
		{/if}
	</div>
</div>

{#if showAnswer}
	<div class="answer">
		{@html format(data.question.rationale)}
	</div>
{/if}

<link rel="stylesheet" href="/question.css" />

<!-- <style>
	.question-container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		padding: 0 30px;
		background-color: var(--question-container-header);
		border: 2px solid black;
		border-bottom: 0;
		height: 30px;
	}

	.content {
		display: flex;
		padding: 20px;
		border: 2px solid black;
	}

	.stimulus,
	.answers {
		flex: 1;
	}

	.stimulus {
		margin: 0 10px;
	}

	.answers {
		margin: 0 10px;
	}

	#spr {
		display: flex;
		justify-content: center;
		text-align: center;
	}

	:global(.stimulus p) {
		line-height: 2;
	}

	:global(.sr-only) {
		display: none;
	}

	/* :global(svg) {
		filter: invert();
	} */

	:global(.standalone_image img, .standalone_statement img) {
		display: block;
		margin: 0 auto;
	}

	:global(.image-options-wrapper img) {
		display: block;
		margin: 0 auto 20px auto;
	}

	/* :global(.math-img:not([src='data:image/png;base64,']), .standalone_image img) {
		filter: invert();
	} */

	:global(.stimulus .math-img:is([src='data:image/png;base64,'])) {
		border: 1px solid white;
		border-radius: 20px;
		padding: 10px;
	}

	/* :global(
			.answer-choice img:not([src='data:image/png;base64,']),
			.stimulus p img:not([src='data:image/png;base64,'])
		) {
		filter: invert();
	} */

	:global(.table_WithBorder, .tableWithBorder) {
		border-collapse: collapse;
		text-align: center;
	}
	:global(
			.table_WithBorder,
			.table_WithBorder th,
			.table_WithBorder td,
			.tableWithBorder,
			.tableWithBorder th,
			.tableWithBorder td
		) {
		border: 1px solid white;
		padding: 4px;
	}

	:global(table) {
		margin: 0 auto;
	}

	:global(svg) {
		display: block;
		margin: 0 auto;
	}
</style> -->
