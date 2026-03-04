import { Notice } from 'obsidian';
import { TransformerSettings, ModificationLog, TagInfo } from '../types/transformer-types';
import { LanguageManager } from '../lang/LanguageManager';
import { FrontmatterParser } from './FrontmatterParser';
import { FileManager } from './FileManager';

export class PropertyTransformer {
	private settings: TransformerSettings;
	private languageManager: LanguageManager;
	private frontmatterParser: FrontmatterParser;
	private fileManager: FileManager;
	private modificationLogs: ModificationLog[] = [];

	constructor(
		settings: TransformerSettings,
		languageManager: LanguageManager,
		frontmatterParser: FrontmatterParser,
		fileManager: FileManager
	) {
		this.settings = settings;
		this.languageManager = languageManager;
		this.frontmatterParser = frontmatterParser;
		this.fileManager = fileManager;
	}

	/**
	 * Convert YAML properties to tags
	 */
	async transposePropertiesToTags(): Promise<ModificationLog[]> {
		const files = this.fileManager.getTargetFiles();
		const propertyList = this.fileManager.getPropertyList();
		let modifiedCount = 0;
		this.modificationLogs = [];

		for (const file of files) {
			const content = await this.fileManager.readFile(file);
			const { metadata, body } = this.frontmatterParser.parseFrontmatter(content);
			let modified = false;
			const log: ModificationLog = {
				fileName: file.path,
				command: this.languageManager.command('transpose-properties-to-tags'),
				changes: []
			};

			for (const propName of propertyList) {
				if (metadata[propName]) {
					const propValue = metadata[propName];

					// Handle list properties
					const valuesToProcess = Array.isArray(propValue) ? propValue : [propValue];

					const existingTags = (metadata.tags || []) as string[];
					let updatedTags = [...existingTags];

					// If overwrite is true, remove all existing tags starting with propName/
					if (this.settings.overwrite) {
						const oldTags = updatedTags.filter((tag: string) => tag.startsWith(propName + '/'));
						updatedTags = updatedTags.filter((tag: string) => !tag.startsWith(propName + '/'));

						if (oldTags.length > 0) {
							log.changes.push({
								type: 'tag',
								action: 'removed',
								before: oldTags.join(', '),
								after: ''
							});
						}
					}

					// Create new tags
					const newTags: string[] = [];
					for (const singleValue of valuesToProcess) {
						const newTag = propName + '/' + singleValue;

						// Add tag if it doesn't already exist
						if (!updatedTags.includes(newTag)) {
							updatedTags.push(newTag);
							newTags.push(newTag);
							modified = true;
						}
					}

					// Log new tags added
					if (newTags.length > 0) {
						log.changes.push({
							type: 'tag',
							action: 'added',
							before: '',
							after: newTags.join(', ')
						});
					}

					// Update tags
					metadata.tags = updatedTags;

					if (this.settings.removeSourceAfterTransform) {
						log.changes.push({
							type: 'property',
							action: 'removed',
							before: propName + ': ' + (Array.isArray(propValue) ? '[' + propValue.join(', ') + ']' : propValue),
							after: ''
						});
						delete metadata[propName];
						modified = true;
					}
				}
			}

			if (modified) {
				const newContent = this.frontmatterParser.rebuildContent(metadata, body, [], this.settings.tagsInYamlZone);
				await this.fileManager.writeFile(file, newContent);
				modifiedCount++;
				if (log.changes.length > 0) {
					this.modificationLogs.push(log);
				}
			}
		}

		new Notice(modifiedCount + ' ' + this.languageManager.notice('files-modified'));
		return this.modificationLogs;
	}

