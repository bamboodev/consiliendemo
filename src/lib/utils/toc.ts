import type { RichTextField } from '@prismicio/client';
import type { HTMLFunctionSerializer } from '@prismicio/helpers';
import { generateSlug } from './slug';

export interface TocEntry {
	id: string;
	text: string;
}

/**
 * Builds table-of-contents entries from the heading2 nodes of a rich text
 * field, with de-duplicated slug ids.
 */
export function extractToc(content: RichTextField): TocEntry[] {
	const used = new Map<string, number>();

	return content
		.filter((node) => node.type === 'heading2')
		.map((node) => {
			const text = 'text' in node ? node.text : '';
			const base = generateSlug(text) || 'section';
			const count = used.get(base) ?? 0;
			used.set(base, count + 1);
			return { id: count === 0 ? base : `${base}-${count}`, text };
		});
}

/**
 * HTML serializer that stamps each heading2 with the matching TocEntry id.
 * Stateful: create one instance per render pass so ids follow document order.
 */
export function createHeadingSerializer(entries: TocEntry[]): HTMLFunctionSerializer {
	let index = 0;

	return (type, _node, _text, children) => {
		if (type === 'heading2') {
			const id = entries[index++]?.id ?? '';
			return `<h2 id="${id}">${children}</h2>`;
		}
		return null;
	};
}
