import { createClient } from '$lib/prismicio';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const client = createClient();

    // Get the article directly by UID
    const article = await client.getByUID('article', params.slug);

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