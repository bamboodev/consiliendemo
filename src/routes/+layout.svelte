<script>
	import { PrismicPreview } from '@prismicio/svelte/kit';
	import { page } from '$app/stores';
	import { repositoryName, createClient } from '$lib/prismicio';
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '$lib/slices';
	import '../app.css';
	import Footer from '$lib/components/footer.svelte';
	const client = createClient();
	const navigation = client.getSingle('navigation');
</script>

<svelte:head>
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
</svelte:head>

{#await navigation}
	<header class="nav-header min-h-16">
		<div></div>
	</header>
{:then nav}
	<header class="nav-header min-h-16">
		<SliceZone slices={nav.data.slices} {components} />
	</header>
{:catch error}
	<header class="nav-header min-h-16">
		<div>Error loading navigation</div>
	</header>
{/await}

<main>
	<slot />
</main>

<PrismicPreview {repositoryName} />
<Footer />
