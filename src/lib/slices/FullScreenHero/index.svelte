<script lang="ts">
	import { onMount } from 'svelte';
	import AOS from 'aos';
	import 'aos/dist/aos.css'; // Import the AOS styles
	import type { Content } from '@prismicio/client';
	import { PrismicText } from '@prismicio/svelte';

	export let slice: Content.FullScreenHeroSlice;

	$: console.log(slice);

	onMount(() => {
		AOS.init({
			// Global settings:
			duration: 600, // Animation duration
			easing: 'ease-in-out', // Animation easing
			once: false, // Whether animation should happen only once
			mirror: false, // Whether elements should animate out when scrolling past them
			offset: 10 // Offset (in px) from the original trigger point
		});
	});
</script>

<!-- <pre>{JSON.stringify(slice, null, 2)}</pre> -->

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class="  h-svh"
	style="background-image: url({slice.primary.background_image
		.url}); background-size: cover; background-position: center;"
>
	<div class="flex flex-col max-w-7xl justify-start items-start mx-auto h-svh px-6">
		<div class="mt-12 md:mt-36">
			<h1 class="text-[#6DA63F] font-bold text-5xl block" data-aos="fade-up">
				{slice.primary.heading}
			</h1>
			<h3
				class="text-gray-600 font-light text-2xl block my-6"
				data-aos="fade-up"
				data-aos-delay="300"
			>
				{slice.primary.subheading}
			</h3>
		</div>

		<a
			href={slice.primary.button_url.url}
			class="flex items-center gap-2 bg-orange-500 border-2 border-white uppercase font-semibold text-xs text-white py-3 px-6 hover:bg-orange-600 hover:shadow transition duration-300 ease-out"
			data-aos="fade-up"
			data-aos-delay="600"
			><svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
				/>
			</svg>
			{slice.primary.button_url.text}</a
		>
	</div>

	<hr />

	<!-- <PrismicText text={slice.primary.heading} /> -->
</section>
