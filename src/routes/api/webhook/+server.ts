import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const body = await request.json();
        
        // Verify this is a Prismic webhook
        if (!body.type || !body.masterRef) {
            return json({ error: 'Invalid webhook payload' }, { status: 400 });
        }

        // Only trigger rebuild on actual publish events
        if (body.type === 'api-update' && body.releases?.update) {
            const netlifyBuildHook = process.env.NETLIFY_BUILD_HOOK;
            
            if (!netlifyBuildHook) {
                console.error('NETLIFY_BUILD_HOOK environment variable not set');
                return json({ error: 'Build hook not configured' }, { status: 500 });
            }

            // Trigger Netlify build
            const response = await fetch(netlifyBuildHook, {
                method: 'POST',
                body: JSON.stringify({
                    trigger: 'prismic-content-update',
                    timestamp: new Date().toISOString()
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                console.error('Failed to trigger Netlify build:', response.statusText);
                return json({ error: 'Failed to trigger build' }, { status: 500 });
            }

            console.log('Successfully triggered Netlify build from Prismic webhook');
            return json({ success: true, message: 'Build triggered' });
        }

        // For other webhook types, just acknowledge receipt
        return json({ success: true, message: 'Webhook received' });
        
    } catch (error) {
        console.error('Webhook error:', error);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
};