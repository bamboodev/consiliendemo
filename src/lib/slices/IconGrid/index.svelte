<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage, PrismicRichText } from '@prismicio/svelte';

	type IconGridItem = {
		icon: any;
		title: string;
		text: string;
	};

	export let slice: {
		slice_type: string;
		variation: string;
		item: IconGridItem[];
	};
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} class="py-12">
	<div class="container mx-auto px-4">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			{#each slice.primary.item as item}
				<div class="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-lg shadow-sm">
					<div class="w-full md:w-1/6">
						{#if item.icon}
							<PrismicImage field={item.icon} class="w-8 h-auto mx-auto" />
						{/if}
					</div>
					<div class="w-full md:w-5/6">
						{#if item.title}
							<h3 class="text-xl font-semibold mb-2">{item.title}</h3>
						{/if}
						{#if item.text}
							<PrismicRichText field={item.text} />
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
