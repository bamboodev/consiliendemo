import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.CWf7ipeA.js","_app/immutable/chunks/CqAQ08uG.js","_app/immutable/chunks/CBWNMtTz.js","_app/immutable/chunks/BsOT5jhB.js","_app/immutable/chunks/vVhE37av.js","_app/immutable/chunks/Ic0VC3uG.js","_app/immutable/chunks/D6YF6ztN.js","_app/immutable/chunks/95xfP5wQ.js"];
export const stylesheets = ["_app/immutable/assets/0.BZn9eVmG.css","_app/immutable/assets/index.Cs54H7NZ.css"];
export const fonts = [];
