<script>
	import { enhance } from '$app/forms';
	let email = '';
	let password = '';

	export let form;
	$: console.log(form);
</script>

<h2>Login</h2>
<form method="POST" use:enhance>
	<label for="email">Email:</label>
	<input id="email" type="email" name="email" bind:value={email} />

	<label for="password">Password:</label>
	<input id="password" type="password" name="password" bind:value={password} />

	<button type="submit">Log in</button>
</form>

{#if form?.error}
	<p>{form.error}</p>
{/if}
{#if form?.message}
	<p>{form.message}</p>
{/if}
