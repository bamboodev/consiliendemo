<script lang="ts">
	import { asText } from '@prismicio/helpers';
	import { page } from '$app/stores';
	import { generateSlug } from '$lib/utils/slug';
	export let data;

	$: ({ articles } = data);
	let searchTerm = $page.url.searchParams.get('search') || '';
	let selectedCategory: string | null = null;

	const categories = [
		'Backup and Disaster Recovery',
		'Compliance',
		'Cybersecurity',
		'IT and Business Operations',
		'Microsoft Updates',
		'News'
	];

	function parseDate(dateStr: string): Date {
		// Extract the date part from strings like "Updated 01/10/2015"
		const dateMatch = dateStr.match(/\d{2}\/\d{2}\/\d{4}/);
		if (!dateMatch) return new Date(0); // Return earliest possible date if parsing fails

		const [month, day, year] = dateMatch[0].split('/').map(Number);
		return new Date(year, month - 1, day); // month is 0-indexed in JS Date
	}

	$: filteredArticles = articles
		.filter((article) => {
			// Category filter
			if (selectedCategory && article.data.category !== selectedCategory) {
				return false;
			}

			// Search filter
			if (!searchTerm) return true;
			const searchLower = searchTerm.toLowerCase();
			const contentText = asText(article.data.content) || '';
			return (
				article.data.title?.toLowerCase().includes(searchLower) ||
				contentText.toLowerCase().includes(searchLower)
			);
		})
		.sort((a, b) => {
			const dateA = a.data.date ? parseDate(a.data.date) : new Date(0);
			const dateB = b.data.date ? parseDate(b.data.date) : new Date(0);
			return dateB.getTime() - dateA.getTime(); // Sort in descending order (newest first)
		});

	function clearSearch() {
		searchTerm = '';
	}

	function clearFilters() {
		searchTerm = '';
		selectedCategory = null;
	}
</script>

<div class="max-w-7xl mx-auto py-8 px-4">
	<div class="flex flex-col md:flex-row gap-8">
		<div class="flex-1">
			<h1 class="text-2xl font-text font-light mb-8">News</h1>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each filteredArticles as article}
					<a
						href="/news/{article.data.title ? generateSlug(article.data.title) : ''}"
						class="block p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
					>
						<div class="space-y-2">
							<span
								class="inline-block px-3 py-1 text-sm font-medium text-[#6DA63F] bg-green-50 rounded-full"
							>
								{article.data.category}
							</span>
							<h2 class="text-xl font-semibold text-gray-900">
								{article.data.title}
							</h2>
							{#if article.data.date}
								<p class="text-sm text-gray-500">
									{article.data.date}
								</p>
							{/if}
						</div>
					</a>
				{/each}
			</div>

			{#if filteredArticles.length === 0}
				<p class="text-center text-gray-500 mt-8">No articles found matching your search.</p>
			{/if}
		</div>

		<aside class="w-full md:w-80 shrink-0">
			<div class="sticky top-24 space-y-6">
				<div class="bg-gray-50 p-6 rounded-lg">
					<div class="flex items-center justify-between mb-4">
						<h2 class="text-lg font-text uppercase text-xs text-gray-600 font-bold tracking-widest">
							Search Articles
						</h2>
						{#if searchTerm || selectedCategory}
							<button on:click={clearFilters} class="text-sm text-gray-500 hover:text-gray-700">
								Clear all
							</button>
						{/if}
					</div>
					<div class="relative">
						<input
							type="text"
							bind:value={searchTerm}
							placeholder="Search articles..."
							class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA63F] focus:border-transparent pr-10"
						/>
						{#if searchTerm}
							<button
								on:click={clearSearch}
								class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
					</div>
				</div>

				<div class="bg-gray-50 p-6 rounded-lg">
					<h2 class="text-lg font-text uppercase text-xs text-gray-600 font-bold tracking-widest">
						Categories
					</h2>
					<hr class="border-gray-200 my-4" />
					<div class="space-y-2">
						{#each categories as category}
							<button
								on:click={() =>
									(selectedCategory = selectedCategory === category ? null : category)}
								class="w-full text-left px-4 py-2 rounded-lg transition-colors {selectedCategory ===
								category
									? 'bg-[#6DA63F] text-white'
									: 'hover:bg-gray-100 text-gray-700'}"
							>
								{category}
							</button>
						{/each}
					</div>
				</div>
			</div>
		</aside>
	</div>
</div>
