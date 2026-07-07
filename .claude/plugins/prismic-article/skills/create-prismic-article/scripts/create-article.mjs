#!/usr/bin/env node
// Create a draft article in Prismic CMS via the Migration + Asset REST APIs.
// Reads a JSON payload from --payload <path> or stdin. Requires Node 20+.
//
// Required env: PRISMIC_WRITE_TOKEN, PRISMIC_REPOSITORY
// Loads .env from CWD if present (no dotenv dependency).
//
// Payload shape (all fields except `type`, `uid`, `data.title`, `data.featured_image` optional):
// {
//   "type": "article",
//   "uid": "my-article-slug",
//   "lang": "en-us",
//   "title": "Draft Article Title (admin label)",
//   "data": {
//     "title": "My Article Title",
//     "date": "2026-05-27",
//     "category": "News",
//     "author": "Eric Kong",
//     "featured_image": { "file": "/abs/path/to/image.jpg", "alt": "..." },
//     "content": [
//       { "type": "heading2", "text": "A heading" },
//       { "type": "paragraph", "text": "Some text." }
//     ],
//     "meta_title": "...",
//     "meta_description": "...",
//     "schema": ""
//   }
// }

import { readFile } from 'node:fs/promises';
import { resolve, basename } from 'node:path';
import { existsSync, readFileSync } from 'node:fs';

const ASSET_API = 'https://asset-api.prismic.io/assets';
const MIGRATION_API = 'https://migration.prismic.io/documents';

function loadDotenv(cwd = process.cwd()) {
	const envPath = resolve(cwd, '.env');
	if (!existsSync(envPath)) return;
	const raw = readFileSync(envPath, 'utf8');
	for (const line of raw.split('\n')) {
		const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
		if (!m) continue;
		const [, key, valueRaw] = m;
		if (process.env[key] !== undefined) continue;
		let value = valueRaw.trim();
		if (
			(value.startsWith('"') && value.endsWith('"')) ||
			(value.startsWith("'") && value.endsWith("'"))
		) {
			value = value.slice(1, -1);
		}
		process.env[key] = value;
	}
}

function parseArgs(argv) {
	const args = { payload: null, dryRun: false };
	for (let i = 2; i < argv.length; i++) {
		const a = argv[i];
		if (a === '--payload' || a === '-p') args.payload = argv[++i];
		else if (a === '--dry-run') args.dryRun = true;
		else if (a === '--help' || a === '-h') {
			console.log(
				'Usage: node create-article.mjs --payload <file.json> [--dry-run]\n' +
					'       cat payload.json | node create-article.mjs'
			);
			process.exit(0);
		}
	}
	return args;
}

async function readStdin() {
	return new Promise((res, rej) => {
		let buf = '';
		process.stdin.setEncoding('utf8');
		process.stdin.on('data', (c) => (buf += c));
		process.stdin.on('end', () => res(buf));
		process.stdin.on('error', rej);
	});
}

function normalizeBlock(block) {
	const out = {
		type: block.type,
		text: block.text ?? '',
		spans: Array.isArray(block.spans) ? block.spans : []
	};
	if (block.direction) out.direction = block.direction;
	return out;
}

function normalizeContent(content) {
	if (!content) return [];
	if (typeof content === 'string') {
		return content
			.split(/\n{2,}/)
			.map((t) => t.trim())
			.filter(Boolean)
			.map((text) => ({ type: 'paragraph', text, spans: [] }));
	}
	if (!Array.isArray(content)) {
		throw new Error('data.content must be an array of rich-text blocks or a string');
	}
	return content.map(normalizeBlock);
}

async function uploadAsset({ token, repository, file, alt }) {
	const abs = resolve(file);
	if (!existsSync(abs)) throw new Error(`Featured image not found: ${abs}`);
	const buf = await readFile(abs);
	const name = basename(abs);
	const blob = new Blob([buf]);
	const form = new FormData();
	form.append('file', blob, name);
	if (alt) form.append('alt', alt.slice(0, 500));

	const res = await fetch(ASSET_API, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
			repository,
			Accept: 'application/json'
			// NOTE: do NOT set Content-Type; fetch sets the multipart boundary automatically.
		},
		body: form
	});
	if (!res.ok) {
		const body = await res.text();
		throw new Error(`Asset upload failed (${res.status}): ${body}`);
	}
	return res.json();
}

async function createDocument({ token, repository, body }) {
	const res = await fetch(MIGRATION_API, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
			repository,
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(`Document create failed (${res.status}): ${text}`);
	}
	return res.json();
}

async function main() {
	loadDotenv();
	const args = parseArgs(process.argv);

	const token = process.env.PRISMIC_WRITE_TOKEN;
	const repository = process.env.PRISMIC_REPOSITORY;
	if (!token) throw new Error('PRISMIC_WRITE_TOKEN is not set (env or .env file).');
	if (!repository) throw new Error('PRISMIC_REPOSITORY is not set (env or .env file).');

	const raw = args.payload ? await readFile(args.payload, 'utf8') : await readStdin();
	if (!raw.trim()) throw new Error('No payload provided (use --payload or pipe JSON to stdin).');
	const payload = JSON.parse(raw);

	if (!payload.type) throw new Error('payload.type is required (e.g. "article").');
	if (!payload.uid) throw new Error('payload.uid is required (URL slug).');
	if (!payload.data) throw new Error('payload.data is required.');

	const data = { ...payload.data };
	const adminTitle = payload.title || data.title || payload.uid;

	const featured = data.featured_image;
	if (!featured || !featured.file) {
		throw new Error('data.featured_image.file is required (absolute path to local image).');
	}

	if (args.dryRun) {
		console.log(JSON.stringify({ wouldUpload: featured, payload }, null, 2));
		return;
	}

	console.error(`Uploading featured image: ${featured.file}`);
	const asset = await uploadAsset({
		token,
		repository,
		file: featured.file,
		alt: featured.alt
	});
	console.error(`  -> asset id ${asset.id}`);

	data.featured_image = { id: asset.id };
	if (featured.alt) data.featured_image.alt = featured.alt;

	if (data.content !== undefined) data.content = normalizeContent(data.content);
	if (!data.slices) data.slices = [];

	const body = {
		title: adminTitle,
		type: payload.type,
		uid: payload.uid,
		lang: payload.lang || 'en-us',
		data
	};

	console.error(`Creating draft document: ${payload.type}/${payload.uid}`);
	const doc = await createDocument({ token, repository, body });
	console.log(JSON.stringify({ ok: true, document: doc, asset: { id: asset.id, url: asset.url } }, null, 2));
}

main().catch((err) => {
	console.error('ERROR:', err.message);
	process.exit(1);
});
