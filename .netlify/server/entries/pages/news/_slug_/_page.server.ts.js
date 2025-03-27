import { c as createClient } from "../../../../chunks/prismicio.js";
import { e as error } from "../../../../chunks/index.js";
const load = async ({ params }) => {
  const client = createClient();
  const articles = await client.getAllByType("article");
  const article = articles.find(
    (article2) => article2.data.title === decodeURIComponent(params.slug)
  );
  if (!article) {
    throw error(404, "Article not found");
  }
  return {
    article,
    title: article.data.title,
    meta_description: article.data.excerpt || article.data.title
  };
};
export {
  load
};
