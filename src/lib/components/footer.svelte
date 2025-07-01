<script lang="ts">
	import RecentPosts from './RecentPosts.svelte';
	import { createClient } from '$lib/prismicio';
	import { PrismicRichText } from '@prismicio/svelte';
	import { onMount } from 'svelte';
	import type { FooterDocument } from '../../prismicio-types';

	// Get the button

	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}

	const currentYear = new Date().getFullYear();

	let footerData: FooterDocument | null = null;

	onMount(async () => {
		const client = createClient();
		footerData = await client.getSingle('footer');
	});
</script>

<footer class="bg-[#292929]">
	<!-- Footer component with responsive 4-column layout -->
	<div class="grid grid-cols-1 md:grid-cols-4 gap-8 p-8 text-white">
		<div class="p-4">
			<img src="/images/Consilien_Logo_text.svg" alt="Consilien Logo" class=" block" />
			<img
				src="/images/consilien-network.svg"
				alt="Consilien Network"
				class="mt-8 block mx-auto max-w-[200px]"
			/>
			<div class=" flex justify-center items-center">
				<div class="p-6 text-white">
					<div class="flex items-center mb-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5 mr-2 text-gray-400"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
						<span class="text-white">21250 Hawthorne Blvd, Suite 500<br />Torrance, CA 90503</span>
					</div>

					<a href="mailto:hello@consilien.com" class="flex items-center mb-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5 mr-2 text-gray-400"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
						<span class="text-white">hello@consilien.com</span>
					</a>

					<a href="tel:8666803388" class="flex items-center mb-5">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5 mr-2 text-gray-400"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
							/>
						</svg>
						<span class="text-white">866.680.3388</span>
					</a>

					<a
						href="https://get.teamviewer.com/consilien_qs"
						target="_blank"
						class="w-full border border-orange-500 text-orange-500 py-2 px-4 mb-3 hover:bg-orange-600 hover:text-white transition duration-300 text-xs font-bold block text-center"
					>
						REMOTE CONNECT
					</a>

					<a
						href="https://psa.consilien.com/support"
						target="_blank"
						class="w-full border border-orange-500 text-orange-500 py-2 px-4 hover:bg-orange-600 hover:text-white transition duration-300 text-xs font-bold block text-center"
					>
						LOGIN
					</a>
				</div>
			</div>
		</div>
		<div class="p-4">
			<h4 class="mb-4 text-sm font-text tracking-widest">RECENT POSTS</h4>
			<hr class="border-t border-[#565658] mb-6" />
			<RecentPosts />
		</div>
		<div class="p-4">
			<h4 class="mb-4 text-sm font-text tracking-widest">PARTNERS</h4>
			<hr class="border-t border-[#565658] mb-6" />
			<ul class="partners grid grid-cols-2 gap-6">
				<li class="flex justify-center items-center">
					<img
						src="/images/partners/onetrust-logo_1.png"
						alt="Onetrust logo"
						class="max-w-full h-auto"
					/>
				</li>

				<li class="flex justify-center items-center">
					<img
						src="/images/partners/appriver-logo.png"
						alt="Appriver by Opentext logo"
						class="max-w-full h-auto"
					/>
				</li>

				<li class="flex justify-center items-center">
					<img src="/images/partners/datto-logo.png" alt="Datto logo" class="max-w-full h-auto" />
				</li>

				<li class="flex justify-center items-center">
					<img
						src="/images/partners/microsoft-logo.png"
						alt="Microsoft logo"
						class="max-w-full h-auto"
					/>
				</li>

				<li class="flex justify-center items-center">
					<img
						src="/images/partners/connectwise-logo.png"
						alt="Connectwise logo"
						class="max-w-full h-auto"
					/>
				</li>

				<li class="flex justify-center items-center">
					<img
						src="/images/partners/watchguard-logo.png"
						alt="Watchguard logo"
						class="max-w-full h-auto"
					/>
				</li>

				<li class="flex justify-center items-center">
					<img
						src="/images/partners/sonicwall-logo.png"
						alt="Sonicwall logo"
						class="max-w-full h-auto"
					/>
				</li>

				<li class="flex justify-center items-center">
					<img src="/images/partners/vmware-logo.png" alt="Vmware logo" class="max-w-full h-auto" />
				</li>

				<li class="flex justify-center items-center">
					<img src="/images/partners/cisco-logo.png" alt="Cisco logo" class="max-w-full h-auto" />
				</li>

				<li class="flex justify-center items-center">
					<img src="/images/partners/dell-logo.png" alt="Dell logo" class="max-w-full h-auto" />
				</li>
			</ul>
		</div>
		<div class="p-4">
			<h4 class="mb-4 text-sm font-text tracking-widest">LOCATIONS</h4>
			<hr class="border-t border-[#565658] mb-6" />

			{#if footerData}
				<PrismicRichText field={footerData.data.locations} />
			{/if}

			<!-- <p>Managed IT Services in Los Angeles</p> -->
		</div>
	</div>

	<div class="container mx-auto px-4 text-white/30">
		<div class="flex flex-wrap items-center justify-between mb-6">
			<div class="w-full md:w-auto text-sm">
				© Copyright {currentYear} - Consilien
				<span class="mx-2">|</span>
				<a href="/privacy-policy/" class="hover:text-white transition duration-300"
					>Privacy Policy</a
				>
				<span class="mx-2">|</span>
				<a href="/site-map/" class="hover:text-white transition duration-300">Sitemap</a>
			</div>
		</div>

		<div class="flex justify-center pb-8">
			<button
				on:click={scrollToTop}
				class="border border-gray-400 text-gray-400 px-8 py-2 hover:bg-gray-700 hover:border-white hover:text-white transition-colors duration-300"
			>
				TOP
			</button>
		</div>
	</div>
</footer>

<style>
	ul.partners li img {
		filter: brightness(0) invert(1);
	}
</style>
