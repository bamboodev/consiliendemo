<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { onMount } from 'svelte';

	export let slice: Content.ClutchReviewsSlice;

	onMount(() => {
		// Check if the script is already loaded to avoid duplicates
		if (!document.querySelector('script[src="https://widget.clutch.co/static/js/widget.js"]')) {
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = 'https://widget.clutch.co/static/js/widget.js';
			script.async = true;
			document.head.appendChild(script);
		}
	});
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="text-center"
>
	<div class="max-w-7xl mx-auto s-FMjDt1P6g3YW">
		<div class="relative z-10 s-FMjDt1P6g3YW">
			<h2 class="text-4xl font-bold text-center mb-4 s-FMjDt1P6g3YW">Our Clients' Success</h2>
		</div>
	</div>

	<div
		class="clutch-widget bg-gray-400 text-center max-w-7xl mx-auto"
		data-url="https://widget.clutch.co"
		data-widget-type="12"
		data-height="375"
		data-nofollow="false"
		data-expandifr="true"
		data-scale="100"
		data-reviews="347784,268953,268945"
		data-clutchcompany-id="2272691"
	></div>
</section>
