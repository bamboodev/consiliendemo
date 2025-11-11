<script lang="ts">
	import { asHTML, asText } from '@prismicio/helpers';
	import { PrismicImage } from '@prismicio/svelte';
	import { goto } from '$app/navigation';
	import { SliceZone } from '@prismicio/svelte';
	import { components } from '$lib/slices';
	import AuthorInfo from '$lib/components/AuthorInfo.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { onMount } from 'svelte';
	export let data;

	$: ({ article } = data);
	let searchTerm = '';
	let selectedCategory: string | null = article?.data?.category || null;
	let seoData: {
		meta_title?: string;
		meta_description?: string;
		meta_image?: {
			url: string;
			alt: string;
		};
		schema?: string;
	} = {};

	onMount(() => {
		seoData = {
			meta_title: article?.data?.meta_title || article?.data?.title || '',
			meta_description: article?.data?.meta_description || undefined,
			meta_image: article?.data?.featured_image?.url
				? {
						url: article.data.featured_image.url,
						alt: article.data.featured_image.alt || ''
					}
				: undefined,
			schema: article?.data?.schema || undefined
		};
	});

	const categories = [
		'Backup and Disaster Recovery',
		'Compliance',
		'Cybersecurity',
		'IT and Business Operations',
		'Microsoft Updates',
		'News'
	];

	function handleSearch() {
		if (searchTerm.trim()) {
			goto(`/news?search=${encodeURIComponent(searchTerm.trim())}`);
		}
	}

	function clearSearch() {
		searchTerm = '';
	}

	function clearFilters() {
		searchTerm = '';
		selectedCategory = article?.data?.category || null;
	}
</script>

<SEO data={seoData} />

{#if article}
	<section class="bg-gray-100 mb-8">
		<div class="max-w-7xl mx-auto">
			<div class="max-w-4xl py-8 px-4">
				<h1 class="text-2xl max-w-4xl font-text font-light">{article.data.title}</h1>
				{#if article.data.date}
					<div class="font-text text-sm text-gray-400">
						{article.data.date}
					</div>
				{/if}
				<div class="font-text font-bold text-sm text-[#6DA63F]">
					{article.data.category}
				</div>
			</div>
		</div>
	</section>
	<div class="blog max-w-7xl mx-auto py-8 px-4">
		<div class="flex flex-col md:flex-row gap-8">
			<div class="flex-1">
				<div class="max-w-4xl">
					<PrismicImage field={data.featured_image} />

					<div class="prose prose-lg">
						{@html asHTML(article.data.content)}
					</div>
				</div>

				<SliceZone slices={article.data.slices} {components} />
			</div>

			<aside class="w-full md:w-80 shrink-0">
				<div class="sticky top-8 space-y-6">
					<div class="bg-gray-50 p-6 rounded-lg">
						<div class="flex items-center justify-between mb-4">
							<h2
								class="text-lg font-text uppercase text-xs text-gray-600 font-bold tracking-widest"
							>
								Search Articles
							</h2>

							{#if searchTerm}
								<button on:click={clearFilters} class="text-sm text-gray-500 hover:text-gray-700">
									Clear all
								</button>
							{/if}
						</div>
						<form on:submit|preventDefault={handleSearch} class="relative">
							<input
								type="text"
								bind:value={searchTerm}
								placeholder="Search articles..."
								class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA63F] focus:border-transparent pr-20"
							/>
							<button
								type="submit"
								class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
								aria-label="Search"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fill-rule="evenodd"
										d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
										clip-rule="evenodd"
									/>
								</svg>
							</button>
							{#if searchTerm}
								<button
									type="button"
									on:click={clearSearch}
									class="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
									aria-label="Clear search"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-5 w-5"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fill-rule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
											clip-rule="evenodd"
										/>
									</svg>
								</button>
							{/if}
						</form>
					</div>

					<div class="bg-gray-50 p-6 rounded-lg">
						<h2
							class="text-lg font-text uppercase text-xs text-gray-600 font-bold tracking-widest mb-3"
						>
							Categories
						</h2>
						<hr class="border-gray-200 my-4" />
						<div class="space-y-2">
							{#each categories as cat}
								<a
									href="/news/category/{encodeURIComponent(cat)}"
									class="block w-full text-left px-4 py-2 rounded-lg transition-colors {cat ===
									article.data.category
										? 'bg-[#6DA63F] text-white'
										: 'hover:bg-gray-100 text-gray-700'}"
								>
									{cat}
								</a>
							{/each}
						</div>
					</div>

					{#if article?.data?.author}
						<AuthorInfo author={article.data.author} />
					{/if}
				</div>
			</aside>
		</div>
	</div>
{:else}
	<p>Loading...</p>
{/if}

<style>
	:global(.prose p) {
		padding-top: 1rem;
		padding-bottom: 1rem;
	}
	:global(.prose a) {
		color: #6da63f;
	}
	:global(.prose h2) {
		font-family: Raleway, ui-sans-serif, system-ui, sans-serif;
		font-weight: 200;
		font-size: 2rem;
	}
	:global(.prose h3) {
		font-family: Raleway, ui-sans-serif, system-ui, sans-serif;
		font-weight: 200;
		font-size: 1.5rem;
	}
	:global(.prose strong) {
		font-family: Raleway, ui-sans-serif, system-ui, sans-serif;
		font-weight: bolder;
	}
	:global(.prose ul) {
		list-style-type: disc;
		padding-left: 1.5rem;
		margin-top: 1rem;
		margin-bottom: 1rem;
	}
	:global(.prose ol) {
		list-style-type: decimal;
		padding-left: 1.5rem;
		margin-top: 1rem;
		margin-bottom: 1rem;
	}
	:global(.prose li) {
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
		font-family: Raleway, ui-sans-serif, system-ui, sans-serif;
	}
	:global(.prose iframe) {
		width: 100%;
		height: auto;
		aspect-ratio: 16 / 9;
	}
	:global(.prose [data-oembed]) {
		width: 100%;
		margin: 1rem 0;
	}

	:global(.blog section.rich-text-content div.px-6) {
		padding-inline: 0 !important;
	}
</style>
