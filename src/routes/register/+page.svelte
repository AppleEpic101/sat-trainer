<script>
	let email = '';
	let password = '';

	const register = async () => {
		const res = await fetch('/api/register', {
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
	};
</script>

<h2>Register</h2>
<form on:submit|preventDefault={register}>
	<label for="email">Email:</label>
	<input id="email" type="email" bind:value={email} required />

	<label for="password">Password:</label>
	<input id="password" type="password" bind:value={password} required />

	<button type="submit">Register</button>
</form>
