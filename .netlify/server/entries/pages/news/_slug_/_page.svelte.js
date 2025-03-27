import { c as create_ssr_component, e as escape } from "../../../../chunks/ssr.js";
import { asHTML } from "@prismicio/helpers";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let article;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  ({ article } = data);
  return `<div class="max-w-4xl mx-auto py-8 px-4"><h1 class="text-4xl font-bold mb-6">${escape(article.data.title)}</h1> <div class="prose prose-lg"><!-- HTML_TAG_START -->${asHTML(article.data.content)}<!-- HTML_TAG_END --></div></div>`;
});
export {
  Page as default
};
