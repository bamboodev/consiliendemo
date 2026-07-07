# prismic-article — Claude Code skill

Drafts new articles into a [Prismic CMS](https://prismic.io) repository directly from Claude Code. Uploads the featured image via the Prismic Asset API and creates the document via the Prismic Migration API.

**All articles are created in `draft` state, grouped inside a Prismic *Release*** (typically named `Migration <date>`). A Release is Prismic's batch-publish container — the Migration API always wraps new content in one. To find the article, open the Prismic dashboard → **Releases** → the latest `Migration ...` release. To publish, either publish the whole release or open the individual document and publish it alone. Prismic does not allow programmatic publishing.

## Requirements

- **Node 20+** (uses native `fetch` and `FormData`)
- A Prismic repository with an **`article` custom type** that includes the fields: `uid`, `title`, `featured_image`, `date`, `category` (Select), `author` (Select), `content` (StructuredText), and optional `meta_title` / `meta_description` / `schema`
- A Prismic **permanent write token** (Settings → API & Security → Write API)

## Install

### Option A — drop into a project (recommended for one team)

1. Copy the `prismic-article/` folder into the target project at:
   ```
   <project-root>/.claude/plugins/prismic-article/
   ```
2. In Claude Code, the skill will be auto-discovered the next time you start a session in that project.

### Option B — install for your user account

1. Copy the `prismic-article/` folder to:
   ```
   ~/.claude/plugins/prismic-article/
   ```
2. Restart Claude Code.

### Option C — publish as a Claude Code plugin marketplace

The folder is already a valid plugin (has `.claude-plugin/plugin.json`). Push it to its own git repo and add the repo as a marketplace in Claude Code:
```
/plugin marketplace add <github-user>/<repo-name>
/plugin install prismic-article
```

## Configure

Create a `.env` file at your **project root** (the directory you launch Claude Code from):

```dotenv
PRISMIC_WRITE_TOKEN=your-permanent-write-token
PRISMIC_REPOSITORY=your-repo-name
```

- `PRISMIC_REPOSITORY` is the subdomain part of your Prismic URL — for `consiliendemo.prismic.io` it is `consiliendemo`.
- **Add `.env` to `.gitignore`** if it isn't already.

A template is provided at `.env.example`.

## Use

Just ask Claude in natural language:

> Create a new article in Prismic titled "Q2 Cybersecurity Update", category News, author Eric Kong, dated today. Use this image: /Users/me/Pictures/q2-hero.jpg. Write a 3-paragraph intro about the recent threat landscape.

Claude will:

1. Confirm the slug (UID) and any missing fields.
2. Validate the `category` and `author` against the allowed Select options in your repo's `customtypes/article/index.json` (if present).
3. Write the article JSON to a temp file.
4. Run `node .claude/plugins/prismic-article/skills/create-prismic-article/scripts/create-article.mjs --payload /tmp/...json`.
5. Report the new document ID and remind you it's a draft.

You can also run the script directly:

```bash
node .claude/plugins/prismic-article/skills/create-prismic-article/scripts/create-article.mjs --payload my-article.json
# or
cat my-article.json | node .claude/plugins/prismic-article/skills/create-prismic-article/scripts/create-article.mjs
```

Use `--dry-run` to print the resolved payload without hitting the API.

See `skills/create-prismic-article/references/payload-example.json` for the exact payload shape.

## Adapting to a different custom type

If your article type uses different field names (e.g. `hero_image` instead of `featured_image`), edit `data` in the payload before sending. The script does not assume any field names beyond `featured_image` (which it builds from the uploaded asset). To change that, edit `scripts/create-article.mjs` — search for `data.featured_image`.

## Limitations

- **Drafts only.** Publishing requires manual action in the Prismic dashboard.
- **One image per run** (the featured image). Inline body images can be added later in the Prismic UI, or extended in the script.
- **No slice content.** `data.slices` is set to `[]`. If your articles use slices, supply them in the payload.
- **No content updates.** This skill only creates new documents; it does not update existing ones.

## Files

```
prismic-article/
├── .claude-plugin/plugin.json        # plugin manifest
├── .env.example                       # template for required env vars
├── README.md                          # this file
└── skills/
    └── create-prismic-article/
        ├── SKILL.md                   # tells Claude when and how to use the skill
        ├── references/
        │   └── payload-example.json   # complete payload reference
        └── scripts/
            └── create-article.mjs     # the worker script (Node 20+, zero deps)
```
