<script lang="ts">
	import { onMount } from 'svelte';
	import AOS from 'aos';
	import 'aos/dist/aos.css'; // Import the AOS styles
	import type { Content } from '@prismicio/client';
	import { PrismicText, PrismicRichText } from '@prismicio/svelte';

	export let slice: Content.TwoColumnTextImageSlice;

	onMount(() => {
		AOS.init({
			// Global settings:
			duration: 600, // Animation duration
			easing: 'ease-in-out', // Animation easing
			once: false, // Whether animation should happen only once
			mirror: false, // Whether elements should animate out when scrolling past them
			offset: 10 // Offset (in px) from the original trigger point
		});
	});
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="py-12 md:py-20"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Two-column layout container with order based on text_left_image_right -->
		<div class="flex flex-col md:flex-row md:space-x-8 items-center">
			<!-- Text Column -->
			<div
				class="w-full md:w-1/2 mb-8 md:mb-0 {!slice.primary.text_left_image_right
					? 'md:order-2 md:mr-6'
					: 'md:order-1 md:ml-6'}"
				data-aos="fade-up"
				data-aos-delay="100"
			>
				<h2 class="text-gray-700 tracking-widest text-lg md:text-3xl mb-6">
					{slice.primary.title}
				</h2>
				<div class="prose max-w-none rich-text-content">
					<PrismicRichText field={slice.primary.text} />
				</div>
			</div>

			<!-- Image Column -->
			<div
				class="w-full md:w-1/2 {!slice.primary.text_left_image_right ? 'md:order-1' : 'md:order-2'}"
				data-aos={slice.primary.text_left_image_right ? 'fade-left' : 'fade-right'}
				data-aos-delay="200"
			>
				{#if slice.primary.image?.url}
					<img
						src={slice.primary.image.url}
						alt={slice.primary.image.alt || ''}
						class="w-full h-auto"
					/>
				{:else}
					<div class="bg-gray-200 rounded-lg w-full h-80 flex items-center justify-center">
						<p class="text-gray-500">Image placeholder</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	.rich-text-content :global(p) {
		margin-bottom: 1.5rem; /* 24px spacing between paragraphs */
	}

	/* If this is the last paragraph, remove the bottom margin */
	.rich-text-content :global(p:last-child) {
		margin-bottom: 0;
	}

	/* Style links with CSS instead of custom components */
	.rich-text-content :global(a) {
		color: white;
		font-family: Raleway;
		text-transform: uppercase;
		font-size: 12px;
		letter-spacing: 2px;
		background-color: #6da63f;
		padding: 10px 20px;

		transition: background-color 0.2s;
	}

	.rich-text-content :global(a:hover) {
		background-color: #5a9740;
	}
</style>
