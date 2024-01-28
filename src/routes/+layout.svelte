<script>
	import '../app.css';
</script>

<header class="px-16 flex flex-row justify-between items-center h-12 py-8 text-2xl bg-cyan-500">
	<div class="basis-1/3">
		<a class="mr-2" href="/">SAT Illuminate</a>
		<a class="mx-2" href="/train">Train</a>
		<a class="mx-2" href="/stats">Stats</a>
		<a class="mx-2" href="/about">About</a>
	</div>

	<div class="basis-1/3 mr-8 flex flex-row justify-end">
		<a class="mx-8" href="/login">Login</a>
		<a class="menu" href="/register">Register</a>
	</div>
</header>

<main class="mx-12">
	<slot />
</main>

<link rel="stylesheet" href="/app.css" />

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
