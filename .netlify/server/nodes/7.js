import * as server from '../entries/pages/slice-simulator/_page.server.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/slice-simulator/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/slice-simulator/+page.server.js";
export const imports = ["_app/immutable/nodes/7.DbPPWb5C.js","_app/immutable/chunks/CqAQ08uG.js","_app/immutable/chunks/CBWNMtTz.js","_app/immutable/chunks/Ic0VC3uG.js","_app/immutable/chunks/D6YF6ztN.js"];
export const stylesheets = ["_app/immutable/assets/index.Cs54H7NZ.css"];
export const fonts = [];
