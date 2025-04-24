<script lang="ts">
	import { onMount } from 'svelte';
	import AOS from 'aos';
	import 'aos/dist/aos.css'; // Import the AOS styles
	import type { Content } from '@prismicio/client';
	import { PrismicText } from '@prismicio/svelte';
	import { slide } from 'svelte/transition';

	export let slice: Content.TwoColumnTextImageAccordionSlice;

	// $: console.log(slice);

	// Track which accordion items are open
	let openItems = new Set();

	// Toggle accordion item
	function toggleItem(index: number) {
		if (openItems.has(index)) {
			openItems.delete(index);
		} else {
			openItems.add(index);
		}
		openItems = openItems; // trigger reactivity
	}

	onMount(() => {
		AOS.init({
			// Global settings:
			duration: 600,
			easing: 'ease-in-out',
			once: false,
			mirror: false,
			offset: 10,
			// Disable animations on mobile
			disable: window.innerWidth < 768
		});

		// Re-initialize AOS when window is resized
		window.addEventListener('resize', () => {
			AOS.refresh();
		});
	});
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="py-12 md:py-1 overflow-hidden"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Two-column layout container with order based on text_left_image_right -->
		<div class="flex flex-col md:flex-row md:space-x-8 items-center">
			<!-- Text Column -->
			<div
				class="w-full md:w-1/2 space-y-4 {!slice.primary.text_left_image_right
					? 'md:order-2'
					: 'md:order-1'}"
			>
				{#each slice.primary.item as item, i}
					<div class="overflow-hidden">
						<button
							class="w-full px-4 py-3 text-left bg-white hover:bg-gray-50 flex justify-between items-center"
							on:click={() => toggleItem(i)}
							aria-expanded={openItems.has(i)}
						>
							<h3 class="tracking-widest text-lg md:text-xl font-medium text-gray-900">
								{item.title}
							</h3>
							<svg
								class="w-5 h-5 transform transition-transform duration-200 shrink-0 {openItems.has(
									i
								)
									? 'rotate-180'
									: ''}"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</button>
						{#if openItems.has(i)}
							<div class="px-4 py-3 bg-white" transition:slide={{ duration: 300 }}>
								<div class="prose max-w-none rich-text-content">
									{item.text}
								</div>
							</div>
						{/if}
					</div>
				{/each}
			</div>

			<!-- Image Column -->
			<div
				class="w-full md:w-1/2 mt-8 md:mt-0 {!slice.primary.text_left_image_right
					? 'md:order-1'
					: 'md:order-2'}"
				data-aos={slice.primary.text_left_image_right ? 'fade-left' : 'fade-right'}
				data-aos-delay="200"
			>
				<div class="relative w-full overflow-hidden">
					{#if slice.primary.image?.url}
						<img
							src={slice.primary.image.url}
							alt={slice.primary.image.alt || ''}
							class="w-full h-auto object-cover"
						/>
					{:else}
						<div class="bg-gray-200 rounded-lg w-full h-80 flex items-center justify-center">
							<p class="text-gray-500">Image placeholder</p>
						</div>
					{/if}
				</div>
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
		display: inline-block;
		text-decoration: none;
		transition: background-color 0.2s;
	}

	.rich-text-content :global(a:hover) {
		background-color: #5a9740;
	}
</style>
