import { c as create_ssr_component, d as subscribe, e as escape } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<div class="flex flex-col items-center justify-center min-h-screen text-center px-4"><h1 class="text-[#6DA63F] font-bold text-5xl block mb-4">${escape($page.status)}: ${escape($page.error?.message || "Page not found")}</h1> ${$page.status === 404 ? `<p class="text-xl md:text-2xl mb-8" data-svelte-h="svelte-867syx">We couldn&#39;t find the page you were looking for.</p> <a href="/" class="flex items-center gap-2 bg-orange-500 border-2 border-white uppercase font-semibold text-xs text-white py-3 px-6 hover:bg-orange-600 hover:shadow transition duration-300 ease-out" data-svelte-h="svelte-tiur6g">Go back to homepage</a>` : `<p class="text-xl md:text-2xl mb-8" data-svelte-h="svelte-1be21e7">An unexpected error occurred.</p> <a href="/" class="flex items-center gap-2 bg-orange-500 border-2 border-white uppercase font-semibold text-xs text-white py-3 px-6 hover:bg-orange-600 hover:shadow transition duration-300 ease-out" data-svelte-h="svelte-tiur6g">Go back to homepage</a>`}</div>`;
});
export {
  Error as default
};
