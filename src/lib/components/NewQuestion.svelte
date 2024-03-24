<script>
	export let data;
	import MCQ from '$lib/components/MCQ.svelte';
	import { Spinner } from 'flowbite-svelte';
	import { format } from '$lib/parser.js';

	export let user;
	export let isLoading;

	let showAnswer, selectedAnswer;

	$: {
		if (isLoading) {
			showAnswer = false;
			selectedAnswer = '';
		}
	}

	$: {
		if (showAnswer) {
			const res = fetch('/api/updateStats', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					question: data,
					user,
					selectedAnswer
				})
			});
		}
	}
</script>

{#if isLoading}
	<div
		class="px-4 py-2 bg-cyan-500 border-black border-x-2 border-t-2 flex flex-start justify-between"
	>
		Loading
	</div>
	<div class="border-black border-2 h-96 mb-5 flex items-center justify-center">
		<Spinner color="gray" size={8} />
	</div>
{:else}
	<div class="">
		<div
			class="px-4 py-2 bg-cyan-500 border-black border-x-2 border-t-2 flex flex-start justify-between"
		>
			<div>
				ID: {data.id.SAT}
			</div>
			<div>
				Level {data.difficulty} &bull;
				{data.skill}
			</div>
		</div>

		<div class="border-black border-2">
			<div class="flex flex-start">
				<div class="basis-1/2 p-4">
					<div class="rawdog">
						{@html format(data.question.stimulus || '')}
					</div>
				</div>

				<div class="basis-1/2 p-4">
					{@html format(data.question.stem || '')}

					{#if data.questionType === 'spr'}
						Test
					{:else}
						<MCQ {data} bind:showAnswer bind:selectedAnswer />
					{/if}
				</div>
			</div>
			{#if showAnswer}
				<div class="p-8 mx-5 mb-5 bg-slate-300">
					<div>
						Your Answer: {selectedAnswer}
					</div>
					<div>
						Correct Answer: {data.question.correctAnswer}
					</div>
					<div>
						{#each data.question.rationale as item}
							<div>
								{@html format(item)}
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}

<link rel="stylesheet" href="/question.css" />

<style>
	:global(.sr-only) {
		display: none;
	}

	/* :global(table) {
		margin: 0 auto;
	} */

	:global(svg) {
		display: block;
		margin: 0 auto;
	}

	:global(.standalone_image img, .standalone_statement img) {
		display: block;
		margin: 0 auto;
	}

	:global(.image-options-wrapper img) {
		display: block;
		margin: 0 auto 20px auto;
	}

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
		border: 1px solid black;
		padding: 4px;
	}

	:global(.table) {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	:global(.gdr th, .gdr td) {
		text-align: center;
		border: 1px solid black;
		padding: 4px;
	}
</style>
