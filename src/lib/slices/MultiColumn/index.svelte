<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';
	import { PrismicImage } from '@prismicio/svelte';

	export let slice: Content.MultiColumnSlice;

	const colorMap = {
		Green: '#6DA63F',
		Gray: '#F8F8F8',
		Cream: '#EFEFE7',
		White: '#ffffff'
	};

	const backgroundColor = colorMap[slice.primary.background_color] || '#ffffff';
	const textColor = ['Green', 'Gray'].includes(slice.primary.background_color) ? 'white' : 'black';

	// Using any for now until we have the correct Prismic types
	type ColumnItem = {
		title?: string;
		icon?: any;
		content?: any;
		centered?: boolean;
	};

	// Get column count for intelligent grid layout
	$: columnCount = slice.primary.column?.length || 0;
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="multi-column py-12 md:py-36 md:pb-12"
	style="background-color: {backgroundColor}; color: {textColor};"
>
	{#if slice.primary.main_title}
		<h2 class="text-xl md:text-3xl font-thin tracking-widest mb-12 text-center">
			{slice.primary.main_title}
		</h2>
	{/if}

	{#if slice.primary.intro}
		<div class="prose max-w-none rich-text-content text-center">
			<PrismicRichText field={slice.primary.intro} />
		</div>
	{/if}

	<div class="columns columns-{columnCount}">
		{#each slice.primary.column as column}
			<div
				class="column p-6"
				style="background-color: {column.background_color
					? colorMap[column.background_color]
					: 'transparent'}; color: {column.background_color &&
				['Green'].includes(column.background_color)
					? 'white'
					: 'black'};"
			>
				{#if column?.icon}
					<PrismicImage field={column.icon} class="icon" />
				{/if}

				{#if column?.title}
					<div class="title">
						<PrismicRichText field={column.title} />
					</div>
				{/if}

				{#if column?.content}
					<div class="content" class:centered={column.centered}>
						<PrismicRichText field={column.content} />
					</div>
				{/if}
			</div>
		{/each}
	</div>
</section>

<style>
	.multi-column {
		/* padding: 2rem 0; */
	}

	.columns {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 2rem;
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	/* 1 column: full width, centered with max-width */
	.columns-1 {
		max-width: 700px;
	}
	.columns-1 .column {
		flex: 1 1 100%;
	}

	/* 2 columns */
	.columns-2 .column {
		flex: 1 1 100%;
	}
	@media (min-width: 640px) {
		.columns-2 .column {
			flex: 0 1 calc(50% - 1rem);
		}
	}

	/* 3 columns */
	.columns-3 .column {
		flex: 1 1 100%;
	}
	@media (min-width: 640px) {
		.columns-3 .column {
			flex: 0 1 calc(50% - 1rem);
		}
	}
	@media (min-width: 1024px) {
		.columns-3 .column {
			flex: 0 1 calc(33.333% - 1.34rem);
		}
	}

	/* 4 columns */
	.columns-4 .column {
		flex: 1 1 100%;
	}
	@media (min-width: 640px) {
		.columns-4 .column {
			flex: 0 1 calc(50% - 1rem);
		}
	}
	@media (min-width: 1024px) {
		.columns-4 .column {
			flex: 0 1 calc(25% - 1.5rem);
		}
	}

	/* 5 columns: 3 on top, 2 centered below */
	.columns-5 .column {
		flex: 1 1 100%;
	}
	@media (min-width: 640px) {
		.columns-5 .column {
			flex: 0 1 calc(50% - 1rem);
		}
	}
	@media (min-width: 1024px) {
		.columns-5 .column {
			flex: 0 1 calc(33.333% - 1.34rem);
		}
	}

	/* 6 columns */
	.columns-6 .column {
		flex: 1 1 100%;
	}
	@media (min-width: 640px) {
		.columns-6 .column {
			flex: 0 1 calc(50% - 1rem);
		}
	}
	@media (min-width: 768px) {
		.columns-6 .column {
			flex: 0 1 calc(33.333% - 1.34rem);
		}
	}

	/* 7+ columns: show 4 per row on desktop, items center automatically */
	.columns-7 .column,
	.columns-8 .column,
	.columns-9 .column,
	.columns-10 .column {
		flex: 1 1 100%;
	}
	@media (min-width: 640px) {
		.columns-7 .column,
		.columns-8 .column,
		.columns-9 .column,
		.columns-10 .column {
			flex: 0 1 calc(50% - 1rem);
		}
	}
	@media (min-width: 768px) {
		.columns-7 .column,
		.columns-8 .column,
		.columns-9 .column,
		.columns-10 .column {
			flex: 0 1 calc(33.333% - 1.34rem);
		}
	}
	@media (min-width: 1024px) {
		.columns-7 .column,
		.columns-8 .column,
		.columns-9 .column,
		.columns-10 .column {
			flex: 0 1 calc(25% - 1.5rem);
		}
	}

	.column {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		width: 100%;
	}

	.column .content {
		width: 100%;
	}

	.column :global(p) {
		text-align: center;
	}

	.column :global(img) {
		max-width: 150px;
		margin-bottom: 1rem;
	}

	.column .title :global(h4) {
		font-size: 22px;
		font-weight: 200;
		margin-bottom: 1rem;
		font-family: 'Raleway', sans-serif;

		align-items: center;
	}

	.column :global(.first-line) {
		display: block;
	}

	.column :global(.second-line) {
		display: block;
	}

	.column .content :global(p) {
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.column :global(h5) {
		font-size: 20px;
		font-weight: bolder;
		margin-bottom: 1rem;
		font-family: 'Raleway', sans-serif;

		align-items: center;
	}

	.column .content.centered {
		text-align: center;
	}

	.column .content :global(p) {
		text-align: left;
	}
	.column .content :global(h5) {
		text-align: left;
	}
	.column .content :global(ul) {
		text-align: left;
		margin: 10px 0;
	}
	.column .content :global(ol) {
		text-align: left;
		margin: 10px 0;
	}
	.column .content :global(li) {
		text-align: left;
		margin: 10px 0;
	}

	.column .content.centered :global(p) {
		text-align: center;
	}
	.column .content.centered :global(h5) {
		text-align: center;
	}
	.column .content.centered :global(ul) {
		text-align: center;
	}
	.column .content.centered :global(ol) {
		text-align: center;
	}
	.column .content.centered :global(li) {
		text-align: center;
	}

	/* Styles for embedded YouTube videos */
	.columns .column :global([data-oembed]) {
		width: 100%;
		max-width: 100%;
		position: relative;
		overflow: hidden;
		min-height: 300px;
	}

	.columns .column :global([data-oembed] iframe) {
		width: 100%;
		height: auto;
		min-height: 300px;
		border: none;
		display: block;
	}

	.prose :global(h3) {
		font-size: var(--text-3xl);
		font-weight: bold;
		margin-bottom: 1rem;
		font-family: 'Raleway', sans-serif;
		align-items: center;
	}

	.prose :global(p) {
		max-width: 600px;
		margin: 0 auto;
	}
</style>
