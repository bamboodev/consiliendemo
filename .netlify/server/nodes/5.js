import * as server from '../entries/pages/news/_slug_/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/news/_slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/news/[slug]/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.CvqhlBCr.js","_app/immutable/chunks/kFmLM-jZ.js","_app/immutable/chunks/DM1S-rcW.js","_app/immutable/chunks/BMWXYFyB.js"];
export const stylesheets = [];
export const fonts = [];
