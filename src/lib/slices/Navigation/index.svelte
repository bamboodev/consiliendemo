<script lang="ts">
	import type { Content } from '@prismicio/client';

	export let slice: Content.NavigationSlice;
	console.log('CardList slice items:', slice.items);
	// To see more details about the entire slice
	console.log('Complete slice data:', slice);
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	Placeholder component for {slice.slice_type} (variation: {slice.variation}) Slices
</section>
