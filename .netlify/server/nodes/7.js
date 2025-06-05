import * as server from '../entries/pages/slice-simulator/_page.server.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/slice-simulator/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/slice-simulator/+page.server.js";
export const imports = ["_app/immutable/nodes/7.Cy_fuYRs.js","_app/immutable/chunks/CqKqjUHI.js","_app/immutable/chunks/CvtrOLOy.js","_app/immutable/chunks/yFh7uBK4.js","_app/immutable/chunks/D6YF6ztN.js","_app/immutable/chunks/CGNcaYM0.js"];
export const stylesheets = ["_app/immutable/assets/index.BFjebnXD.css"];
export const fonts = [];
