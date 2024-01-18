<script>
	let email = '';
	let password = '';

	const handleLogin = async () => {
		const res = await fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		});

		const data = await res.json();

		if (res.ok) {
			console.log('success');
			console.log(data);
		} else {
			console.log('error');
			console.error(data);
		}
		// Handle login logic here
		console.log(`Email: ${email}, Password: ${password}`);
	};
</script>

<form method="POST" on:submit|preventDefault={handleLogin}>
	<label for="email">Email:</label>
	<input id="email" type="email" bind:value={email} required />

	<label for="password">Password:</label>
	<input id="password" type="password" bind:value={password} required />

	<button type="submit">Log in</button>
</form>
