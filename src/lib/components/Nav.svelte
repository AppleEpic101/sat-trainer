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

	export let cookies;

	const isEmpty = (obj) => {
		return Object.keys(obj).length === 0;
	};

	let loggedIn = !isEmpty(cookies) || !cookies;
</script>

<Navbar class="bg-cyan-500">
	<NavBrand href="/">
		<img src="/logo.png" class="me-3 h-12 sm:h-10" alt="Logo" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
			>SAT Illuminate</span
		>
	</NavBrand>
	{#if loggedIn}
		<div class="flex items-center md:order-2 hover:cursor-pointer">
			<Avatar id="avatar-menu" src="/pfp.jpg" />
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
