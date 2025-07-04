<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';
	import { onMount } from 'svelte';

	export let slice: Content.TwoColumnTextSlice;

	const colorMap = {
		Green: '#6DA63F',
		Gray: '#292929',
		LightGray: '#FAFAFA',
		Cream: '#EFEFE7',
		White: '#ffffff'
	};

	const backgroundColor = colorMap[slice.primary.background_color] || '#ffffff';
	const textColor = ['Green', 'Gray', 'LightGray'].includes(slice.primary.background_color)
		? 'white'
		: 'black';

	const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="${textColor}" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
`;

	// Function to style list items after the component mounts
	onMount(() => {
		// Create a style element
		const styleElement = document.createElement('style');

		// Define a custom class for our list items
		const className = 'custom-list-icon-' + Math.random().toString(36).substring(2, 8);

		// Apply the custom class to all list items
		const listItems = document.querySelectorAll('.rich-text-content li');
		listItems.forEach((item) => {
			item.classList.add(className);
		});

		// Create the CSS for the pseudo-element with the encoded SVG
		const svgEncoded = encodeURIComponent(svgIcon);
		const css = `
			.${className} {
				position: relative;
				padding-left: 2rem;
				margin-bottom: 0.75rem;
				list-style-type: none;
			}
			.${className}::before {
				content: "";
				position: absolute;
				left: 0;
				top: 0.25rem;
				width: 1.5rem;
				height: 1.5rem;
				background-image: url('data:image/svg+xml;utf8,${svgEncoded}');
				background-repeat: no-repeat;
				background-size: contain;
			}
		`;

		styleElement.textContent = css;
		document.head.appendChild(styleElement);
	});
</script>

<section
	class=" rich-text-content py-12"
	style="background-color: {backgroundColor}; color: {textColor}; "
>
	<div class="max-w-7xl mx-auto px-6">
		<div class="flex flex-col md:flex-row md:gap-8 justify-start items-start">
			<div class="w-full md:w-1/2">
				<PrismicRichText field={slice.primary.columnone} />
			</div>
			<div class="w-full md:w-1/2 mt-8 md:mt-0">
				<PrismicRichText field={slice.primary.columntwo} />
			</div>
		</div>
	</div>
</section>

<style>
	.rich-text-content :global(p) {
		margin-bottom: 1.5rem;
	}
	.rich-text-content :global(a) {
		color: #6da63f;
		font-weight: 600;
	}

	.rich-text-content :global(p:last-child) {
		margin-bottom: 0;
	}
	.rich-text-content :global(li) {
		margin-bottom: 2rem;
	}

	.rich-text-content :global(h1) {
		font-size: 30px;
	}
	.rich-text-content :global(h2) {
		font-size: 25px;
	}
	.rich-text-content :global(h3) {
		font-size: 20px;
	}
	.rich-text-content :global(h4) {
		font-size: 18px;
	}
	.rich-text-content :global(h5) {
		font-size: 16px;
	}
	.rich-text-content :global(h6) {
		font-size: 14px;
	}

	.rich-text-content :global(img) {
		max-height: 230px;
		max-width: 230px;
		margin: 0 auto;
	}
</style>
