import { c as createClient } from "../../../chunks/prismicio.js";
const load = async () => {
  const client = createClient();
  const articles = await client.getAllByType("article", {
    orderings: [
      { field: "document.first_publication_date", direction: "desc" }
    ]
  });
  return {
    articles,
    title: "News",
    meta_description: "Latest news and updates"
  };
};
export {
  load
};
