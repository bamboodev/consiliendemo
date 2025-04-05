<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';

	export let slice: Content.OneColumnTextSlice;

	$: console.log(slice);

	// green: #6DA63F
	// gray: #292929
	// cream: #EFEFE7
	// white: #ffffff

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
	<div class="max-w-7xl mx-auto">
		<PrismicRichText field={slice.primary.text} />
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
		display: block;
		margin-left: auto;
		margin-right: auto;
	}
</style>
