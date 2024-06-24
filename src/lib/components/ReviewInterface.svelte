<script>
	import Select from '$lib/components/Select.svelte';
	import InputText from '$lib/components/InputText.svelte';
	import { goto } from '$app/navigation';
	export let data;
	export let user;

	export let copy;

	let reviewComment = '';

	const equals = (obj1, obj2) => {
		return JSON.stringify(obj1) === JSON.stringify(obj2);
	};

	$: change = equals(data, copy);

	const postReview = async () => {
		goto('/review');
		const res = await fetch('/api/review/postReview', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				oldData: copy,
				newData: data,
				user,
				comments: reviewComment
			})
		});

		let { message } = await res.json();
	};
</script>

<div class="bg-red-300 p-4 my-4">
	<div class="text-xl">Admin Panel</div>
	<div class="text-lg">Metadata</div>

	<InputText label={'ID'} selectedValue={data.id.SAT} />
	<Select
		label={'Status'}
		options={['active', 'inactive', 'pending']}
		selectedValue={data.status}
	/>
	<Select
		label={'Source'}
		options={['College Board', 'Sigma SAT']}
		bind:selectedValue={data.source}
	/>
	<Select label={'Section'} options={['Reading', 'Math']} bind:selectedValue={data.section} />
	<Select label={'Type'} options={['mcq', 'spr']} bind:selectedValue={data.questionType} />
	<Select
		label={'Difficulty'}
		options={[1, 2, 3, 4, 5, 6, 7]}
		bind:selectedValue={data.difficulty}
	/>

	<div class="text-lg">Question</div>
	<InputText label={'Stimulus (HTML)'} bind:selectedValue={data.question.stimulus} />
	<InputText label={'Stem (HTML)'} bind:selectedValue={data.question.stem} />

	<InputText label={'Answer Options'} bind:selectedValue={data.question.answerOptions[0]} />
	<InputText bind:selectedValue={data.question.answerOptions[1]} />
	<InputText bind:selectedValue={data.question.answerOptions[2]} />
	<InputText bind:selectedValue={data.question.answerOptions[3]} />

	<Select
		label={'Correct Answer'}
		options={['A', 'B', 'C', 'D']}
		bind:selectedValue={data.question.correctAnswer}
	/>

	<InputText label={'Rationale'} bind:selectedValue={data.question.rationale[0]} />
	<InputText bind:selectedValue={data.question.rationale[1]} />
	<InputText bind:selectedValue={data.question.rationale[2]} />
	<InputText bind:selectedValue={data.question.rationale[3]} />

	{#if !change}
		<button class="bg-green-400 w-full p-2" on:click={postReview}>Post to Review Board</button>
		<InputText label={'Explain what you changed'} bind:selectedValue={reviewComment} />
	{/if}
</div>
