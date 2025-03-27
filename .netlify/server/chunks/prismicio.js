import * as prismic from "@prismicio/client";
import "./client.js";
const enableAutoPreviews = (config) => {
  if (!config.cookies) {
    return;
  }
  const cookie = config.cookies.get(prismic.cookie.preview);
  if (cookie && /\.prismic\.io/.test(cookie)) {
    config.client.queryContentFromRef(cookie);
  }
};
const repositoryName$1 = "consiliendemo";
const sm = {
  repositoryName: repositoryName$1
};
const repositoryName = sm.repositoryName;
const routes = [
  { type: "page", path: "/", uid: "home" },
  { type: "page", path: "/:uid" },
  { type: "navigation", path: "/navigation" }
  // Add navigation route
];
const createClient = ({ cookies, ...config } = {}) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    ...config
  });
  enableAutoPreviews({
    client,
    cookies
  });
  return client;
};
async function getPageByUID(client, uid) {
  try {
    return await client.getByUID("page", uid);
  } catch (error) {
    if (error instanceof prismic.NotFoundError) {
      return null;
    }
    throw error;
  }
}
export {
  createClient as c,
  getPageByUID as g,
  repositoryName as r
};
