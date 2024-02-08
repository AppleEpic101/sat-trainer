<script>
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';

	export let data;
	console.log(data);

	const isEmpty = (obj) => {
		return Object.keys(obj).length === 0;
	};
</script>

<Nav loggedIn={!isEmpty(data) || !data} />

<main class="mx-24">
	<slot />
</main>

<!-- <link rel="stylesheet" href="/app.css" /> -->

<!-- <style>
	:global(html) {
		font-family: 'Roboto', sans-serif;
		background-color: var(--primary-background);
		color: var(--primary-text);
		overflow-x: hidden;

		margin: 0 30px;
	}

	:global(body) {
		margin: 0;
	}

	:global(h1, h2, h3, h4, h5, h6, p) {
		margin: 0;
	}

	:global(a) {
		text-decoration: none;
		color: inherit;
	}

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: var(--primary-header);
		height: 50px;
		font-size: 1.5rem;
	}

	header,
	main {
		margin: 1rem auto;
		padding: 0.2rem 1.2rem;
	}

	#logo {
		font-weight: 700;
		margin: 0 1rem;
	}

	.menu {
		margin: 0 1rem;
	}
</style> -->
