import * as server from '../entries/pages/news/_slug_/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/news/_slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/news/[slug]/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.BO9-POzA.js","_app/immutable/chunks/CqKqjUHI.js","_app/immutable/chunks/CvtrOLOy.js","_app/immutable/chunks/D6YF6ztN.js","_app/immutable/chunks/CGNcaYM0.js","_app/immutable/chunks/Jgaj-CM2.js","_app/immutable/chunks/Dk1ReJM1.js","_app/immutable/chunks/Cve2_uqP.js"];
export const stylesheets = ["_app/immutable/assets/5.BEgjXvpe.css"];
export const fonts = [];
