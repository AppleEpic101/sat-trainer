<header>
	<div class="left-menu">
		<a id="logo" href="/">SAT Illuminate</a>
		<a class="menu" href="/train">Train</a>
		<a class="menu" href="/stats">Stats</a>
		<a class="menu" href="/about">About</a>
	</div>

	<div class="right-menu">
		<a class="menu" href="/login">Login</a>
	</div>
</header>

<main>
	<slot />
</main>

<style>
	:global(html) {
		font-family: 'Roboto', sans-serif;
		background-color: #2c2e2d;
		color: white;
		overflow-x: hidden;
	}

	:global(body) {
		margin: 0;
	}

	:global(h1, h2, h3, h4, h5, h6) {
		margin: 0;
	}

	:global(a) {
		text-decoration: none;
		color: inherit;
	}

	:global(.math-img, svg, img) {
		filter: invert();
	}

	:global(.answer-choices img) {
		background-color: inherit;
		filter: saturate();
	}

	:global(table, th, td) {
		border: 1px solid white;
		border-collapse: collapse;
		padding: 3px;
	}

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: rgb(28, 31, 33);
		height: 50px;
		font-size: 1.5rem;
	}

	header,
	main {
		width: 100%;
		max-width: 72rem;
		margin: 2rem auto;
		padding: 0.5rem 1.2rem;
	}

	#logo {
		font-weight: 700;
		margin: 0 1rem;
	}

	.menu {
		margin: 0 1rem;
	}
</style>
