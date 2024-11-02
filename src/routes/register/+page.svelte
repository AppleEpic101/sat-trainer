<script>
	import { enhance } from '$app/forms';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let username = '';

	export let form;
</script>

<form method="POST" use:enhance class="flex justify-center items-center">
	<div class="border-2 border-black rounded-lg p-5 my-8 w-96">
		<h2 class="text-2xl font-bold">Register</h2>

		<div class="my-3">
			<label class="block" for="username">Username:</label>
			<input
				class="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
				id="username"
				name="username"
				type="text"
				bind:value={username}
			/>
		</div>

		<div class="my-3">
			<label class="block" for="email">Email:</label>
			<input
				class="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
				id="email"
				type="email"
				name="email"
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

		<div class="my-3">
			<label class="block" for="confirmPassword">Confirm Password:</label>
			<input
				class="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
				id="confirmPassword"
				type="password"
				name="confirmPassword"
				bind:value={confirmPassword}
			/>
		</div>

		<button class="w-full text-base mt-3 p-2 bg-purple-400" type="submit">Register</button>

		{#if form?.message}
			<p>
				{form.message}
			</p>
		{/if}

		{#if form?.error}
			<p>
				{form.error}
			</p>
		{/if}
	</div>
</form>
