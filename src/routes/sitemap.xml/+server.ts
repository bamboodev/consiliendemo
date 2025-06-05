import { createClient } from '$lib/prismicio';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
    const client = createClient();
    const siteUrl = url.origin;

    try {
        // Get all pages
        const pages = await client.getAllByType('page');
        
        // Get all articles
        const articles = await client.getAllByType('article');

        // Build sitemap XML
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages.map(page => {
        const pageUrl = page.uid === 'home' ? siteUrl : `${siteUrl}/${page.uid}`;
        return `
    <url>
        <loc>${pageUrl}</loc>
        <lastmod>${new Date(page.last_publication_date).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${page.uid === 'home' ? '1.0' : '0.8'}</priority>
    </url>`;
    }).join('')}
    <url>
        <loc>${siteUrl}/news</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
    </url>
    ${articles.map(article => `
    <url>
        <loc>${siteUrl}/news/${article.uid}</loc>
        <lastmod>${new Date(article.last_publication_date).toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>`).join('')}
</urlset>`;

        return new Response(sitemap.trim(), {
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'public, max-age=3600'
            }
        });
    } catch (error) {
        console.error('Error generating sitemap:', error);
        return new Response('Error generating sitemap', { status: 500 });
    }
};