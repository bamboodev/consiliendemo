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

	// Social media links
	const socialLinks = [
		{ platform: 'Twitter', url: 'https://twitter.com/consilien', icon: 'twitter' },
		{ platform: 'LinkedIn', url: 'https://linkedin.com/company/consilien', icon: 'linkedin' },
		{ platform: 'Facebook', url: 'https://facebook.com/consilien', icon: 'facebook' },
		{ platform: 'YouTube', url: 'https://www.youtube.com/@consilien', icon: 'youtube' }
	];

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

					<!-- Social media links -->
					<div class="flex justify-between space-x-3 mt-6">
						{#each socialLinks as link}
							<a
								href={link.url}
								target="_blank"
								rel="noopener noreferrer"
								class="bg-white rounded-full p-2 w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition duration-300"
								aria-label={link.platform}
							>
								{#if link.icon === 'twitter'}
									<svg class="w-4 h-4" fill="#292929" viewBox="0 0 24 24">
										<path
											d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"
										/>
									</svg>
								{:else if link.icon === 'linkedin'}
									<svg class="w-4 h-4" fill="#292929" viewBox="0 0 24 24">
										<path
											d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
										/>
									</svg>
								{:else if link.icon === 'facebook'}
									<svg class="w-4 h-4" fill="#292929" viewBox="0 0 24 24">
										<path
											d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
										/>
									</svg>
								{:else if link.icon === 'youtube'}
									<svg class="w-4 h-4" fill="#292929" viewBox="0 0 24 24">
										<path
											d="M24 7.5V16.5C24 18.981 21.981 21 19.5 21H4.5C2.019 21 0 18.981 0 16.5V7.5C0 5.019 2.019 3 4.5 3H19.5C21.981 3 24 5.019 24 7.5ZM9.5 8V16L15.5 12L9.5 8Z"
										/>
									</svg>
								{/if}
							</a>
						{/each}
					</div>
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
					<img
						src="/images/partners/lenovo-logo-transparent-image.png"
						alt="Lenovo logo"
						class="max-w-full h-auto"
					/>
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
