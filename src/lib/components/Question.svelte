<script>
	import MCQ from '$lib/components/MCQ.svelte';
	import SPR from '$lib/components/SPR.svelte';
	import { Spinner } from 'flowbite-svelte';
	import { format } from '$lib/parser.js';

	export let isLoading;
	export let data;

	export let showAnswer;
	export let selectedAnswer;

	$: {
		if (isLoading) {
			showAnswer = false;
			selectedAnswer = '';
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
						<SPR bind:showAnswer bind:selectedAnswer />
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
						{#if data.questionType === 'spr'}
							<div>
								{@html format(data.question.rationale)}
							</div>
						{:else}
							{#each data.question.rationale as item}
								<div>
									{@html format(item)}
								</div>
							{/each}
						{/if}
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}
