import * as server from '../entries/pages/news/_slug_/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/news/_slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/news/[slug]/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.ShMd8GZA.js","_app/immutable/chunks/CqAQ08uG.js","_app/immutable/chunks/CBWNMtTz.js","_app/immutable/chunks/D6YF6ztN.js","_app/immutable/chunks/Ic0VC3uG.js","_app/immutable/chunks/BsOT5jhB.js","_app/immutable/chunks/95xfP5wQ.js","_app/immutable/chunks/vVhE37av.js"];
export const stylesheets = ["_app/immutable/assets/5.jLQeoq36.css","_app/immutable/assets/index.Cs54H7NZ.css"];
export const fonts = [];
