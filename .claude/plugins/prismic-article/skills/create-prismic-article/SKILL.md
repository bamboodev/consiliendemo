---
name: create-prismic-article
description: Use this skill when the user asks to create, draft, add, or publish a new article, blog post, or news post in Prismic CMS. Gathers the article fields (title, category, author, date, featured image, body content, SEO) in conversation, then runs the bundled Node script to upload the featured image via the Prismic Asset API and create the document as a draft via the Prismic Migration API. Articles always land in Prismic in DRAFT state for human review and publishing.
version: 0.1.0
---

# Create a Prismic Article (Draft)

This skill creates new `article` documents in a Prismic CMS repository. The article is created as a **draft** — Prismic does not allow programmatic publishing, so the user will publish manually in the Prismic dashboard.

## When to use

Activate when the user says things like:
- "create a new article in Prismic"
- "draft a blog post for our news section"
- "add an article called X with this image"
- "upload a new post to Prismic"

## Prerequisites — check before running

1. **`PRISMIC_WRITE_TOKEN`** is set in the project `.env` (or shell env). Get it from Prismic dashboard → Settings → API & Security → "Write API" → generate a permanent token.
2. **`PRISMIC_REPOSITORY`** is set in `.env` — this is the Prismic repository name (the subdomain, e.g. `consiliendemo` for `consiliendemo.prismic.io`). If the user is in a SvelteKit/Prismic project, you can often read it from `slicemachine.config.json` → `repositoryName`.
3. **Node 20+** is available (`node --version`). The script uses native `fetch` and `FormData`.
4. The **`article` custom type exists** in the Prismic repo with these fields: `uid`, `title`, `featured_image`, `date`, `category` (Select), `author` (Select), `content` (StructuredText), and SEO fields `meta_title` / `meta_description` / `schema`. If the user's repo uses different field names, ask before sending the payload.

If `.env` is missing the token or repo name, stop and ask the user to add them — do not proceed. Remind them that `.env` should be gitignored.

## Workflow

1. **Gather article fields from the user.** Ask for whatever is missing:
   - `title` (required)
   - `uid` (URL slug — kebab-case; derive from title and confirm)
   - `category` (must match one of the Select options in the custom type)
   - `author` (must match one of the Select options)
   - `date` (the displayed date string, e.g. `2026-05-27` or `May 27, 2026` — match the project's existing format)
   - `featured_image` — local absolute file path on disk + `alt` text
   - `content` — the article body. Accept either a string (paragraphs split by blank lines) or an array of rich-text blocks
   - `meta_title`, `meta_description`, `schema` (optional)

2. **Validate the category and author values** against the custom type's Select options before submitting. If you have access to `customtypes/article/index.json` in the project, read the options from there. Otherwise ask the user to confirm.

3. **Build the JSON payload** (see `references/payload-example.json` and the script header for the schema).

4. **Write the payload to a temp file** (don't pipe huge JSON through the shell). Use `mktemp` or a path like `/tmp/prismic-article-<uid>.json`.

5. **Run the script:**
   ```bash
   node <skill-dir>/scripts/create-article.mjs --payload /tmp/prismic-article-<uid>.json
   ```
   `<skill-dir>` resolves to the directory containing this `SKILL.md`. From a project checkout, it is typically `.claude/plugins/prismic-article/skills/create-prismic-article`.

6. **Report the result** to the user: the new document ID, the asset ID/URL for the image, and a reminder that the article is in **draft** state and must be published from the Prismic dashboard.

## Rich text format

The `content` field is Prismic StructuredText, an array of block objects. Supported `type` values for this article custom type:

- `paragraph`, `preformatted`
- `heading1` through `heading6`
- `list-item`, `o-list-item` (ordered list)
- `image`, `embed` (advanced — usually leave to manual editing)

Each block: `{ "type": "...", "text": "...", "spans": [] }`. For simple articles, pass `content` as a plain string and the script will split paragraphs on blank lines. For headings/lists, pass the explicit array form.

## Example minimal payload

See `references/payload-example.json` for a complete example. Minimum required fields:

```json
{
  "type": "article",
  "uid": "example-article",
  "lang": "en-us",
  "data": {
    "title": "Example Article",
    "category": "News",
    "author": "Eric Kong",
    "date": "2026-05-27",
    "featured_image": { "file": "/Users/me/Pictures/hero.jpg", "alt": "Hero image" },
    "content": "First paragraph.\n\nSecond paragraph."
  }
}
```

## After the script succeeds

Tell the user:
1. The document was created as a **draft inside a Prismic *Release*** (typically named `Migration <date>`). A Release is Prismic's batch-publish container — the Migration API always groups new content into one.
2. To find it: open `https://<repo-name>.prismic.io/` → **Releases** in the left sidebar → open the latest `Migration ...` release. The draft article will be inside.
3. To publish: either click **Publish release** to publish everything in that release, or open the individual document and publish it on its own.

## Errors to watch for

- `401 / 403` → token is wrong, expired, or lacks write scope. Have the user regenerate.
- `400` on document create → likely a field name mismatch with the custom type, or a `category`/`author` value not in the allowed Select options. Re-check `customtypes/article/index.json`.
- Rate limit on Asset API: 1 request/sec. The script uploads one image per run so this is rarely an issue.
- `Featured image not found` → the path must be absolute and readable.
