<script context="module">
	// Use a module context variable to track if SEO tags have been rendered
	let seoRendered = false;
</script>

<script lang="ts">
	import { page } from '$app/stores';

	export let data: {
		meta_title?: string;
		meta_description?: string;
		meta_image?: {
			url: string;
			alt: string;
		};
	};
	

	let title = '';
	let description = '';
	let image: { url: string; alt: string } | undefined;
	// Generate canonical URL from current page
	$: canonicalUrl = $page ? `https://www.consilien.com${$page.url.pathname}` : '';

	// Process SEO data when data changes
	$: if (data) {
		title = data.meta_title || '';
		description = data.meta_description || '';
		image = data.meta_image;
	}

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
