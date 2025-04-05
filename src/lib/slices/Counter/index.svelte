<script lang="ts">
	import type { Content } from '@prismicio/client';

	export let slice: Content.CounterSlice;

	import { onMount } from 'svelte';

	// Calculate years in business dynamically (assuming business started in 2003)
	const startYear = 2003;
	const currentYear = new Date().getFullYear();
	const yearsInBusiness = currentYear - startYear;

	let yearsCount = 0;
	let satisfactionCount = 0;
	let isVisible = false;

	// Function to animate counter
	function animateCounter(element, startValue, endValue, duration) {
		const startTime = Date.now();
		const updateCounter = () => {
			const currentTime = Date.now();
			const progress = Math.min((currentTime - startTime) / duration, 1);

			const value = Math.floor(startValue + progress * (endValue - startValue));
			if (element === 'years') {
				yearsCount = value;
			} else if (element === 'satisfaction') {
				satisfactionCount = value;
			}

			if (progress < 1) {
				requestAnimationFrame(updateCounter);
			}
		};

		updateCounter();
	}

	// Intersection Observer to detect when component is visible
	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !isVisible) {
						isVisible = true;
						animateCounter('years', 0, yearsInBusiness, 2000);
						animateCounter('satisfaction', 0, 99, 2000);
					}
				});
			},
			{ threshold: 0.1 }
		);

		const container = document.getElementById('stats-container');
		if (container) {
			observer.observe(container);
		}

		return () => {
			if (container) {
				observer.unobserve(container);
			}
		};
	});
</script>

<div id="stats-container" class="w-full bg-[#EFEFE7] py-16 px-4">
	<div class="max-w-6xl mx-auto">
		<h2 class="text-center text-3xl md:text-4xl text-gray-800 font-light mb-16">
			Proudly Independently Owned and Operated
		</h2>

		<div
			class="flex flex-col md:flex-row justify-center items-center space-y-12 md:space-y-0 md:space-x-16"
		>
			<!-- Years in Business Counter -->
			<div class="text-center">
				<div class="text-[#6DA63F] text-6xl md:text-7xl font-semibold mb-3">
					{yearsCount}+
				</div>
				<div class="text-gray-700 text-xl md:text-2xl">Years in Business</div>
			</div>

			<!-- Customer Satisfaction Counter -->
			<div class="text-center">
				<div class="text-[#6DA63F] text-6xl md:text-7xl font-semibold mb-3">
					{satisfactionCount}%
				</div>
				<div class="text-gray-700 text-xl md:text-2xl">Customer Satisfaction Rate</div>
			</div>
		</div>
	</div>
</div>

<!-- <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	Placeholder component for {slice.slice_type} (variation: {slice.variation}) Slices
</section> -->
