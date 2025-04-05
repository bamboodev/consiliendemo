import { createClient } from '$lib/prismicio';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const client = createClient();

    // Get all articles
    const articles = await client.getAllByType('article', {
        orderings: [
            { field: 'document.first_publication_date', direction: 'desc' }
        ]
    });

    // Filter articles by category
    const filteredArticles = articles.filter(
        article => article.data.category === decodeURIComponent(params.category)
    );

    if (filteredArticles.length === 0) {
        throw error(404, 'No articles found in this category');
    }

    return {
        articles: filteredArticles,
        category: decodeURIComponent(params.category),
        title: `News - ${decodeURIComponent(params.category)}`,
        meta_description: `Articles in the ${decodeURIComponent(params.category)} category`
    };
}; 