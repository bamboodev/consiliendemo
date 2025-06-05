import * as server from '../entries/pages/news/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/news/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/news/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.CGVj8ASF.js","_app/immutable/chunks/CqKqjUHI.js","_app/immutable/chunks/D6YF6ztN.js","_app/immutable/chunks/CvtrOLOy.js","_app/immutable/chunks/C1Eiemwq.js","_app/immutable/chunks/Cve2_uqP.js","_app/immutable/chunks/Jgaj-CM2.js"];
export const stylesheets = [];
export const fonts = [];
