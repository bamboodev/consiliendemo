<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicLink } from '@prismicio/svelte';

	export let slice: Content.NavigationSlice;
	console.log('Complete nav data:', slice);

	let showAbout = false;
	let showServices = false;
</script>

<nav class="flex items-center justify-between px-8 py-4 bg-white shadow">
	<!-- Logo -->
	<div class="flex items-center space-x-2">
		<img src="/logo.png" alt="Logo" class="h-6" />
		<span class="text-gray-700 text-lg font-semibold tracking-wider"> CONSILIEN </span>
	</div>

	<!-- Navigation Links -->
	<ul class="flex space-x-6 text-gray-600 text-sm font-medium">
		<li class="hover:text-gray-900">
			<a href="/">Home</a>
		</li>

		<li class="relative">
			<button
				on:click={() => (showAbout = !showAbout)}
				class="flex items-center space-x-1 hover:text-gray-900 focus:outline-none"
			>
				<span>About</span>
				<span class="text-xs">▼</span>
			</button>
			{#if showAbout}
				<ul class="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md">
					<li class="px-4 py-2 hover:bg-gray-100">
						<a href="/about/story">Our Story</a>
					</li>
					<li class="px-4 py-2 hover:bg-gray-100">
						<a href="/about/team">Team</a>
					</li>
				</ul>
			{/if}
		</li>

		<li class="relative">
			<button
				on:click={() => (showServices = !showServices)}
				class="flex items-center space-x-1 hover:text-gray-900 focus:outline-none"
			>
				<span>Services</span>
				<span class="text-xs">▼</span>
			</button>
			{#if showServices}
				<ul class="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md">
					<li class="px-4 py-2 hover:bg-gray-100">
						<a href="/services/consulting">Consulting</a>
					</li>
					<li class="px-4 py-2 hover:bg-gray-100">
						<a href="/services/development">Development</a>
					</li>
				</ul>
			{/if}
		</li>

		<li class="hover:text-gray-900">
			<a href="/news">News</a>
		</li>

		<li class="hover:text-gray-900">
			<a href="/subscribe">Subscribe</a>
		</li>
	</ul>
</nav>

<!-- <nav data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<ul class="main-menu">

	{#each slice.primary.parent as item}
	<li class="menu-item">
		{item.main_label}
		<ul class="submenu">
		{#each item.submenu as link (link.key)}
		<li class="submenu-item">
			<PrismicLink field={link} />
		</li>
		{/each}
	</ul>
</li>
	{/each}

</ul>
</nav> -->

<!-- <nav data-slice-type="{slice.slice_type}" data-slice-variation="{slice.variation}">
	<ul class="main-menu">
		<li class="menu-item">
			<PrismicLink field={slice.primary.main_link}>
				{slice.primary.main_label}
			</PrismicLink>

			{#if slice.primary.submenu && slice.primary.submenu.length > 0}
				<ul class="submenu">
					{#each slice.primary.submenu as subItem}
						<li class="submenu-item">
							<PrismicLink field={subItem.link}>
								{subItem.label}
							</PrismicLink>
						</li>
					{/each}
				</ul>
			{/if}
		</li>
	</ul>
</nav> -->

<style>
	nav {
		width: 100%;
		padding: var(--size-3);
	}

	.main-menu {
		display: flex;
		list-style: none;
		gap: var(--size-5);
		margin: 0;
		padding: 0;
	}

	.menu-item {
		position: relative;
		padding: var(--size-2);
	}

	.submenu {
		display: none;
		position: absolute;
		top: 100%;
		left: 0;
		background: var(--surface-2);
		border: 1px solid var(--surface-3);
		border-radius: var(--radius-2);
		padding: var(--size-2);
		min-width: 200px;
		box-shadow: var(--shadow-2);
		list-style: none;
	}

	.menu-item:hover .submenu {
		display: block;
	}

	.submenu-item {
		padding: var(--size-2);
	}

	.submenu-item:hover {
		background: var(--surface-3);
	}
</style>
