<script>
	import { mathjax } from '$lib/mathjax.js';
	export let data;

	export let showAnswer = false;
</script>

<div class="bg-blue-200 py-2 px-2">
	<div class="pl-4">
		<div class="text-lg">ID: {data.id.SAT}</div>
		<div class="text-lg">Section: {data.section}</div>
		<div class="text-lg">Level {data.difficulty}</div>
	</div>

	<div>
		<div>
			<div class="rawdog" use:mathjax>
				{@html data.question.stimulus || ''}
			</div>

			<div class="py-4">
				<div class="rawdog" use:mathjax>
					{@html data.question.stem || ''}
				</div>

				<div class="pl-8">
					{#if data.questionType === 'mcq'}
						{#each data.question.answerOptions as answerOption, i}
							<div class="flex flex-row">
								<div>{@html `${String.fromCharCode('A'.charCodeAt(0) + i)}.&nbsp;`}</div>
								<div class="rawdog">{@html answerOption}</div>
							</div>
						{/each}
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
{#if showAnswer}
	<div class="p-8 my-5 bg-blue-200" use:mathjax>
		{#if data.questionType === 'spr'}
			<div>
				{@html data.question.rationale}
			</div>
		{:else}
			{#each data.question.rationale as item}
				<div>
					{@html item}
				</div>
			{/each}
		{/if}
	</div>
{:else}
	<div
		class="p-8 my-5 bg-blue-200 hover:bg-blue-400 cursor-pointer"
		on:click={() => (showAnswer = true)}
	>
		Click to reveal the answer
	</div>
{/if}
