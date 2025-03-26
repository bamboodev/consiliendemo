import { createClient } from '$lib/prismicio';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const client = createClient();

    // Get all articles
    const articles = await client.getAllByType('article');

    // Find the article with the matching title
    const article = articles.find(
        article => article.data.title === decodeURIComponent(params.slug)
    );

    if (!article) {
        throw error(404, 'Article not found');
    }

    return {
        article,
        title: article.data.title,
        meta_description: article.data.excerpt || article.data.title
    };
}; 