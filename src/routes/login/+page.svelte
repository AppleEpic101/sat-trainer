<script>
	let email = '';
	let password = '';

	const login = async () => {};
</script>

<h2>Login</h2>
<form on:submit|preventDefault={login}>
	<label for="email">Email:</label>
	<input id="email" type="email" bind:value={email} required />

	<label for="password">Password:</label>
	<input id="password" type="password" bind:value={password} required />

	<button type="submit">Log in</button>
</form>
