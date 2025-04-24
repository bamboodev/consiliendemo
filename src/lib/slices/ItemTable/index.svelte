<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';
	import { onMount } from 'svelte';

	export let slice: Content.ItemTableSlice;

	let sectionEl: HTMLElement;
	let parallaxEnabled = true;

	onMount(() => {
		// Check if we can use transform for better performance
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
		parallaxEnabled = !prefersReducedMotion.matches;

		if (parallaxEnabled && slice.primary.background_image?.url) {
			window.addEventListener('scroll', handleParallax);
			handleParallax(); // Initial call to set position
			return () => window.removeEventListener('scroll', handleParallax);
		}

		// Create a style element
		const styleElement = document.createElement('style');

		// Define a custom class for our list items
		const className = 'custom-link-' + Math.random().toString(36).substring(2, 8);

		// Apply the custom class to all list items
		const linkItems = document.querySelectorAll('.rich-text-content a');
		linkItems.forEach((item) => {
			item.classList.add(className);
		});

		// Create the CSS for the pseudo-element with the encoded SVG
		const css = `
			.${className} {
				color: #6DA63F;
				text-decoration: underline;
				text-underline-offset: 2px;
				text-decoration-thickness: 1px;
				font-weight: 600;
				margin-bottom: 1rem;
			}
			
		`;

		styleElement.textContent = css;
		document.head.appendChild(styleElement);
	});

	function handleParallax() {
		if (!sectionEl || !parallaxEnabled) return;

		const rect = sectionEl.getBoundingClientRect();
		const viewHeight = window.innerHeight;
		const speed = 0.5;

		// Calculate the offset based on the element's position in the viewport
		const elementTop = rect.top;
		const elementCenter = elementTop + rect.height / 2;
		const viewCenter = viewHeight / 2;
		const distanceFromCenter = elementCenter - viewCenter;

		// Apply parallax effect
		const yPos = -(distanceFromCenter * speed);
		sectionEl.style.backgroundPosition = `50% ${yPos}px`;
	}
</script>

<section
	bind:this={sectionEl}
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="py-12 px-4 relative overflow-hidden"
	class:has-bg-image={slice.primary.background_image?.url}
	style:background-color={slice.primary.background_color === 'White'
		? 'white'
		: slice.primary.background_color === 'Cream'
			? '#FDF5E6'
			: slice.primary.background_color === 'Green'
				? '#E6F5E6'
				: slice.primary.background_color === 'Gray'
					? '#F5F5F5'
					: 'white'}
	style:background-image={slice.primary.background_image?.url
		? `url(${slice.primary.background_image.url})`
		: 'none'}
>
	{#if slice.primary.background_image?.url}
		<div class="absolute inset-0 bg-black/80" />
	{/if}

	<div class="max-w-7xl mx-auto">
		<div class="relative z-10">
			{#if slice.primary?.main_title}
				<h2
					class="text-4xl font-bold text-center mb-4"
					class:text-white={slice.primary.background_image?.url}
				>
					{slice.primary.main_title}
				</h2>
			{/if}

			{#if slice.primary?.subtitle}
				<p
					class="text-xl text-center mb-8"
					class:text-white={slice.primary.background_image?.url}
					class:text-gray-600={!slice.primary.background_image?.url}
				>
					{slice.primary.subtitle}
				</p>
			{/if}

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each slice.primary.item as item}
					<div class="card bg-white p-6 rounded-lg shadow-sm">
						<div class="flex items-center justify-between gap-4 mb-4">
							{#if item.title}
								<h3 class="text-xl font-semibold text-gray-900">
									{item.title}
								</h3>
							{/if}
							{#if item.image?.url}
								<img
									src={item.image.url}
									alt={item.image.alt || ''}
									class="w-24 h-24 object-cover rounded flex-shrink-0"
								/>
							{/if}
						</div>
						<div class="prose prose-sm max-w-none text-gray-600 rich-text-content">
							<PrismicRichText field={item.text} />
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	section {
		width: 100%;
	}

	.has-bg-image {
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-attachment: fixed;
	}

	@media (max-width: 768px) {
		.has-bg-image {
			/* Disable fixed background on mobile for better performance */
			background-attachment: scroll;
		}
	}

	.card {
		transition:
			transform 0.2s ease-in-out,
			box-shadow 0.2s ease-in-out;
		will-change: transform, box-shadow;
	}

	.card:hover {
		transform: translateY(-4px);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
	}
</style>
