<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';
	import { onMount } from 'svelte';

	export let slice: Content.HeroFormSlice;

	onMount(() => {
		// Load Mailchimp script when component mounts
		const script = document.createElement('script');
		script.src = '//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js';
		script.type = 'text/javascript';
		document.head.appendChild(script);
	});
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="py-36 bg-cover bg-center bg-no-repeat flex items-center relative"
	style="background-image: {slice.primary.background === 'image'
		? 'url(/images/home-hero-bg2.jpg)'
		: 'none'};"
>
	<!-- Dark overlay -->
	<!-- <div class="absolute inset-0 bg-black bg-opacity-40"></div> -->

	<div class="max-w-6xl mx-auto px-8 relative z-10 w-full">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
			<div class="text-white">
				<div class="prose prose-lg max-w-none">
					<PrismicRichText field={slice.primary.body} />
				</div>

				{#if slice.primary.image}
					<div class="flex justify-center items-center mt-6">
						<img
							src={slice.primary.image.url}
							alt={slice.primary.image.alt || ''}
							class="max-w-[150px] max-h-[150px] object-contain"
						/>
					</div>
				{/if}
			</div>

			<div class="bg-white p-8">
				<!-- Clutch badge -->
				<!-- <div class="flex justify-center mb-6">
					<img
						src="/images/clutch-badge.png"
						alt="Clutch Top Managed Service Provider"
						class="max-w-[150px]"
					/>
				</div> -->

				<form
					action="https://consilien.us10.list-manage.com/subscribe/post?u=e5133804dfa530098a9c78f3d&amp;id=445e7120f1&amp;f_id=00aa47e4f0"
					method="post"
					id="mc-embedded-subscribe-form"
					name="mc-embedded-subscribe-form"
					class="validate space-y-6"
					target="_blank"
					novalidate
				>
					<div id="mc_embed_signup_scroll">
						<div class="mc-field-group mb-6">
							<label for="mce-FNAME" class="block text-sm font-medium text-gray-700 mb-2"
								>First Name</label
							>
							<input
								type="text"
								name="FNAME"
								id="mce-FNAME"
								class="text w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6DA63F] focus:border-[#6DA63F] transition-colors"
								value=""
							/>
						</div>

						<div class="mc-field-group mb-6">
							<label for="mce-EMAIL" class="block text-sm font-medium text-gray-700 mb-2">
								Email Address <span class="asterisk text-red-500">*</span>
							</label>
							<input
								type="email"
								name="EMAIL"
								id="mce-EMAIL"
								class="required email w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6DA63F] focus:border-[#6DA63F] transition-colors"
								required
								value=""
							/>
						</div>

						<div class="mc-field-group mb-6">
							<label for="mce-MMERGE6" class="block text-sm font-medium text-gray-700 mb-2"
								>Company Name</label
							>
							<input
								type="text"
								name="MMERGE6"
								id="mce-MMERGE6"
								class="text w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6DA63F] focus:border-[#6DA63F] transition-colors"
								value=""
							/>
						</div>

						<div class="mc-field-group mb-6">
							<label for="mce-MMERGE7" class="block text-sm font-medium text-gray-700 mb-2"
								>Phone</label
							>
							<input
								type="text"
								name="MMERGE7"
								id="mce-MMERGE7"
								class="text w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6DA63F] focus:border-[#6DA63F] transition-colors"
								value=""
							/>
						</div>

						<div id="mce-responses" class="clear">
							<div class="response" id="mce-error-response" style="display: none;"></div>
							<div class="response" id="mce-success-response" style="display: none;"></div>
						</div>

						<div aria-hidden="true" style="position: absolute; left: -5000px;">
							<input
								type="text"
								name="b_e5133804dfa530098a9c78f3d_445e7120f1"
								tabindex="-1"
								value=""
							/>
						</div>

						<div class="clear">
							<input
								type="submit"
								name="subscribe"
								id="mc-embedded-subscribe"
								class="button w-full bg-[#6DA63F] text-white uppercase font-semibold text-xs py-4 px-6 tracking-wide"
								value="SPEAK TO A REAL PERSON"
							/>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</section>

<style>
	.prose :global(h1) {
		font-size: 2rem;
		line-height: 1.2;
		font-weight: 500;
		color: #6da63f;
		margin-bottom: 1.5rem;
	}

	.prose :global(h4) {
		font-size: 1.5rem;
		line-height: 1.6;
		color: var(--color-gray-600);
		font-weight: 400;
		margin-bottom: 0;
	}

	#mc-embedded-subscribe-form :global(.mce_inline_error) {
		color: red;
		font-size: 0.8rem;
		margin-top: 0.5rem;
	}

	@media (max-width: 768px) {
		.prose :global(h1) {
			font-size: 2rem;
		}
	}
</style>
