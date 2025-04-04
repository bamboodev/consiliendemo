<script lang="ts">
	import { createClient } from '$lib/prismicio';
	import { onMount } from 'svelte';

	let articles: any[] = [];

	onMount(async () => {
		const client = createClient();
		const response = await client.getAllByType('article', {
			orderings: [{ field: 'document.first_publication_date', direction: 'desc' }],
			limit: 3
		});
		articles = response;
	});

	function formatDate(date: string) {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<div class="space-y-4">
	{#each articles as article}
		<div class="border-b border-[#565658] pb-4 last:border-b-0">
			<a href="/news/{encodeURIComponent(article.data.title || '')}" class="block group">
				<h5 class="text-sm font-medium text-white group-hover:text-orange-500 transition-colors">
					{article.data.title}
				</h5>
				<p class="text-xs text-gray-400 mt-1">
					{formatDate(article.first_publication_date)}
				</p>
			</a>
		</div>
	{/each}
</div>