	/**
	 * Convert tags to YAML properties
	 */
	async transposeTagsToProperties(): Promise<ModificationLog[]> {
		const files = this.fileManager.getTargetFiles();
		const propertyList = this.fileManager.getPropertyList();
		let modifiedCount = 0;
		this.modificationLogs = [];

		for (const file of files) {
			const content = await this.fileManager.readFile(file);
			const { metadata, body, yamlTags, inlineTags } = this.frontmatterParser.parseFrontmatter(content);
			let modified = false;
			const log: ModificationLog = {
				fileName: file.path,
				command: this.languageManager.command('transpose-tags-to-properties'),
				changes: []
			};

			let tagsToSearch: TagInfo[] = [];

			if (this.settings.tagSearchLocation === 'yaml' || this.settings.tagSearchLocation === 'both') {
				tagsToSearch.push(...yamlTags.map(tag => ({ tag, location: 'yaml' as const })));
			}

			if (this.settings.tagSearchLocation === 'content' || this.settings.tagSearchLocation === 'both') {
				tagsToSearch.push(...inlineTags);
			}

			const tagsToRemoveFromYaml: string[] = [];
			const tagsToRemoveFromContent: string[] = [];

			for (const propName of propertyList) {
				const relevantTagInfos = tagsToSearch.filter((tagInfo: TagInfo) =>
					tagInfo.tag.startsWith(propName + '/')
				);

				if (relevantTagInfos.length > 0) {
					const propValues = relevantTagInfos.map(tagInfo => tagInfo.tag.split('/')[1]);

					// Process if property doesn't exist, or if appendToExistingProperty is true, or if overwrite is true
					if (!metadata[propName] || this.settings.appendToExistingProperty || this.settings.overwrite) {
						const oldValue = metadata[propName];

						// New behavior with appendToExistingProperty
						if (oldValue && this.settings.appendToExistingProperty && !this.settings.overwrite) {
							// Append mode: transform to list and add values
							if (Array.isArray(oldValue)) {
								// Already a list, add new values if not already present
								const newValues = propValues.filter(val => !oldValue.includes(val));
								if (newValues.length > 0) {
									metadata[propName] = [...oldValue, ...newValues];
									modified = true;
									log.changes.push({
										type: 'property',
										action: 'modified',
										before: propName + ': [' + oldValue.join(', ') + ']',
										after: propName + ': [' + [...oldValue, ...newValues].join(', ') + ']'
									});
								}
							} else {
								// String, transform to list with all new values
								metadata[propName] = [oldValue as string, ...propValues];
								modified = true;
								log.changes.push({
									type: 'property',
									action: 'modified',
									before: propName + ': ' + oldValue,
									after: propName + ': [' + [oldValue, ...propValues].join(', ') + ']'
								});
							}
						} else {
							// Standard behavior: replace with all values
							if (propValues.length === 1) {
								metadata[propName] = propValues[0];
							} else {
								metadata[propName] = propValues;
							}
							modified = true;
							log.changes.push({
								type: 'property',
								action: oldValue ? 'modified' : 'added',
								before: Array.isArray(oldValue) ? propName + ': [' + oldValue.join(', ') + ']' : (oldValue ? propName + ': ' + oldValue : ''),
								after: propValues.length === 1 ? propName + ': ' + propValues[0] : propName + ': [' + propValues.join(', ') + ']'
							});
						}

						if (this.settings.removeSourceAfterTransform) {
							for (const relevantTagInfo of relevantTagInfos) {
								if (relevantTagInfo.location === 'yaml') {
									tagsToRemoveFromYaml.push(relevantTagInfo.tag);
								} else {
									tagsToRemoveFromContent.push(relevantTagInfo.tag);
								}

								log.changes.push({
									type: 'tag',
									action: 'removed',
									before: relevantTagInfo.tag,
									after: '',
									location: relevantTagInfo.location
								});
							}
						}
					}
				}
			}

			if (tagsToRemoveFromYaml.length > 0) {
				const currentYamlTags = (metadata.tags || []) as string[];
				metadata.tags = currentYamlTags.filter(tag => !tagsToRemoveFromYaml.includes(tag));
			}

			if (modified) {
				const newContent = this.frontmatterParser.rebuildContent(metadata, body, tagsToRemoveFromContent, this.settings.tagsInYamlZone);
				await this.fileManager.writeFile(file, newContent);
				modifiedCount++;
				if (log.changes.length > 0) {
					this.modificationLogs.push(log);
				}
			}
		}

		new Notice(modifiedCount + ' ' + this.languageManager.notice('files-modified'));
		return this.modificationLogs;
	}

