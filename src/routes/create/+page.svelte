<script>
	import Question from '$lib/components/Question.svelte';
	import CreateInterface from '$lib/components/CreateInterface.svelte';
	import { userBasic } from '$lib/stores/user.js';

	let qData = {
		author: $userBasic,
		attribution: '',
		status: 'active',
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
		notation: 'LaTeX',
		isLive: false,
		stats: {
			probability: 0,
			correct: 0,
			incorrect: 0,
			skipped: 0
		},
		editLog: [],
		id: {
			SAT: 'TBD'
		},
		difficulty: 1,
		skill: 'Central Ideas and Details',
		domain: 'Information and Ideas'
	};
</script>

<div class="p-4">
	<Question data={qData} showAnswer={false} />

	<CreateInterface bind:data={qData} />
</div>
