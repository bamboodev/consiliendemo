export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
        .replace(/(^-|-$)/g, '') // Remove leading/trailing hyphens
        .trim();
} 