	/**
	 * Remove properties corresponding to existing tags
	 */
	async removeCorrespondingProperties(): Promise<ModificationLog[]> {
		const files = this.fileManager.getTargetFiles();
		const propertyList = this.fileManager.getPropertyList();
		let modifiedCount = 0;
		this.modificationLogs = [];

		for (const file of files) {
			const content = await this.fileManager.readFile(file);
			const { metadata, body, yamlTags, inlineTags } = this.frontmatterParser.parseFrontmatter(content);
			let modified = false;
			const log: ModificationLog = {
				fileName: file.path,
				command: this.languageManager.command('remove-properties'),
				changes: []
			};

			let allTags: string[] = [];
			if (this.settings.tagSearchLocation === 'yaml' || this.settings.tagSearchLocation === 'both') {
				allTags.push(...yamlTags);
			}
			if (this.settings.tagSearchLocation === 'content' || this.settings.tagSearchLocation === 'both') {
				allTags.push(...inlineTags.map(t => t.tag));
			}

			for (const propName of propertyList) {
				if (metadata[propName]) {
					const propValue = metadata[propName];
					const correspondingTag = propName + '/' + String(propValue);

					if (allTags.includes(correspondingTag)) {
						log.changes.push({
							type: 'property',
							action: 'removed',
							before: propName + ': ' + String(propValue),
							after: ''
						});

						delete metadata[propName];
						modified = true;
					}
				}
			}

			if (modified) {
				const newContent = this.frontmatterParser.rebuildContent(metadata, body, [], this.settings.tagsInYamlZone);
				await this.fileManager.writeFile(file, newContent);
				modifiedCount++;
				if (log.changes.length > 0) {
					this.modificationLogs.push(log);
				}
			}
		}

		new Notice(modifiedCount + ' ' + this.languageManager.notice('files-modified'));
		return this.modificationLogs;
	}

	/**
	 * Remove tags corresponding to existing properties
	 */
	async removeCorrespondingTags(): Promise<ModificationLog[]> {
		const files = this.fileManager.getTargetFiles();
		const propertyList = this.fileManager.getPropertyList();
		let modifiedCount = 0;
		this.modificationLogs = [];

		for (const file of files) {
			const content = await this.fileManager.readFile(file);
			const { metadata, body, yamlTags, inlineTags } = this.frontmatterParser.parseFrontmatter(content);
			let modified = false;
			const log: ModificationLog = {
				fileName: file.path,
				command: this.languageManager.command('remove-tags'),
				changes: []
			};

			const tagsToRemoveFromYaml: string[] = [];
			const tagsToRemoveFromContent: string[] = [];

			for (const propName of propertyList) {
				if (metadata[propName]) {
					const propValue = metadata[propName];
					const correspondingTag = propName + '/' + String(propValue);

					if ((this.settings.tagSearchLocation === 'yaml' || this.settings.tagSearchLocation === 'both')
						&& yamlTags.includes(correspondingTag)) {
						tagsToRemoveFromYaml.push(correspondingTag);
						log.changes.push({
							type: 'tag',
							action: 'removed',
							before: correspondingTag,
							after: '',
							location: 'yaml'
						});
						modified = true;
					}

					if ((this.settings.tagSearchLocation === 'content' || this.settings.tagSearchLocation === 'both')
						&& inlineTags.some(t => t.tag === correspondingTag)) {
						tagsToRemoveFromContent.push(correspondingTag);
						log.changes.push({
							type: 'tag',
							action: 'removed',
							before: correspondingTag,
							after: '',
							location: 'content'
						});
						modified = true;
					}
				}
			}

			if (tagsToRemoveFromYaml.length > 0) {
				const currentYamlTags = (metadata.tags || []) as string[];
				metadata.tags = currentYamlTags.filter(tag => !tagsToRemoveFromYaml.includes(tag));
			}

			if (modified) {
				const newContent = this.frontmatterParser.rebuildContent(metadata, body, tagsToRemoveFromContent, this.settings.tagsInYamlZone);
				await this.fileManager.writeFile(file, newContent);
				modifiedCount++;
				if (log.changes.length > 0) {
					this.modificationLogs.push(log);
				}
			}
		}

		new Notice(modifiedCount + ' ' + this.languageManager.notice('files-modified'));
		return this.modificationLogs;
	}

	/**
	 * Update settings
	 */
	updateSettings(newSettings: TransformerSettings): void {
		this.settings = newSettings;
		this.fileManager.updateSettings(newSettings);
	}

	/**
	 * Get modification logs
	 */
	getModificationLogs(): ModificationLog[] {
		return this.modificationLogs;
	}

	/**
	 * Clear modification logs
	 */
	clearModificationLogs(): void {
		this.modificationLogs = [];
	}
}
