<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';

	export let slice: Content.CallToActionSlice;

	const colorMap = {
		Green: 'bg-[#6DA63F]',
		Gray: 'bg-gray-800',
		Orange: 'bg-orange-500'
	};
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} class="py-12">
	<PrismicRichText field={slice.primary.body} />

	{#if slice.primary.url}
		<a
			href={slice.primary.url.url}
			class="{colorMap[slice.primary.button_color]} text-white px-4 py-2 text-xs"
		>
			{slice.primary.url.text}
		</a>
	{/if}
</section>

<style>
	section :global(h1) {
		font-size: 3rem;
		line-height: 1.2;
		font-weight: 500;
		margin-bottom: 1.5rem;
	}

	section :global(h2) {
		font-size: 2rem;
		line-height: 1.2;
		font-weight: 200;
		margin-bottom: 1.5rem;
	}

	section :global(h3) {
		font-size: 1.5rem;
		line-height: 1.2;
		font-weight: 200;
		margin-bottom: 1.5rem;
	}

	section :global(h4) {
		font-size: 1.2rem;
		line-height: 1.2;
		font-weight: 300;
		margin-bottom: 1.5rem;
	}

	section :global(h5) {
		font-size: 1rem;
		line-height: 1.2;
		font-weight: 300;
		margin-bottom: 1.5rem;
	}

	section :global(p) {
		color: black;
		text-align: left;
		font-size: var(--size-7);
		font-family: var(--font-serif);
		color: var(--purple-11);
		font-size: var(--size-8);
		line-height: 120%;
		width: min-content;
	}
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--size-4);
	}
</style>
