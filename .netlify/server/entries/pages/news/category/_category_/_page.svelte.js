import { c as create_ssr_component, d as escape, e as each, b as add_attribute } from "../../../../../chunks/ssr.js";
import { g as generateSlug } from "../../../../../chunks/slug.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let articles;
  let category;
  let filteredArticles;
  let { data } = $$props;
  let searchTerm = "";
  const categories = [
    "Backup and Disaster Recovery",
    "Compliance",
    "Cybersecurity",
    "IT and Business Operations",
    "Microsoft Updates",
    "News"
  ];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  ({ articles, category } = data);
  filteredArticles = articles.filter((article) => {
    return true;
  });
  return `<div class="max-w-7xl mx-auto py-8 px-4"><div class="flex flex-col md:flex-row gap-8"><div class="flex-1"><h1 class="text-2xl font-text font-light mb-8">News - ${escape(category)}</h1> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">${each(filteredArticles, (article) => {
    return `<a href="${"/news/" + escape(
      article.data.title ? generateSlug(article.data.title) : "",
      true
    )}" class="block p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"><div class="space-y-2"><span class="inline-block px-3 py-1 text-sm font-medium text-[#6DA63F] bg-green-50 rounded-full">${escape(article.data.category)}</span> <h2 class="text-xl font-semibold text-gray-900">${escape(article.data.title)}</h2> ${article.data.date ? `<p class="text-sm text-gray-500">${escape(article.data.date)} </p>` : ``}</div> </a>`;
  })}</div> ${filteredArticles.length === 0 ? `<p class="text-center text-gray-500 mt-8" data-svelte-h="svelte-u0p883">No articles found matching your search.</p>` : ``}</div> <aside class="w-full md:w-80 shrink-0"><div class="sticky top-24 space-y-6"><div class="bg-gray-50 p-6 rounded-lg"><div class="flex items-center justify-between mb-4"><h2 class="text-lg font-text uppercase text-xs text-gray-600 font-bold tracking-widest" data-svelte-h="svelte-1y9nmj9">Search Articles</h2> ${``}</div> <div class="relative"><input type="text" placeholder="Search articles..." class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA63F] focus:border-transparent pr-10"${add_attribute("value", searchTerm, 0)}> ${``}</div></div> <div class="bg-gray-50 p-6 rounded-lg"><h2 class="text-lg font-text uppercase text-xs text-gray-600 font-bold tracking-widest" data-svelte-h="svelte-r8raqw">Categories</h2> <hr class="border-gray-200 my-4"> <div class="space-y-2">${each(categories, (cat) => {
    return `<a href="${"/news/category/" + escape(encodeURIComponent(cat), true)}" class="${"block w-full text-left px-4 py-2 rounded-lg transition-colors " + escape(
      cat === category ? "bg-[#6DA63F] text-white" : "hover:bg-gray-100 text-gray-700",
      true
    )}">${escape(cat)} </a>`;
  })}</div></div></div></aside></div></div>`;
});
export {
  Page as default
};
