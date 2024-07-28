<script>
	import { Input, Label, Helper, Button } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	let email = '';
	let password = '';
	let username = '';

	export let form;
</script>

<form method="POST" use:enhance class="flex justify-center items-center">
	<div class="border-2 border-black rounded-lg p-5 mt-8 w-96">
		<h2 class="text-2xl font-bold">Login</h2>

		<a href="/oauth">Login with Google</a>
		<div class="my-3">
			<label class="block" for="email">Username/Email:</label>
			<input
				class="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
				id="email"
				name="email"
				type="text"
				bind:value={email}
			/>
		</div>

		<div class="my-3">
			<label class="block" for="password">Password:</label>
			<input
				class="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
				id="password"
				type="password"
				name="password"
				bind:value={password}
			/>
		</div>
		<button
			on:click={() => {
				goto('/request-reset');
			}}>Forgot password?</button
		>

		<button class="w-full text-base mt-3 p-2 bg-purple-400" type="submit">Log in</button>

		{#if form?.error}
			<p>{form.error}</p>
		{/if}
		{#if form?.message}
			<p>{form.message}</p>
		{/if}
	</div>
</form>
