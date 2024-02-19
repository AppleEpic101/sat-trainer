<script>
	import { enhance } from '$app/forms';
	export let data;

	let username = data.username;
	let email = data.email;
	let password = '';
	let confirmPassword = '';

	export let form;
</script>

<div class="bg-slate-300 border-black m-8 p-4">
	<div class="text-4xl font-bold">Account</div>
	<form
		method="POST"
		use:enhance={() => {
			return async ({ update }) => {
				await update({ reset: false });
			};
		}}
		class="mt-8"
	>
		<div class="flex flex-row items-center my-4">
			<label class="w-40" for="username">Username:</label>
			<input class="w-full" type="text" name="username" id="username" bind:value={username} />
		</div>

		<div class="flex flex-row items-center my-4">
			<label class="w-40" for="email">Email:</label>
			<input class="w-full" type="text" name="email" id="email" bind:value={email} />
		</div>

		<div class="flex flex-row items-center my-4">
			<label class="w-40" for="password">Change Password:</label>
			<input
				class="w-full"
				type="password"
				name="password"
				id="password"
				bind:value={password}
				placeholder="New password"
			/>
		</div>
		<div class="flex flex-row items-center my-4">
			<label class="w-40" for="confirmPassword"></label>
			<input
				class="w-full"
				type="password"
				name="confirmPassword"
				id="confirmPassword"
				bind:value={confirmPassword}
				placeholder="Confirm password"
			/>
		</div>

		<button type="submit" class="bg-cyan-500 w-full p-2">Update Account Info</button>
	</form>
</div>
