<script>
	import { PrismicPreview } from '@prismicio/svelte/kit';
	import { page } from '$app/stores';
	import { repositoryName, createClient } from '$lib/prismicio';
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '$lib/slices';

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
	<header class="nav-header">
		<div>Loading...</div>
	</header>
{:then nav}
	<header class="nav-header">
		<SliceZone slices={nav.data.slices} {components} />
	</header>
{:catch error}
	<header class="nav-header">
		<div>Error loading navigation</div>
	</header>
{/await}

<main>
	<slot />
</main>

<PrismicPreview {repositoryName} />

<style>
	/* Your existing styles remain unchanged */
	@import 'open-props/style';
	@import 'open-props/normalize';
	@import 'open-props/gray-hsl';

	/* Add new styles for the navigation header */
	.nav-header {
		background: var(--surface-1);
		border-bottom: 1px solid var(--surface-3);
		width: 100%;
		position: sticky;
		top: 0;
		z-index: 100;
	}

	/* Rest of your existing styles remain unchanged */
</style>
