<script>
	import Select from '$lib/components/Select.svelte';
	import InputText from '$lib/components/InputText.svelte';
	import { goto } from '$app/navigation';

	export let newData;
	export let user;

	export let oldData;

	let comments = '';

	const equals = (obj1, obj2) => {
		return JSON.stringify(obj1) === JSON.stringify(obj2);
	};

	$: change = equals(newData, oldData);

	let showButton = true;

	const postReview = async () => {
		showButton = false;

		let date = new Date();

		if (comments === '') {
			comments = 'None';
		}

		const res = await fetch('/api/review/postReview', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				versions: [
					{
						oldData,
						newData,
						meta: {
							type: 'Version',
							versionNumber: 1,
							user,
							date,
							comments
						}
					}
				],
				messageLog: [
					{
						oldData,
						newData,
						meta: {
							type: 'Version',
							versionNumber: 1,
							user,
							date,
							comments
						}
					}
				],
				meta: {
					state: 'open',
					type: 'edit',
					comments: comments,
					date: date,
					questionID: oldData.id.SAT,
					user
				}
			})
		});
		goto('/review');

		let { message } = await res.json();
	};
</script>

<div class="bg-red-300 p-4 my-4">
	<div class="text-xl">Admin Panel</div>
	<div class="text-lg">Metadata</div>

	<InputText label={'ID'} selectedValue={newData.id.SAT} />
	<Select label={'Status'} options={['active', 'inactive']} selectedValue={newData.status} />
	<Select
		label={'Source'}
		options={['College Board', 'Sigma SAT']}
		bind:selectedValue={newData.source}
	/>
	<Select label={'Section'} options={['Reading', 'Math']} bind:selectedValue={newData.section} />
	<Select label={'Type'} options={['mcq', 'spr']} bind:selectedValue={newData.questionType} />
	<Select
		label={'Difficulty'}
		options={[1, 2, 3, 4, 5, 6, 7]}
		bind:selectedValue={newData.difficulty}
	/>
	<InputText label={'Attribution'} bind:selectedValue={newData.attribution} />
	<Select label={'Notation'} options={['LaTeX', 'MathML']} bind:selectedValue={newData.notation} />

	<div class="text-lg">Question</div>
	<InputText label={'Stimulus (HTML)'} bind:selectedValue={newData.question.stimulus} />
	<InputText label={'Stem (HTML)'} bind:selectedValue={newData.question.stem} />

	<InputText label={'Answer Options'} bind:selectedValue={newData.question.answerOptions[0]} />
	<InputText bind:selectedValue={newData.question.answerOptions[1]} />
	<InputText bind:selectedValue={newData.question.answerOptions[2]} />
	<InputText bind:selectedValue={newData.question.answerOptions[3]} />

	<Select
		label={'Correct Answer'}
		options={['A', 'B', 'C', 'D']}
		bind:selectedValue={newData.question.correctAnswer}
	/>

	<InputText label={'Rationale'} bind:selectedValue={newData.question.rationale[0]} />
	<InputText bind:selectedValue={newData.question.rationale[1]} />
	<InputText bind:selectedValue={newData.question.rationale[2]} />
	<InputText bind:selectedValue={newData.question.rationale[3]} />

	{#if !change && showButton}
		<button class="bg-green-400 w-full p-2" on:click={postReview}>Post to Review Board</button>
		<InputText label={'Explain what you changed'} bind:selectedValue={comments} />
	{/if}
</div>
