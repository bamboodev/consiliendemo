import { g as set_current_component, h as current_component, r as run_all, c as create_ssr_component, f as subscribe, b as add_attribute, d as escape } from "./ssr.js";
import { p as page } from "./stores.js";
const dirty_components = [];
const binding_callbacks = [];
let render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = /* @__PURE__ */ Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
const seen_callbacks = /* @__PURE__ */ new Set();
let flushidx = 0;
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length) binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
const SEO = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  let title = "";
  let description = "";
  let image;
  let currentPath = "";
  let isRendered = false;
  async function processSeoData() {
    await tick();
    title = data.meta_title || "";
    description = data.meta_description || "";
    image = data.meta_image;
    isRendered = true;
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  {
    if ($page && $page.url.pathname !== currentPath) {
      currentPath = $page.url.pathname;
      isRendered = false;
    }
  }
  {
    if (data && !isRendered) {
      processSeoData();
    }
  }
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-1ib68jm_START -->${$$result.title = `<title>${escape(title)}</title>`, ""}${description ? `<meta name="description"${add_attribute("content", description, 0)}>` : ``}<meta property="og:type" content="website"><meta property="og:title"${add_attribute("content", title, 0)}>${description ? `<meta property="og:description"${add_attribute("content", description, 0)}>` : ``}${image ? `<meta property="og:image"${add_attribute("content", image.url, 0)}> <meta property="og:image:alt"${add_attribute("content", image.alt, 0)}>` : ``}<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${add_attribute("content", title, 0)}>${description ? `<meta name="twitter:description"${add_attribute("content", description, 0)}>` : ``}${image ? `<meta name="twitter:image"${add_attribute("content", image.url, 0)}> <meta name="twitter:image:alt"${add_attribute("content", image.alt, 0)}>` : ``}<!-- HEAD_svelte-1ib68jm_END -->`, ""}`;
});
export {
  SEO as S
};
