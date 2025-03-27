import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.7vc7QP1q.js","_app/immutable/chunks/kFmLM-jZ.js","_app/immutable/chunks/DM1S-rcW.js","_app/immutable/chunks/34CZ75Xe.js","_app/immutable/chunks/CJmQQFmi.js","_app/immutable/chunks/DVxrJYHB.js","_app/immutable/chunks/D6YF6ztN.js","_app/immutable/chunks/BMWXYFyB.js"];
export const stylesheets = ["_app/immutable/assets/0.6k5PINDl.css","_app/immutable/assets/index.Cb4jTEE8.css"];
export const fonts = [];
