<script id="MathJax-script">
	import { mathjax } from '$lib/mathjax.js';
	import { createEventDispatcher, onMount } from 'svelte';

	export let math;

	// onMount(() => {
	// 	let script = document.createElement('script');
	// 	script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
	// 	document.head.append(script);

	// 	script.onload = () => {
	// 		MathJax = {
	// 			tex: {
	// 				inlineMath: [
	// 					['$', '$'],
	// 					['\\(', '\\)']
	// 				]
	// 			},
	// 			svg: { fontCache: 'global' }
	// 		};
	// 	};
	// 	// console.log('Here');
	// });
</script>

<p use:mathjax>
	{math}
</p>
