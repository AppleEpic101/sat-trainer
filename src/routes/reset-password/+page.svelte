<script>
	import { page } from '$app/stores';
	let token = $page.url.searchParams.get('token');
	let newPassword = '';
	let confirmPassword = '';
	let message = '';
	let error = '';

	const resetPassword = async () => {
		if (newPassword !== confirmPassword) {
			error = 'Passwords do not match.';
			return;
		}

		const response = await fetch('/reset-password', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token, newPassword })
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
	<h2>Reset Password</h2>
	<input type="password" bind:value={newPassword} placeholder="New password" />
	<input type="password" bind:value={confirmPassword} placeholder="Confirm new password" />
	<button on:click={resetPassword}>Reset Password</button>
	{#if message}
		<p>{message}</p>
	{/if}
	{#if error}
		<p>{error}</p>
	{/if}
</div>
