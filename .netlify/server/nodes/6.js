import * as server from '../entries/pages/news/category/_category_/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/news/category/_category_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/news/category/[category]/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.q8Fncptc.js","_app/immutable/chunks/CqAQ08uG.js","_app/immutable/chunks/D6YF6ztN.js","_app/immutable/chunks/CBWNMtTz.js","_app/immutable/chunks/BXrg0c_9.js"];
export const stylesheets = [];
export const fonts = [];
