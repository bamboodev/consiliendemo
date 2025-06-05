import { c as createClient } from "../../../../../chunks/prismicio.js";
import { e as error } from "../../../../../chunks/index.js";
const load = async ({ params }) => {
  const client = createClient();
  const articles = await client.getAllByType("article", {
    orderings: [
      { field: "document.first_publication_date", direction: "desc" }
    ]
  });
  const filteredArticles = articles.filter(
    (article) => article.data.category === decodeURIComponent(params.category)
  );
  if (filteredArticles.length === 0) {
    throw error(404, "No articles found in this category");
  }
  return {
    articles: filteredArticles,
    category: decodeURIComponent(params.category),
    title: `News - ${decodeURIComponent(params.category)}`,
    meta_description: `Articles in the ${decodeURIComponent(params.category)} category`
  };
};
export {
  load
};
