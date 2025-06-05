import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.DSv5oSsB.js","_app/immutable/chunks/CqKqjUHI.js","_app/immutable/chunks/CvtrOLOy.js","_app/immutable/chunks/Jgaj-CM2.js","_app/immutable/chunks/Cve2_uqP.js","_app/immutable/chunks/yFh7uBK4.js","_app/immutable/chunks/D6YF6ztN.js","_app/immutable/chunks/CGNcaYM0.js","_app/immutable/chunks/Dk1ReJM1.js"];
export const stylesheets = ["_app/immutable/assets/0.DGJtArb2.css","_app/immutable/assets/index.BFjebnXD.css"];
export const fonts = [];
