import { asText } from '@prismicio/client';
import { error } from '@sveltejs/kit';
import { createClient, getPageByUID } from '$lib/prismicio';

export async function load({ fetch, cookies }) {
	const client = createClient({ fetch, cookies });

	const page = await getPageByUID(client, 'home');

	if (!page) {
		throw error(404, {
			message: 'Home page not found'
		});
	}

	return {
		page,
		title: asText(page.data.title),
		meta_description: page.data.meta_description,
		meta_title: page.data.meta_title,
		meta_image: page.data.meta_image.url
	};
}

export async function entries() {
	const client = createClient();

	try {
		const pages = await client.getAllByType('page');
		return pages.map((page) => {
			return { uid: page.uid };
		});
	} catch (e) {
		console.error('Error fetching pages for pre-rendering:', e);
		return [];
	}
}
