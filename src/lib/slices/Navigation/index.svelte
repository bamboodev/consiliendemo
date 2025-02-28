<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicLink } from '@prismicio/svelte';
	import { fade, scale, slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	export let slice: Content.NavigationSlice;

	// State to control dropdown visibility
	let activeMenu = null;
	// State to control mobile menu visibility
	let isMobileMenuOpen = false;

	// Toggle function for any dropdown menu
	function toggleMenu(menuName, event) {
		// Prevent the click from bubbling up to the window
		if (event) event.stopPropagation();

		if (activeMenu === menuName) {
			// If this menu is already open, close it
			activeMenu = null;
		} else {
			// Otherwise, close any open menu and open this one
			activeMenu = menuName;
		}
	}

	// Toggle mobile menu
	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	// Close the menu when clicking outside of any menu component
	function handleClickOutside(event) {
		// Only process if a menu is active
		if (!activeMenu) return;

		// Check if the click was on a menu button
		const wasClickOnMenuButton = event.target.closest('[data-menu-button]');

		// Check if the click was inside a dropdown
		const wasClickInDropdown = event.target.closest('[data-dropdown]');

		// If click was neither on a menu button nor inside a dropdown, close the menu
		if (!wasClickOnMenuButton && !wasClickInDropdown) {
			activeMenu = null;
		}
	}
</script>

<svelte:window on:click={handleClickOutside} />

<nav class="bg-white shadow font-text font-light uppercase font-xs tracking-wider">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between h-16">
			<!-- Logo -->
			<div class="flex-shrink-0 flex items-center">
				<img src="/images/logo.svg" alt="Logo" class="h-6 my-3 ml-3" />
			</div>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex items-center">
				<ul class="flex space-x-6 font-text font-light uppercase text-sm">
					<li class="hover:text-black">
						<a href="/">Home</a>
					</li>

					<!-- About Menu -->
					<li class="relative inline-block text-left">
						<div>
							<button
								type="button"
								class="inline-flex w-full justify-center gap-x-1.5 bg-white font-text font-light uppercase"
								id="about-menu-button"
								data-menu-button="about"
								aria-expanded={activeMenu === 'about'}
								aria-haspopup="true"
								on:click={(e) => toggleMenu('about', e)}
							>
								About
								<svg
									class="-mr-1 size-5 text-gray-400"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
									data-slot="icon"
								>
									<path
										fill-rule="evenodd"
										d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
										clip-rule="evenodd"
									/>
								</svg>
							</button>
						</div>

						{#if activeMenu === 'about'}
							<div
								data-dropdown="about"
								class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
								role="menu"
								aria-orientation="vertical"
								aria-labelledby="about-menu-button"
								tabindex="-1"
								in:scale={{ duration: 100, start: 0.95, opacity: 0, easing: cubicOut }}
								out:scale={{ duration: 75, start: 1, opacity: 1, easing: cubicOut }}
							>
								<div class="py-1" role="none">
									<a
										href="/about-us/history"
										class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
										role="menuitem"
										tabindex="-1">History</a
									>
									<a
										href="/about-us/our-commitment"
										class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
										role="menuitem"
										tabindex="-1">Our Commitment</a
									>
									<a
										href="/faqs"
										class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
										role="menuitem"
										tabindex="-1">FAQs</a
									>
									<a
										href="/press"
										class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
										role="menuitem"
										tabindex="-1">Press</a
									>
								</div>
							</div>
						{/if}
					</li>

					<!-- Services Menu -->
					<li class="relative inline-block text-left">
						<div>
							<button
								type="button"
								class="inline-flex w-full justify-center gap-x-1.5 bg-white font-text font-light uppercase"
								id="services-menu-button"
								data-menu-button="services"
								aria-expanded={activeMenu === 'services'}
								aria-haspopup="true"
								on:click={(e) => toggleMenu('services', e)}
							>
								Services
								<svg
									class="-mr-1 size-5 text-gray-400"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
									data-slot="icon"
								>
									<path
										fill-rule="evenodd"
										d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
										clip-rule="evenodd"
									/>
								</svg>
							</button>
						</div>

						{#if activeMenu === 'services'}
							<div
								data-dropdown="services"
								class="absolute right-0 z-10 mt-2 w-[600px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
								role="menu"
								aria-orientation="vertical"
								aria-labelledby="services-menu-button"
								tabindex="-1"
								in:scale={{ duration: 100, start: 0.95, opacity: 0, easing: cubicOut }}
								out:scale={{ duration: 75, start: 1, opacity: 1, easing: cubicOut }}
								style="right: auto; left: -200px;"
							>
								<div class="p-4" role="none">
									<!-- Grid layout for services -->
									<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
										<!-- Column 1 -->
										<div>
											<h3 class="font-medium text-gray-900 mb-2">Security</h3>
											<ul>
												<li>
													<a
														href="/services/consulting/strategy"
														class="block py-1 text-sm text-gray-700 hover:text-gray-900"
													>
														Cybersecurity
													</a>
												</li>
												<li>
													<a
														href="/services/consulting/assessment"
														class="block py-1 text-sm text-gray-700 hover:text-gray-900"
													>
														Cyberfit
													</a>
												</li>
												<li>
													<a
														href="/services/consulting/roadmap"
														class="block py-1 text-sm text-gray-700 hover:text-gray-900"
													>
														Security Awareness Training
													</a>
												</li>
											</ul>
										</div>

										<!-- Column 2 -->
										<div>
											<h3 class="font-medium text-gray-900 mb-2">Compliance</h3>
											<ul>
												<li>
													<a
														href="/services/implementation/setup"
														class="block py-1 text-sm text-gray-700 hover:text-gray-900"
													>
														Compliance Solutions
													</a>
												</li>
												<li>
													<a
														href="/services/implementation/migration"
														class="block py-1 text-sm text-gray-700 hover:text-gray-900"
													>
														Consulting Services
													</a>
												</li>
											</ul>
										</div>

										<!-- Column 3 -->
										<div>
											<h3 class="font-medium text-gray-900 mb-2">Backup</h3>
											<ul>
												<li>
													<a
														href="/services/training/user"
														class="block py-1 text-sm text-gray-700 hover:text-gray-900"
													>
														Backup &amp; Disaster Recovery
													</a>
												</li>
												<li>
													<a
														href="/services/training/admin"
														class="block py-1 text-sm text-gray-700 hover:text-gray-900"
													>
														Recovery Time &amp; Downtime Cost Calculator
													</a>
												</li>
											</ul>
										</div>

										<!-- Column 4 -->
										<div>
											<h3 class="font-medium text-gray-900 mb-2">Managed IT</h3>
											<ul>
												<li>
													<a
														href="/services/support/maintenance"
														class="block py-1 text-sm text-gray-700 hover:text-gray-900"
													>
														Managed IT
													</a>
												</li>
												<li>
													<a
														href="/services/support/troubleshooting"
														class="block py-1 text-sm text-gray-700 hover:text-gray-900"
													>
														Cloud Services
													</a>
												</li>
												<li>
													<a
														href="/services/support/upgrades"
														class="block py-1 text-sm text-gray-700 hover:text-gray-900"
													>
														Training Funding Source
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						{/if}
					</li>

					<li class="hover:text-gray-900">
						<a href="/news">News</a>
					</li>

					<li class="hover:text-gray-900">
						<a href="/subscribe">Subscribe</a>
					</li>

					<!-- Customers Menu -->
					<li class="relative inline-block text-left">
						<div>
							<button
								type="button"
								class="inline-flex w-full justify-center gap-x-1.5 bg-white font-text font-light uppercase"
								id="customers-menu-button"
								data-menu-button="customers"
								aria-expanded={activeMenu === 'customers'}
								aria-haspopup="true"
								on:click={(e) => toggleMenu('customers', e)}
							>
								Customers
								<svg
									class="-mr-1 size-5 text-gray-400"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
									data-slot="icon"
								>
									<path
										fill-rule="evenodd"
										d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
										clip-rule="evenodd"
									/>
								</svg>
							</button>
						</div>

						{#if activeMenu === 'customers'}
							<div
								data-dropdown="customers"
								class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
								role="menu"
								aria-orientation="vertical"
								aria-labelledby="customers-menu-button"
								tabindex="-1"
								in:scale={{ duration: 100, start: 0.95, opacity: 0, easing: cubicOut }}
								out:scale={{ duration: 75, start: 1, opacity: 1, easing: cubicOut }}
							>
								<div class="py-1" role="none">
									<a
										href="https://get.teamviewer.com/consilien_qs"
										class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
										role="menuitem"
										tabindex="-1">Remote Connect</a
									>
									<a
										href="https://psa.consilien.com/support"
										class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
										role="menuitem"
										tabindex="-1">Login</a
									>
								</div>
							</div>
						{/if}
					</li>
				</ul>
			</div>

			<!-- Mobile menu button -->
			<div class="md:hidden flex items-center">
				<button
					type="button"
					class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
					aria-expanded={isMobileMenuOpen}
					aria-label="Main menu"
					on:click={toggleMobileMenu}
				>
					<!-- Icon when menu is closed -->
					{#if !isMobileMenuOpen}
						<svg
							class="block h-6 w-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					{:else}
						<!-- Icon when menu is open -->
						<svg
							class="block h-6 w-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					{/if}
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile menu -->
	{#if isMobileMenuOpen}
		<div class="md:hidden" transition:slide={{ duration: 300 }}>
			<div class="pt-2 pb-4 space-y-1 bg-white font-text font-light uppercase">
				<a href="/" class="block py-2 px-3 border-l-4 border-transparent hover:bg-gray-50">
					Home
				</a>

				<!-- Mobile About dropdown -->
				<div class="relative">
					<button
						type="button"
						class="flex justify-between w-full py-2 px-3 border-l-4 border-transparent hover:bg-gray-50"
						on:click={(e) => toggleMenu('mobile-about', e)}
					>
						<span class="font-text font-light uppercase">About</span>
						<svg
							class="{activeMenu === 'mobile-about'
								? 'rotate-180'
								: ''} w-5 h-5 transition-transform duration-200"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>

					{#if activeMenu === 'mobile-about'}
						<div class="bg-gray-50 pl-6" transition:slide={{ duration: 200 }}>
							<a href="/about-us/history" class="block py-2 px-3 font-text font-light uppercase">
								History
							</a>
							<a
								href="/about-us/our-commitment"
								class="block py-2 px-3 font-text font-light uppercase"
							>
								Our Commitment
							</a>
							<a href="/faqs" class="block py-2 px-3 font-text font-light uppercase"> FAQs </a>
							<a href="/press" class="block py-2 px-3 font-text font-light uppercase"> Press </a>
						</div>
					{/if}
				</div>

				<!-- Mobile Services dropdown -->
				<div class="relative">
					<button
						type="button"
						class="flex justify-between w-full py-2 px-3 border-l-4 border-transparent hover:bg-gray-50"
						on:click={(e) => toggleMenu('mobile-services', e)}
					>
						<span class="font-text font-light uppercase">Services</span>
						<svg
							class="{activeMenu === 'mobile-services'
								? 'rotate-180'
								: ''} w-5 h-5 transition-transform duration-200"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>

					{#if activeMenu === 'mobile-services'}
						<div class="bg-gray-50 pl-6" transition:slide={{ duration: 200 }}>
							<!-- Security -->
							<div class="py-2">
								<div class="px-3 text-gray-800">Security</div>
								<a
									href="/services/consulting/strategy"
									class="block py-1 px-3 text-sm text-gray-600"
								>
									Cybersecurity
								</a>
								<a
									href="/services/consulting/assessment"
									class="block py-1 px-3 text-sm text-gray-600"
								>
									Cyberfit
								</a>
								<a
									href="/services/consulting/roadmap"
									class="block py-1 px-3 text-sm text-gray-600"
								>
									Security Awareness Training
								</a>
							</div>

							<!-- Compliance -->
							<div class="py-2">
								<div class="px-3 text-gray-800">Compliance</div>
								<a
									href="/services/implementation/setup"
									class="block py-1 px-3 text-sm text-gray-600"
								>
									Compliance Solutions
								</a>
								<a
									href="/services/implementation/migration"
									class="block py-1 px-3 text-sm text-gray-600"
								>
									Consulting Services
								</a>
							</div>

							<!-- Backup -->
							<div class="py-2">
								<div class="px-3">Backup</div>
								<a href="/services/training/user" class="block py-1 px-3 text-sm text-gray-600">
									Backup &amp; Disaster Recovery
								</a>
								<a href="/services/training/admin" class="block py-1 px-3 text-sm text-gray-600">
									Recovery Time &amp; Downtime Cost Calculator
								</a>
							</div>

							<!-- Managed IT -->
							<div class="py-2">
								<div class="px-3">Managed IT</div>
								<a
									href="/services/support/maintenance"
									class="block py-1 px-3 text-sm text-gray-600"
								>
									Managed IT
								</a>
								<a
									href="/services/support/troubleshooting"
									class="block py-1 px-3 text-sm text-gray-600"
								>
									Cloud Services
								</a>
								<a href="/services/support/upgrades" class="block py-1 px-3 text-sm text-gray-600">
									Training Funding Source
								</a>
							</div>
						</div>
					{/if}
				</div>

				<a
					href="/news"
					class="block py-2 px-3 font-text font-light uppercase border-l-4 border-transparent"
				>
					News
				</a>

				<a
					href="/subscribe"
					class="block py-2 px-3 font-text font-light uppercase border-l-4 border-transparent"
				>
					Subscribe
				</a>

				<!-- Mobile Customers dropdown -->
				<div class="relative">
					<button
						type="button"
						class="flex justify-between w-full py-2 px-3 text-base font-medium border-l-4 border-transparent hover:bg-gray-50"
						on:click={(e) => toggleMenu('mobile-customers', e)}
					>
						<span class="font-text font-light uppercase">Customers</span>
						<svg
							class="{activeMenu === 'mobile-customers'
								? 'rotate-180'
								: ''} w-5 h-5 transition-transform duration-200"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>

					{#if activeMenu === 'mobile-customers'}
						<div class="bg-gray-50 pl-6" transition:slide={{ duration: 200 }}>
							<a
								href="https://get.teamviewer.com/consilien_qs"
								class="block py-2 px-3 font-text font-light uppercase"
							>
								Remote Connect
							</a>
							<a
								href="https://psa.consilien.com/support"
								class="block py-2 px-3 font-text font-light uppercase"
							>
								Login
							</a>
						</div>
					{/if}
				</div>
			</div>
		</div>
	{/if}
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
	.transition-transform {
		transition-property: transform;
	}
</style>
