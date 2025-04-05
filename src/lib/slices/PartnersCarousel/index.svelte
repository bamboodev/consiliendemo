<!-- PartnersCarousel.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';

	interface Partner {
		name: string;
		logo: string;
		alt: string;
	}

	// Array of partner logos
	const partners: Partner[] = [
		{ name: 'OneTrust', logo: '/images/partners/onetrust-logo_1.png', alt: 'Onetrust logo' },
		{
			name: 'Appriver',
			logo: '/images/partners/appriver-logo.png',
			alt: 'Appriver by Opentext logo'
		},
		{ name: 'Datto', logo: '/images/partners/datto-logo.png', alt: 'Datto logo' },
		{ name: 'Microsoft', logo: '/images/partners/microsoft-logo.png', alt: 'Microsoft logo' },
		{ name: 'Connectwise', logo: '/images/partners/connectwise-logo.png', alt: 'Connectwise logo' },
		{ name: 'Watchguard', logo: '/images/partners/watchguard-logo.png', alt: 'Watchguard logo' },
		{ name: 'Sonicwall', logo: '/images/partners/sonicwall-logo.png', alt: 'Sonicwall logo' },
		{ name: 'VMware', logo: '/images/partners/vmware-logo.png', alt: 'Vmware logo' },
		{ name: 'Cisco', logo: '/images/partners/cisco-logo.png', alt: 'Cisco logo' },
		{ name: 'Dell', logo: '/images/partners/dell-logo.png', alt: 'Dell logo' }
	];

	// Duplicate the partner list to create a seamless loop effect
	const allPartners = [...partners, ...partners];

	let scrollContainer: HTMLDivElement | null = null;
	let animationId: number | null = null;
	let scrollSpeed = 1; // Increased scroll speed
	let isPaused = false;

	// Function to animate the scroll
	function scrollLogos() {
		if (isPaused) return;

		if (scrollContainer) {
			scrollContainer.scrollLeft += scrollSpeed;

			// Reset scroll position to create infinite scroll effect
			if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
				scrollContainer.scrollLeft = 0;
			}
		}

		animationId = requestAnimationFrame(scrollLogos);
	}

	// Pause animation on hover
	function pauseScroll() {
		// isPaused = true;
		// if (animationId !== null) {
		// 	cancelAnimationFrame(animationId);
		// 	animationId = null;
		// }
	}

	// Resume animation when not hovering
	function resumeScroll() {
		isPaused = false;
		if (animationId === null) {
			animationId = requestAnimationFrame(scrollLogos);
		}
	}

	onMount(() => {
		// Start the animation
		animationId = requestAnimationFrame(scrollLogos);

		// Clean up animation on component unmount
		return () => {
			if (animationId !== null) {
				cancelAnimationFrame(animationId);
			}
		};
	});
</script>

<section class="w-full py-12 bg-white">
	<div class="container mx-auto px-4">
		<h2 class="text-3xl text-center font-light text-gray-800 mb-12">Our Partners:</h2>

		<div
			class="relative overflow-hidden w-full"
			on:mouseenter={pauseScroll}
			on:mouseleave={resumeScroll}
		>
			<div
				bind:this={scrollContainer}
				class="flex items-center space-x-16 whitespace-nowrap overflow-x-hidden"
			>
				{#each allPartners as partner, i}
					<div class="inline-block flex-shrink-0">
						<img
							src={partner.logo}
							alt={partner.alt}
							class="h-12 md:h-16 w-auto opacity-50 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0"
						/>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	/* Add smooth scrolling behavior */
	.flex {
		scroll-behavior: smooth;
	}
</style>
