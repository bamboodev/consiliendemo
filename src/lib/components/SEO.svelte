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
		schema?: string;
	};
	

	let title = '';
	let description = '';
	let image: { url: string; alt: string } | undefined;
	let schema = '';
	
	// Generate canonical URL from current page
	$: canonicalUrl = $page ? `https://www.consilien.com${$page.url.pathname}` : '';

	// Default schema markup
	const defaultSchema = {
		"@context": "https://schema.org",
		"@type": "LocalBusiness",
		"name": "Consilien",
		"image": "https://www.consilien.com/images/logo.svg",
		"url": "https://www.consilien.com/",
		"telephone": "866-680-3388",
		"priceRange": "$",
		"address": {
			"@type": "PostalAddress",
			"streetAddress": "21250 Hawthorne Blvd Suite 500",
			"addressLocality": "Torrance",
			"addressRegion": "CA",
			"postalCode": "90501",
			"addressCountry": "US"
		},
		"geo": {
			"@type": "GeoCoordinates",
			"latitude": 33.8362436,
			"longitude": -118.3526184
		},
		"openingHoursSpecification": {
			"@type": "OpeningHoursSpecification",
			"dayOfWeek": [
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday"
			],
			"opens": "08:00",
			"closes": "17:00"
		},
		"sameAs": [
			"https://twitter.com/Consilien",
			"https://www.linkedin.com/company/consilien",
			"https://www.facebook.com/consilien"
		],
		"hasMap": {
			"@type": "Map",
			"url": "https://www.google.com/maps?cid=17115211362562679061"
		}
	};

	// Create Article schema for news pages
	function createArticleSchema(pageData: any): string {
		const articleData = pageData.article;
		if (!articleData) return JSON.stringify(defaultSchema);

		const articleSchema = {
			"@context": "https://schema.org",
			"@type": "Article",
			"headline": articleData.data.title,
			"description": articleData.data.meta_description || articleData.data.title,
			"author": {
				"@type": "Person",
				"name": articleData.data.author || "Consilien"
			},
			"publisher": {
				"@type": "Organization",
				"name": "Consilien",
				"logo": {
					"@type": "ImageObject",
					"url": "https://www.consilien.com/images/logo.svg"
				}
			},
			"datePublished": articleData.data.date,
			"dateModified": articleData.data.date,
			"image": articleData.data.featured_image?.url || "https://www.consilien.com/images/logo.svg",
			"url": `https://www.consilien.com/news/${articleData.uid}`,
			"mainEntityOfPage": {
				"@type": "WebPage",
				"@id": `https://www.consilien.com/news/${articleData.uid}`
			},
			"articleSection": articleData.data.category
		};

		return JSON.stringify(articleSchema);
	}

	// Detect if we're on an article page
	$: isArticlePage = $page.route?.id?.includes('/news/[slug]');

	// Process SEO data when data changes
	$: if (data) {
		console.log('DEBUG SEO: Received data:', data);
		console.log('DEBUG SEO: Schema from data:', data.schema);
		console.log('DEBUG SEO: Current page route:', $page.route?.id);
		console.log('DEBUG SEO: Is article page:', isArticlePage);
		console.log('DEBUG SEO: Page data:', $page.data);
		
		title = data.meta_title || '';
		description = data.meta_description || '';
		image = data.meta_image;
		
		if (data.schema) {
			console.log('DEBUG SEO: Using provided schema');
			schema = data.schema;
		} else if (isArticlePage && $page.data) {
			console.log('DEBUG SEO: Generating article schema');
			schema = createArticleSchema($page.data);
		} else {
			console.log('DEBUG SEO: Using default schema');
			schema = JSON.stringify(defaultSchema);
		}
		
		console.log('DEBUG SEO: Final schema:', schema);
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

	<!-- Schema.org structured data -->
	{#if schema}
		{@html `<script type="application/ld+json">${schema}</script>`}
	{/if}
</svelte:head>
