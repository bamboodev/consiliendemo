<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';

	export let slice: Content.ThreeColumnContentSlice;

	console.log('ThreeColumnContent slice data:', slice);
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="three-column-section my-36"
>
	<div class="container">
		<div class="columns">
			<div class="column">
				{#if slice.primary.content}
					<PrismicRichText field={slice.primary.content} />
				{/if}
			</div>
			<div class="column">
				{#if slice.primary.content_two}
					<PrismicRichText field={slice.primary.content_two} />
				{/if}
			</div>
			<div class="column">
				{#if slice.primary.content_three}
					<PrismicRichText field={slice.primary.content_three} />
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	.three-column-section {
		padding: 2rem 0;
	}

	.container {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.columns {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
	}

	.column {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	@media (max-width: 768px) {
		.columns {
			grid-template-columns: 1fr;
		}
	}
</style>
