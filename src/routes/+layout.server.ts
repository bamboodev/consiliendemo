import { createClient } from '$lib/prismicio';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
    const client = createClient();
    const navigation = await client.getSingle('navigation');

    return {
        navigation
    };
};
