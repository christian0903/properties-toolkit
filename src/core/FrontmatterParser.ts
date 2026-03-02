import { TagInfo, ParsedContent } from '../types/transformer-types';

export class FrontmatterParser {

	/**
	 * Parse file content to extract frontmatter, metadata and tags
	 */
	parseFrontmatter(content: string): ParsedContent {
		const frontmatterRegex = /^---\s*\n(.*?)\n---\s*\n?(.*?)$/s;
		const match = content.match(frontmatterRegex);

		const metadata: Record<string, string | string[]> = {};
		let frontmatterText = '';
		let body = '';
		let yamlTags: string[] = [];
		let inlineTags: TagInfo[] = [];

		if (match) {
			frontmatterText = match[1];
			body = match[2];

			const lines = frontmatterText.split('\n');
			let i = 0;

			while (i < lines.length) {
				const line = lines[i];
				const trimmedLine = line.trim();

				if (!trimmedLine || trimmedLine.startsWith('#')) {
					i++;
					continue;
				}

				const colonIndex = trimmedLine.indexOf(':');
				if (colonIndex === -1) {
					i++;
					continue;
				}

				const key = trimmedLine.substring(0, colonIndex).trim();
				const value = trimmedLine.substring(colonIndex + 1).trim();

				if (!key) {
					i++;
					continue;
				}

				if (key === 'tags') {
					if (value) {
						// Tags sur une ligne : tags: [tag1, tag2] ou tags: "tag1"
						if (value.startsWith('[') && value.endsWith(']')) {
							const tagContent = value.slice(1, -1);
							const tags = tagContent
								.split(',')
								.map(t => t.trim().replace(/^["']|["']$/g, ''))
								.filter(t => t.length > 0);
							metadata[key] = tags;
							yamlTags = tags;
						} else {
							const tag = value.replace(/^["']|["']$/g, '');
							metadata[key] = [tag];
							yamlTags = [tag];
						}
					} else {
						// Tags multilignes : tags:\n  - tag1\n  - tag2
						const arrayItems: string[] = [];
						i++;
						while (i < lines.length) {
							const nextLine = lines[i];
							const trimmed = nextLine.trim();
							if (trimmed.startsWith('- ')) {
								const item = trimmed.substring(2).trim().replace(/^["']|["']$/g, '');
								if (item) arrayItems.push(item);
								i++;
							} else if (nextLine.startsWith('  ') && !trimmed.startsWith('- ')) {
								// Ligne de continuation, ignorer pour l'instant
								i++;
							} else {
								// New property or end of items
								break;
							}
						}
						metadata[key] = arrayItems;
						yamlTags = arrayItems;
						continue; // i has already been incremented
					}
				} else {
					// Other properties
					if (value) {
						// Property on a single line
						if (value.startsWith('[') && value.endsWith(']')) {
							const arrayContent = value.slice(1, -1);
							const arrayValues = arrayContent
								.split(',')
								.map(v => v.trim().replace(/^["']|["']$/g, ''))
								.filter(v => v.length > 0);
							metadata[key] = arrayValues;
						} else {
							metadata[key] = value.replace(/^["']|["']$/g, '');
						}
					} else {
						// Multiline property
						const arrayItems: string[] = [];
						i++;
						while (i < lines.length) {
							const nextLine = lines[i];
							const trimmed = nextLine.trim();
							if (trimmed.startsWith('- ')) {
								const item = trimmed.substring(2).trim().replace(/^["']|["']$/g, '');
								if (item) arrayItems.push(item);
								i++;
							} else if (nextLine.startsWith('  ') && !trimmed.startsWith('- ')) {
								// Ligne de continuation, ignorer pour l'instant
								i++;
							} else {
								// New property or end of items
								break;
							}
						}
						if (arrayItems.length > 0) {
							metadata[key] = arrayItems;
						}
						continue; // i has already been incremented
					}
				}

				i++;
			}
		} else {
			body = content;
		}

		// Extraction des tags inline du contenu
		const tagRegex = /#([a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*)/g;
		let tagMatch;
		const foundInlineTags: Set<string> = new Set();

		while ((tagMatch = tagRegex.exec(body)) !== null) {
			const tag = tagMatch[1];
			if (!foundInlineTags.has(tag)) {
				foundInlineTags.add(tag);
				inlineTags.push({
					tag: tag,
					location: 'content'
				});
			}
		}

		return { metadata, frontmatter: frontmatterText, body, yamlTags, inlineTags };
	}

	/**
	 * Rebuild content with modified metadata
	 */
	rebuildContent(metadata: Record<string, string | string[] | number | boolean | null | undefined>, body: string, tagsToRemoveFromContent: string[] = [], tagsInYamlZone: boolean = true): string {
		// Remove tags from content if necessary
		if (tagsToRemoveFromContent.length > 0) {
			for (const tagToRemove of tagsToRemoveFromContent) {
				const tagWithHash = '#' + tagToRemove;
				body = body.replace(new RegExp(tagWithHash + '(?=\\s|$)', 'g'), '');
				body = body.replace(new RegExp(tagToRemove + '(?=\\s|$)', 'g'), '');
				body = body.replace(/\s+/g, ' ');
				const lines = body.split('\n').filter(line => line.trim().length > 0);
				body = lines.join('\n');
			}
		}

		let frontmatterContent = '';
		let tagsToAddInline: string[] = [];
		let hasFrontmatterProperties = false;

		for (const [key, value] of Object.entries(metadata)) {
			if (value === undefined || value === null) {
				continue;
			}

			if (key === 'tags' && Array.isArray(value)) {
				if (value.length > 0) {
					if (tagsInYamlZone) {
						const formattedTags = value.map(tag => '"' + tag + '"').join(', ');
						frontmatterContent += key + ': [' + formattedTags + ']\n';
						hasFrontmatterProperties = true;
					} else {
						tagsToAddInline = value;
					}
				}
			} else if (Array.isArray(value)) {
				// Handle list properties with multiline YAML syntax
				if (value.length > 0) {
					frontmatterContent += key + ':\n';
					for (const item of value) {
						const escapedItem = item.toString().replace(/"/g, '\\"');
						frontmatterContent += '  - ' + escapedItem + '\n';
					}
					hasFrontmatterProperties = true;
				}
			} else if (typeof value === 'string' && value.length > 0) {
				const escapedValue = value.replace(/"/g, '\\"');
				frontmatterContent += key + ': "' + escapedValue + '"\n';
				hasFrontmatterProperties = true;
			} else if (typeof value === 'number' || typeof value === 'boolean') {
				frontmatterContent += key + ': ' + value + '\n';
				hasFrontmatterProperties = true;
			}
		}

		// Add inline tags if necessary
		if (tagsToAddInline.length > 0 && !tagsInYamlZone) {
			const inlineTags = tagsToAddInline.map(tag => '#' + tag).join(' ');
			body = body.trim();

			if (body.length > 0) {
				body = inlineTags + '\n\n' + body;
			} else {
				body = inlineTags;
			}
		}

		// Construire le contenu final
		if (hasFrontmatterProperties) {
			const frontmatter = '---\n' + frontmatterContent + '---\n';
			if (body.trim().length > 0) {
				return frontmatter + '\n' + body;
			} else {
				return frontmatter;
			}
		} else {
			if (body.trim().length > 0) {
				return body;
			} else {
				return '';
			}
		}
	}
}
