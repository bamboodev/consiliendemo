import { c as create_ssr_component, f as subscribe, b as add_attribute, d as escape } from "./ssr.js";
import { p as page } from "./stores.js";
const SEO = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let canonicalUrl;
  let isArticlePage;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  let title = "";
  let description = "";
  let image;
  let schema = "";
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Consilien",
    "image": "https://www.consilien.com/images/logo.svg",
    "url": "https://www.consilien.com/",
    "telephone": "866-680-3388",
    "priceRange": "$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "21250 Hawthorne Blvd Suite 500",
      "addressLocality": "Torrance",
      "addressRegion": "CA",
      "postalCode": "90501",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 33.8362436,
      "longitude": -118.3526184
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "17:00"
    },
    "sameAs": [
      "https://twitter.com/Consilien",
      "https://www.linkedin.com/company/consilien",
      "https://www.facebook.com/consilien"
    ],
    "hasMap": {
      "@type": "Map",
      "url": "https://www.google.com/maps?cid=17115211362562679061"
    }
  };
  function createArticleSchema(pageData) {
    const articleData = pageData.article;
    if (!articleData) return JSON.stringify(defaultSchema);
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": articleData.data.title,
      "description": articleData.data.meta_description || articleData.data.title,
      "author": {
        "@type": "Person",
        "name": articleData.data.author || "Consilien"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Consilien",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.consilien.com/images/logo.svg"
        }
      },
      "datePublished": articleData.data.date,
      "dateModified": articleData.data.date,
      "image": articleData.data.featured_image?.url || "https://www.consilien.com/images/logo.svg",
      "url": `https://www.consilien.com/news/${articleData.uid}`,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://www.consilien.com/news/${articleData.uid}`
      },
      "articleSection": articleData.data.category
    };
    return JSON.stringify(articleSchema);
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  canonicalUrl = $page ? `https://www.consilien.com${$page.url.pathname}` : "";
  isArticlePage = $page.route?.id?.includes("/news/[slug]");
  {
    if (data) {
      title = data.meta_title || "";
      description = data.meta_description || "";
      image = data.meta_image;
      if (data.schema) {
        schema = data.schema;
      } else if (isArticlePage && $page.data) {
        schema = createArticleSchema($page.data);
      } else {
        schema = JSON.stringify(defaultSchema);
      }
    }
  }
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-1xjekhj_START -->${$$result.title = `<title>${escape(title)}</title>`, ""}${description ? `<meta name="description"${add_attribute("content", description, 0)}>` : ``}${canonicalUrl ? `<link rel="canonical"${add_attribute("href", canonicalUrl, 0)}>` : ``}<meta property="og:type" content="website"><meta property="og:title"${add_attribute("content", title, 0)}>${description ? `<meta property="og:description"${add_attribute("content", description, 0)}>` : ``}${canonicalUrl ? `<meta property="og:url"${add_attribute("content", canonicalUrl, 0)}>` : ``}${image ? `<meta property="og:image"${add_attribute("content", image.url, 0)}> <meta property="og:image:alt"${add_attribute("content", image.alt, 0)}>` : ``}<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${add_attribute("content", title, 0)}>${description ? `<meta name="twitter:description"${add_attribute("content", description, 0)}>` : ``}${image ? `<meta name="twitter:image"${add_attribute("content", image.url, 0)}> <meta name="twitter:image:alt"${add_attribute("content", image.alt, 0)}>` : ``}${schema ? `<!-- HTML_TAG_START -->${`<script type="application/ld+json">${schema}<\/script>`}<!-- HTML_TAG_END -->` : ``}<!-- HEAD_svelte-1xjekhj_END -->`, ""}`;
});
export {
  SEO as S
};
