<script lang="ts">
	import { onMount } from 'svelte';
	import AOS from 'aos';
	import 'aos/dist/aos.css'; // Import the AOS styles
	import type { Content } from '@prismicio/client';
	import { PrismicText } from '@prismicio/svelte';

	export let slice: Content.PageHeroSlice;

	// $: console.log(slice);

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

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class=" h-[400px] bg-bottom md:bg-top"
	style="background-image: url(/images/home-hero-bg2.jpg); background-size: cover; "
>
	<div
		class="flex flex-col max-w-7xl justify-start md:justify-center items-start mx-auto h-full px-6"
	>
		<div class=" max-w-2xl md:ml-9">
			{#if slice.primary.title}
				<h1
					class="text-gray-700 tracking-widest font-thin uppercase text-lg md:text-4xl block mt-6 md:mt-0"
					data-aos="fade-up"
				>
					{slice.primary.title}
				</h1>
			{/if}
			{#if slice.primary.intro}
				<h3
					class="text-gray-600 font-light text-sm md:text-lg block md:my-6"
					data-aos="fade-up"
					data-aos-delay="300"
				>
					{slice.primary.intro}
				</h3>
			{/if}
		</div>
	</div>
</section>
