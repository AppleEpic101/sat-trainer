<script>
	let email = '';
	let message = '';
	let error = '';

	const requestPasswordReset = async () => {
		const response = await fetch('/request-reset', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email })
		});

		const result = await response.json();
		if (response.ok) {
			message = result.message;
			error = '';
		} else {
			error = result.error;
			message = '';
		}
	};
</script>

<div>
	<h2>Request Password Reset</h2>
	<input type="email" bind:value={email} placeholder="Enter your email" />
	<button on:click={requestPasswordReset}>Request Password Reset</button>
	{#if message}
		<p>{message}</p>
	{/if}
	{#if error}
		<p>{error}</p>
	{/if}
</div>
