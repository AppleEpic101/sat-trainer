<script>
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	export let data;

	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	const user = writable();
	const userEmail = writable();
	const userBasic = writable();

	$: user.set(data);
	$: userEmail.set({
		_id: data.user._id,
		username: data.user.username,
		email: data.user.email
	});
	$: userBasic.set({
		_id: data.user._id,
		username: data.user.username,
		meta: data.user.meta
	});

	setContext('user', user);
	setContext('userEmail', userEmail);
	setContext('userBasic', userBasic);
</script>

<Nav cookies={data.user} />

<main class="min-h-screen">
	<slot />
</main>

<Footer />
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
