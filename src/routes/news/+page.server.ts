import { createClient } from '$lib/prismicio';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const client = createClient();

    const articles = await client.getAllByType('article', {
        orderings: [
            { field: 'document.first_publication_date', direction: 'desc' }
        ]
    });

    return {
        articles,
        title: 'News',
        meta_description: 'Latest news and updates'
    };
}; 