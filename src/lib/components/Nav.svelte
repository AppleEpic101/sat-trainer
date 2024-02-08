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
	export let loggedIn;
</script>

<Navbar class="bg-cyan-500">
	<NavBrand href="/">
		<img src="/logo.png" class="me-3 h-12 sm:h-10" alt="Logo" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
			>SAT Illuminate</span
		>
	</NavBrand>
	{#if loggedIn}
		<div class="flex items-center md:order-2">
			<Avatar id="avatar-menu" src="/images/profile-picture-3.webp" />
			<NavHamburger class1="w-full md:flex md:w-auto md:order-1" />
		</div>
		<Dropdown placement="bottom" triggeredBy="#avatar-menu">
			<DropdownHeader>
				<span class="block text-sm">Bonnie Green</span>
				<span class="block truncate text-sm font-medium">name@flowbite.com</span>
			</DropdownHeader>
			<DropdownItem>Dashboard</DropdownItem>
			<DropdownItem>Settings</DropdownItem>
			<DropdownDivider />
			<DropdownItem>Sign out</DropdownItem>
		</Dropdown>
	{/if}
	<NavUl>
		<NavLi class="text-lg hover:" href="/" active={true}>Home</NavLi>
		<NavLi class="text-lg" href="/about">About</NavLi>
		{#if loggedIn}
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
</Navbar>

<!-- <header
	class="mx-24 my-4 px-12 flex flex-row justify-between items-center h-12 py-8 text-2xl bg-cyan-500"
>
	<div class="flex flex-row">
		<a class="mr-2" href="/">SAT Illuminate</a>
		{#if !loggedIn}
			<a class="mx-2" href="/train">Train</a>
			<a class="mx-2" href="/stats">Stats</a>
		{/if}
		<a class="mx-2" href="/about">About</a>
	</div>

	<div class="flex flex-row justify-end">
		{#if !loggedIn}
			<a class="mx-8" href="/login">Login</a>
			<a class="" href="/register">Register</a>
		{/if}
	</div>
</header> -->
