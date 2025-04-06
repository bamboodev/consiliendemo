<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';
	import { createEventDispatcher } from 'svelte';

	export let slice: Content.FaqsSlice;

	let selectedTopicIndex = 0;
	const dispatch = createEventDispatcher();

	function selectTopic(index: number) {
		selectedTopicIndex = index;
	}
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="faqs-section"
>
	<div class="container mx-auto px-4 py-8">
		<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
			<!-- Left Column - Topic Buttons -->
			<div class="md:col-span-1">
				<div class="flex flex-col space-y-4">
					{#each slice.primary.topic as topic, index}
						<button
							class="p-4 text-left transition-colors {selectedTopicIndex === index
								? 'bg-[#6da63f] text-white'
								: 'bg-gray-100 hover:bg-gray-200'}"
							on:click={() => selectTopic(index)}
						>
							{topic.title}
						</button>
					{/each}
				</div>
			</div>

			<!-- Right Column - Content -->
			<div class="col-span-3">
				<div class="p-6 bg-white shadow rich-text-content">
					<h2 class="text-2xl font-thin tracking-widest mb-4 text-gray-400">
						{slice.primary.topic[selectedTopicIndex].title}
					</h2>
					<hr class="border-t border-gray-200 mb-4" />
					<PrismicRichText field={slice.primary.topic[selectedTopicIndex].content} />
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.faqs-section {
		background-color: #f8f9fa;
	}
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
		font-size: 18px;
	}
	.rich-text-content :global(h5) {
		font-weight: 600;
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
