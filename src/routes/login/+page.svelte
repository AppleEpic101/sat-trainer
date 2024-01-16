<script>
	let email = '';
	let password = '';

	function handleLogin() {
		// Handle login logic here
		console.log(`Email: ${email}, Password: ${password}`);
	}
</script>

<form on:submit|preventDefault={handleLogin}>
	<label for="email">Email:</label>
	<input id="email" type="email" bind:value={email} required />

	<label for="password">Password:</label>
	<input id="password" type="password" bind:value={password} required />

	<button type="submit">Log in</button>
</form>
