import * as server from '../entries/pages/news/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/news/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/news/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.B_7iA4fM.js","_app/immutable/chunks/CqAQ08uG.js","_app/immutable/chunks/CBWNMtTz.js","_app/immutable/chunks/D6YF6ztN.js","_app/immutable/chunks/BXrg0c_9.js","_app/immutable/chunks/CZ2-EXX7.js","_app/immutable/chunks/BczcPSwm.js","_app/immutable/chunks/B9aVn1j0.js"];
export const stylesheets = [];
export const fonts = [];
