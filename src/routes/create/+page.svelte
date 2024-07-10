<script>
	import Question from '$lib/components/Question.svelte';
	import CreateInterface from '$lib/components/CreateInterface.svelte';
	export let data;
	let { user } = data;

	let qData = {
		status: 'pending',
		source: 'Sigma SAT',
		program: ['SAT'],
		section: 'Reading',
		questionType: 'mcq',
		question: {
			stimulus: '',
			stem: '',
			answerOptions: ['', '', '', ''],
			correctAnswer: 'A',
			rationale: ['', '', '', '']
		},
		isLive: false,
		stats: {
			probability: 0,
			correct: 0,
			incorrect: 0,
			skipped: 0
		},
		id: {
			SAT: 'TBD'
		},
		difficulty: 1,
		skill: 'Central Ideas and Details',
		domain: 'Information and Ideas'
	};
</script>

<div class="m-4">
	<Question data={qData} showAnswer={false} />

	<CreateInterface bind:data={qData} {user} />
</div>
