<script>
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Avatar,
		Dropdown,
		DropdownItem,
		DropdownHeader,
		DropdownDivider
	} from 'flowbite-svelte';
	import { userEmail } from '$lib/stores/user.js';

	$: loggedIn = $userEmail?._id;
	$: isAdmin = $userEmail?.meta?.isAdmin;
	$: isReviewer = $userEmail?.meta?.isReviewer;
</script>

<nav class="bg-cyan-500 flex flex-row justify-between items-center h-20">
	<a class="flex flex-row ml-24" href="/">
		<img src="/logo.png" class="me-3 h-12 sm:h-10" alt="Logo" />
		<span class="self-center whitespace-nowrap text-xl font-semibold">Sigma SAT</span>
	</a>
	<div class="flex flex-row gap-8">
		<a href="/" class="text-lg font-semibold">Home</a>
		<a href="/about" class="text-lg font-semibold">About</a>
		{#if loggedIn}
			<a href="/problems" class="text-lg font-semibold">Problems</a>
			<a href="/train" class="text-lg font-semibold">Train</a>
			<!-- <a href="/stats" class="text-lg font-semibold">Stats</a> -->
		{/if}
		{#if isReviewer || isAdmin}
			<a href="/review" class="text-lg font-semibold">Review-Board</a>
		{/if}
	</div>

	{#if loggedIn}
		<div class="flex items-center mr-24 md:order-2 hover:cursor-pointer">
			<Avatar id="avatar-menu" src="/pfp.jpg" />
			<NavHamburger class1="w-full md:flex md:w-auto md:order-1" />
		</div>
		<Dropdown placement="bottom" triggeredBy="#avatar-menu">
			<DropdownHeader>
				<span class="block text-sm">{$userEmail.username}</span>
				<span class="block truncate text-sm font-medium">{$userEmail.email}</span>
			</DropdownHeader>
			<DropdownItem href="/dashboard">Dashboard</DropdownItem>
			<DropdownItem href="/settings">Settings</DropdownItem>
			<DropdownDivider />

			<form method="post" action="/logout">
				<button type="submit" class="w-full">
					<DropdownItem>Log out</DropdownItem>
				</button>
			</form>
		</Dropdown>
	{:else}
		<div class="flex flex-row gap-8 mr-24">
			<a href="/login" class="text-lg font-semibold">Login</a>
			<a href="/register" class="text-lg font-semibold">Register</a>
		</div>
	{/if}
</nav>

<!-- <Navbar class="bg-cyan-500">
	<NavBrand href="/">
		<img src="/logo.png" class="me-3 h-12 sm:h-10" alt="Logo" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
			>Sigma SAT</span
		>
	</NavBrand>
	{#if loggedIn}
		<div class="flex items-center md:order-2 hover:cursor-pointer">
			<Avatar id="avatar-menu" src="/pfp.jpg" />
			<NavHamburger class1="w-full md:flex md:w-auto md:order-1" />
		</div>
		<Dropdown placement="bottom" triggeredBy="#avatar-menu">
			<DropdownHeader>
				<span class="block text-sm">{cookies.username}</span>
				<span class="block truncate text-sm font-medium">{cookies.email}</span>
			</DropdownHeader>
			<DropdownItem href="/dashboard">Dashboard</DropdownItem>
			<DropdownItem href="/settings">Settings</DropdownItem>
			<DropdownDivider />

			<form method="post" action="/logout">
				<button type="submit" class="w-full">
					<DropdownItem>Log out</DropdownItem>
				</button>
			</form>
		</Dropdown>
	{/if}
	<NavUl>
		<NavLi class="text-lg hover:" href="/" active={true}>Home</NavLi>
		<NavLi class="text-lg" href="/about">About</NavLi>
		{#if loggedIn}
			<NavLi class="text-lg" href="/problems">Problems</NavLi>
			<NavLi class="text-lg" href="/train">Train</NavLi>
			<NavLi class="text-lg" href="/stats">Stats</NavLi>
		{/if}
		<NavLi class="text-lg" href="/contact">Contact</NavLi>
	</NavUl>

	{#if !loggedIn}
		<NavUl>
			<NavLi class="text-lg" href="/login">Login</NavLi>
			<NavLi class="text-lg" href="/register">Register</NavLi>
		</NavUl>
	{/if}
</Navbar> -->
