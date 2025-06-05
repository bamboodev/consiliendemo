import * as server from '../entries/pages/news/category/_category_/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/news/category/_category_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/news/category/[category]/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.BSdZbm3n.js","_app/immutable/chunks/CqKqjUHI.js","_app/immutable/chunks/D6YF6ztN.js","_app/immutable/chunks/CvtrOLOy.js","_app/immutable/chunks/C1Eiemwq.js"];
export const stylesheets = [];
export const fonts = [];
