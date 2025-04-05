import { createClient } from '$lib/prismicio';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { generateSlug } from '$lib/utils/slug';

export const load: PageServerLoad = async ({ params }) => {
    const client = createClient();

    // Get all articles
    const articles = await client.getAllByType('article');

    // Find the article with the matching slug
    const article = articles.find(
        article => article.data.title && generateSlug(article.data.title) === params.slug
    );

    if (!article) {
        throw error(404, 'Article not found');
    }

    return {
        article,
        title: article.data.title,
        featured_image: article.data.featured_image,
        author: article.data.author,
        date: article.data.date,
        category: article.data.category,
        content: article.data.content,
        meta_description: article.data.meta_description || article.data.title
    };
}; 