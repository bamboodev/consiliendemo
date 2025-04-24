<script lang="ts">
	export let data: {
		meta_title?: string;
		meta_description?: string;
		meta_image?: {
			url: string;
			alt: string;
		};
	};

	$: title = data?.meta_title || 'Consilien IT Services';
	$: description = data?.meta_description || '';
	$: image = data?.meta_image;
</script>

<svelte:head>
	<title>{title}</title>
	{#if description}
		<meta name="description" content={description} />
	{/if}

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	{#if description}
		<meta property="og:description" content={description} />
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
