import * as server from '../entries/pages/news/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/news/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/news/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.BYPLzrq9.js","_app/immutable/chunks/kFmLM-jZ.js","_app/immutable/chunks/DM1S-rcW.js","_app/immutable/chunks/D6YF6ztN.js"];
export const stylesheets = [];
export const fonts = [];
