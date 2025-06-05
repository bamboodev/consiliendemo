import { j as json } from "../../../../chunks/index.js";
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    if (!body.type || !body.masterRef) {
      return json({ error: "Invalid webhook payload" }, { status: 400 });
    }
    if (body.type === "api-update" && body.releases?.update) {
      const netlifyBuildHook = process.env.NETLIFY_BUILD_HOOK;
      if (!netlifyBuildHook) {
        console.error("NETLIFY_BUILD_HOOK environment variable not set");
        return json({ error: "Build hook not configured" }, { status: 500 });
      }
      const response = await fetch(netlifyBuildHook, {
        method: "POST",
        body: JSON.stringify({
          trigger: "prismic-content-update",
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        console.error("Failed to trigger Netlify build:", response.statusText);
        return json({ error: "Failed to trigger build" }, { status: 500 });
      }
      console.log("Successfully triggered Netlify build from Prismic webhook");
      return json({ success: true, message: "Build triggered" });
    }
    return json({ success: true, message: "Webhook received" });
  } catch (error) {
    console.error("Webhook error:", error);
    return json({ error: "Internal server error" }, { status: 500 });
  }
};
export {
  POST
};
