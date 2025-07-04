<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';

	export let slice: Content.OneColumnTextSlice;

	const colorMap = {
		Green: '#6DA63F',
		Gray: '#292929',
		Cream: '#EFEFE7',
		White: '#ffffff'
	};

	const backgroundColor = colorMap[slice.primary.background_color] || '#ffffff';
	const textColor = ['Green', 'Gray'].includes(slice.primary.background_color) ? 'white' : 'black';
	const textAlignment = slice.primary.centered ? 'center' : 'left';
</script>

<section
	class=" rich-text-content py-12"
	style="background-color: {backgroundColor}; color: {textColor}; text-align: {textAlignment};"
>
	<div class="max-w-7xl mx-auto px-6">
		<PrismicRichText field={slice.primary.text} />
	</div>
</section>

<style>
	.rich-text-content :global(p) {
		margin-bottom: 1.5rem; /* 24px spacing between paragraphs */
	}

	.rich-text-content :global(a) {
		color: #6da63f;
		font-weight: 600;
	}

	/* If this is the last paragraph, remove the bottom margin */
	.rich-text-content :global(p:last-child) {
		margin-bottom: 0;
	}

	.rich-text-content :global(li) {
		margin: 10px 0;
	}
	.rich-text-content :global(h1) {
		font-size: 30px;
	}
	.rich-text-content :global(h2) {
		font-size: 25px;
	}
	.rich-text-content :global(h3) {
		font-family: Raleway, ui-sans-serif, system-ui, sans-serif;
		font-size: 1.5rem;
		font-weight: 100;
	}
	.rich-text-content :global(h4) {
		font-family: Raleway, ui-sans-serif, system-ui, sans-serif;
		font-size: 1.7rem;
		margin: 10px 0;
	}
	.rich-text-content :global(h5) {
		font-size: 16px;
	}
	.rich-text-content :global(h6) {
		font-size: 14px;
	}

	.rich-text-content :global(img) {
		display: block;
		margin-left: auto;
		margin-right: auto;
		max-height: 230px;
		max-width: 230px;
		margin: 0 auto;
	}

	/* Styles for embedded YouTube videos */
	.rich-text-content :global([data-oembed-type='video']) {
		position: relative;
		width: 100%;
		padding-bottom: 56.25%; /* 16:9 aspect ratio */
		margin: 2rem 0;
	}

	.rich-text-content :global([data-oembed-type='video'] iframe) {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
