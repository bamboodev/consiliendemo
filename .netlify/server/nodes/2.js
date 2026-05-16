import * as server from '../entries/pages/__preview_preview__/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/__preview_preview__/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/[[preview=preview]]/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.BvYvtHQT.js","_app/immutable/chunks/CqAQ08uG.js","_app/immutable/chunks/CBWNMtTz.js","_app/immutable/chunks/Ic0VC3uG.js","_app/immutable/chunks/D6YF6ztN.js"];
export const stylesheets = ["_app/immutable/assets/index.Cs54H7NZ.css"];
export const fonts = [];
