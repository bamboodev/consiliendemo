<script>
	import { PrismicPreview } from '@prismicio/svelte/kit';
	import { page } from '$app/stores';
	import { repositoryName } from '$lib/prismicio';
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '$lib/slices';
	import '../app.css';
	import Footer from '$lib/components/footer.svelte';
	import SEO from '$lib/components/SEO.svelte';

	export let data;

	// Check if the current path includes '/news' to determine whether to show the SEO component
	$: isNewsRoute = $page.url.pathname.includes('/news');
</script>

{#if !isNewsRoute}
	<SEO data={$page.data} />
{/if}

<!-- <svelte:head>
	<title>{$page.data.title}</title>
	{#if $page.data.meta_description}
		<meta name="description" content={$page.data.meta_description} />
	{/if}
	{#if $page.data.meta_title}
		<meta name="og:title" content={$page.data.meta_title} />
	{/if}
	{#if $page.data.meta_image}
		<meta name="og:image" content={$page.data.meta_image} />
		<meta name="twitter:card" content="summary_large_image" />
	{/if}
</svelte:head> -->

<header class="nav-header min-h-16">
	{#if data.navigation}
		<SliceZone slices={data.navigation.data.slices} {components} />
	{:else}
		<div></div>
	{/if}
</header>

<main>
	<slot />
</main>

<PrismicPreview {repositoryName} />
<Footer />
