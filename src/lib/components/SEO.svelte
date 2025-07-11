<script context="module">
	// Use a module context variable to track if SEO tags have been rendered
	let seoRendered = false;
</script>

<script lang="ts">
	import { onMount, afterUpdate, tick } from 'svelte';
	import { page } from '$app/stores';

	export let data: {
		meta_title?: string;
		meta_description?: string;
		meta_image?: {
			url: string;
			alt: string;
		};
	};
	
	export let canonical: string | undefined = undefined;

	let title = '';
	let description = '';
	let image: { url: string; alt: string } | undefined;
	let currentPath = '';
	let isRendered = false;
	let canonicalUrl = '';

	// Reset the component state when the path changes
	$: if ($page && $page.url.pathname !== currentPath) {
		currentPath = $page.url.pathname;
		isRendered = false;
	}

	// Process SEO data when data changes or path changes
	$: if (data && !isRendered) {
		processSeoData();
	}

	async function processSeoData() {
		// Ensure we're not in the middle of a render cycle
		await tick();

		title = data.meta_title || '';
		description = data.meta_description || '';
		image = data.meta_image;
		
		// Set canonical URL - use provided canonical or construct from current page
		if (canonical) {
			canonicalUrl = canonical;
		} else if ($page) {
			canonicalUrl = `https://www.consilien.com${$page.url.pathname}`;
		}
		
		isRendered = true;

		// console.log('SEO Updated:', {
		// 	path: currentPath,
		// 	title,
		// 	description,
		// 	image
		// });
	}

	// Initialize on mount
	onMount(() => {
		if ($page) {
			currentPath = $page.url.pathname;
		}
	});
</script>

<svelte:head>
	<title>{title}</title>
	{#if description}
		<meta name="description" content={description} />
	{/if}
	{#if canonicalUrl}
		<link rel="canonical" href={canonicalUrl} />
	{/if}

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	{#if description}
		<meta property="og:description" content={description} />
	{/if}
	{#if canonicalUrl}
		<meta property="og:url" content={canonicalUrl} />
	{/if}
	{#if image}
		<meta property="og:image" content={image.url} />
		<meta property="og:image:alt" content={image.alt} />
	{/if}

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	{#if description}
		<meta name="twitter:description" content={description} />
	{/if}
	{#if image}
		<meta name="twitter:image" content={image.url} />
		<meta name="twitter:image:alt" content={image.alt} />
	{/if}
</svelte:head>
