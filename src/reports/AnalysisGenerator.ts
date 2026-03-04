import { Notice, TFile } from 'obsidian';
import { TransformerSettings } from '../types/transformer-types';
import { LanguageManager } from '../lang/LanguageManager';
import { FrontmatterParser } from '../core/FrontmatterParser';
import { FileManager } from '../core/FileManager';

export class AnalysisGenerator {
	private settings: TransformerSettings;
	private languageManager: LanguageManager;
	private frontmatterParser: FrontmatterParser;
	private fileManager: FileManager;

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
	 * Run property tag analysis based on configured type
	 */
	async analyzePropertyTags(): Promise<void> {
		const files = this.fileManager.getTargetFiles();
		const propertyList = this.fileManager.getPropertyList();

		if (propertyList.length === 0) {
			new Notice(this.languageManager.notice('no-properties'));
			return;
		}

		const analysisDate = new Date().toISOString().split('T')[0];
		const baseName = this.settings.analysisFileName || 'properties-analysis';
		const analysisFileName = baseName + '-' + analysisDate + '.md';

		if (this.settings.analysisType === 'by-property') {
			await this.generatePropertyBasedAnalysis(files, propertyList, analysisFileName);
		} else {
			await this.generateFileBasedAnalysis(files, propertyList, analysisFileName);
		}
	}

	/**
	 * Generate analysis organized by property
	 */
	async generatePropertyBasedAnalysis(files: TFile[], propertyList: string[], analysisFileName: string): Promise<void> {
		let analysisContent = '# ' + this.languageManager.analysis('by-property-title') + ' - ' + new Date().toISOString().split('T')[0] + '\n\n';

		const results: {
			[property: string]: {
				[value: string]: {
					[location: string]: string[]
				}
			}
		} = {};

		let filesWithPropertyTags: string[] = [];
		let totalTagsFound = 0;

		for (const file of files) {
			const content = await this.fileManager.readFile(file);
			const { metadata, yamlTags, inlineTags } = this.frontmatterParser.parseFrontmatter(content);

			let fileHasPropertyTags = false;

			for (const tag of yamlTags) {
				for (const propName of propertyList) {
					if (tag.startsWith(propName + '/')) {
						const propValue = tag.split('/').slice(1).join('/');

						if (!results[propName]) results[propName] = {};
						if (!results[propName][propValue]) results[propName][propValue] = {};
						if (!results[propName][propValue]['yaml']) results[propName][propValue]['yaml'] = [];

						results[propName][propValue]['yaml'].push(file.path);
						fileHasPropertyTags = true;
						totalTagsFound++;
					}
				}
			}

			for (const tagInfo of inlineTags) {
				for (const propName of propertyList) {
					if (tagInfo.tag.startsWith(propName + '/')) {
						const propValue = tagInfo.tag.split('/').slice(1).join('/');

						if (!results[propName]) results[propName] = {};
						if (!results[propName][propValue]) results[propName][propValue] = {};
						if (!results[propName][propValue]['content']) results[propName][propValue]['content'] = [];

						results[propName][propValue]['content'].push(file.path);
						fileHasPropertyTags = true;
						totalTagsFound++;
					}
				}
			}

			for (const propName of propertyList) {
				if (metadata[propName]) {
					fileHasPropertyTags = true;
				}
			}

			if (fileHasPropertyTags && !filesWithPropertyTags.includes(file.path)) {
				filesWithPropertyTags.push(file.path);
			}
		}

		analysisContent += '## ' + this.languageManager.analysis('results-summary') + '\n\n';
		analysisContent += '- **' + this.languageManager.analysis('files-with-tags') + '**: ' + filesWithPropertyTags.length + '\n';
		analysisContent += '- **' + this.languageManager.analysis('total-tags-found') + '**: ' + totalTagsFound + '\n\n';

		if (Object.keys(results).length > 0) {
			analysisContent += '## ' + this.languageManager.analysis('overview-by-property') + '\n\n';

			for (const [propName, values] of Object.entries(results)) {
				analysisContent += '### ' + this.languageManager.analysis('property') + ': ' + propName + '\n\n';

				for (const [value, locations] of Object.entries(values)) {
					analysisContent += '#### `' + propName + '/' + value + '`\n\n';

					if (locations['yaml'] && locations['yaml'].length > 0) {
						analysisContent += '**' + this.languageManager.analysis('in-yaml') + '** (' + locations['yaml'].length + ' ' + this.languageManager.analysis('files') + '):\n';
						for (const filePath of locations['yaml'].sort()) {
							analysisContent += '- [[' + filePath.replace('.md', '') + ']]\n';
						}
						analysisContent += '\n';
					}

					if (locations['content'] && locations['content'].length > 0) {
						analysisContent += '**' + this.languageManager.analysis('in-content') + '** (' + locations['content'].length + ' ' + this.languageManager.analysis('files') + '):\n';
						for (const filePath of locations['content'].sort()) {
							analysisContent += '- [[' + filePath.replace('.md', '') + ']]\n';
						}
						analysisContent += '\n';
					}
				}

				analysisContent += '---\n\n';
			}
		}

		try {
			await this.fileManager.createFile(analysisFileName, analysisContent);
			new Notice(this.languageManager.notice('analysis-generated', {
				type: this.languageManager.analysis('by-property-title'),
				filename: analysisFileName
			}));
		} catch (error) {
			new Notice(this.languageManager.notice('analysis-error'));
			console.error(error);
		}
	}

	/**
	 * Generate detailed analysis organized by file
	 */
	async generateFileBasedAnalysis(files: TFile[], propertyList: string[], analysisFileName: string): Promise<void> {
		let analysisContent = '# ' + this.languageManager.analysis('by-file-title') + ' - ' + new Date().toISOString().split('T')[0] + '\n\n';

		const fileAnalysis: {
			[filePath: string]: {
				relevantYamlTags: string[];
				relevantInlineTags: string[];
				relevantProperties: { [key: string]: string };
				wouldCreateProperties: { [key: string]: string };
				wouldCreateYamlTags: string[];
				wouldCreateInlineTags: string[];
				wouldRemoveProperties: string[];
				wouldRemoveYamlTags: string[];
				wouldRemoveInlineTags: string[];
			}
		} = {};

		let filesWithPropertyTags: string[] = [];

		for (const file of files) {
			const content = await this.fileManager.readFile(file);
			const { metadata, yamlTags, inlineTags } = this.frontmatterParser.parseFrontmatter(content);

			let fileHasRelevantContent = false;

			const analysis = {
				relevantYamlTags: [] as string[],
				relevantInlineTags: [] as string[],
				relevantProperties: {} as { [key: string]: string },
				wouldCreateProperties: {} as { [key: string]: string },
				wouldCreateYamlTags: [] as string[],
				wouldCreateInlineTags: [] as string[],
				wouldRemoveProperties: [] as string[],
				wouldRemoveYamlTags: [] as string[],
				wouldRemoveInlineTags: [] as string[]
			};

			// Analyze YAML tags
			for (const tag of yamlTags) {
				for (const propName of propertyList) {
					if (tag.startsWith(propName + '/')) {
						const propValue = tag.split('/').slice(1).join('/');
						analysis.relevantYamlTags.push(tag);
						fileHasRelevantContent = true;

						if (this.settings.tagSearchLocation === 'yaml' || this.settings.tagSearchLocation === 'both') {
							if (!metadata[propName] || this.settings.overwrite) {
								analysis.wouldCreateProperties[propName] = propValue;

								if (this.settings.removeSourceAfterTransform) {
									analysis.wouldRemoveYamlTags.push(tag);
								}
							}
						}
					}
				}
			}

			// Analyze inline tags
			for (const tagInfo of inlineTags) {
				for (const propName of propertyList) {
					if (tagInfo.tag.startsWith(propName + '/')) {
						const propValue = tagInfo.tag.split('/').slice(1).join('/');
						analysis.relevantInlineTags.push(tagInfo.tag);
						fileHasRelevantContent = true;

						if (this.settings.tagSearchLocation === 'content' || this.settings.tagSearchLocation === 'both') {
							if (!metadata[propName] || this.settings.overwrite) {
								analysis.wouldCreateProperties[propName] = propValue;

								if (this.settings.removeSourceAfterTransform) {
									analysis.wouldRemoveInlineTags.push(tagInfo.tag);
								}
							}
						}
					}
				}
			}

			// Analyze properties
			for (const propName of propertyList) {
				if (metadata[propName]) {
					const propValue = metadata[propName];
					analysis.relevantProperties[propName] = String(propValue);
					fileHasRelevantContent = true;

					const newTag = propName + '/' + String(propValue);
					const existingTags = (metadata.tags || []) as string[];
					const tagExists = existingTags.some(tag => tag.startsWith(propName + '/'));

					if (!tagExists || this.settings.overwrite) {
						if (this.settings.tagsInYamlZone) {
							analysis.wouldCreateYamlTags.push(newTag);
						} else {
							analysis.wouldCreateInlineTags.push(newTag);
						}

						if (this.settings.removeSourceAfterTransform) {
							analysis.wouldRemoveProperties.push(propName);
						}
					}
				}
			}

			if (fileHasRelevantContent) {
				filesWithPropertyTags.push(file.path);
				fileAnalysis[file.path] = analysis;
			}
		}

		analysisContent += '## ' + this.languageManager.analysis('results-summary') + '\n\n';
		analysisContent += '- **' + this.languageManager.analysis('files-with-tags') + '**: ' + filesWithPropertyTags.length + '\n\n';

		if (Object.keys(fileAnalysis).length > 0) {
			analysisContent += '## ' + this.languageManager.analysis('detailed-analysis') + '\n\n';

			for (const [filePath, analysis] of Object.entries(fileAnalysis)) {
				const fileName = filePath.replace('.md', '');
				analysisContent += '### [[' + fileName + ']]\n\n';

				analysisContent += '#### ' + this.languageManager.analysis('current-state') + '\n\n';

				if (Object.keys(analysis.relevantProperties).length > 0) {
					analysisContent += '**' + this.languageManager.analysis('properties-found') + ' :**\n';
					for (const [prop, value] of Object.entries(analysis.relevantProperties)) {
						analysisContent += '- `' + prop + ': "' + value + '"`\n';
					}
					analysisContent += '\n';
				}

				if (analysis.relevantYamlTags.length > 0) {
					analysisContent += '**' + this.languageManager.analysis('yaml-tags-found') + ' :**\n';
					for (const tag of analysis.relevantYamlTags) {
						analysisContent += '- `' + tag + '`\n';
					}
					analysisContent += '\n';
				}

				if (analysis.relevantInlineTags.length > 0) {
					analysisContent += '**' + this.languageManager.analysis('inline-tags-found') + ' :**\n';
					for (const tag of analysis.relevantInlineTags) {
						analysisContent += '- `#' + tag + '`\n';
					}
					analysisContent += '\n';
				}

				const hasTransformations = Object.keys(analysis.wouldCreateProperties).length > 0 ||
					analysis.wouldCreateYamlTags.length > 0 || analysis.wouldCreateInlineTags.length > 0;

				if (hasTransformations) {
					analysisContent += '#### ' + this.languageManager.analysis('possible-transformations') + '\n\n';

					if (Object.keys(analysis.wouldCreateProperties).length > 0) {
						analysisContent += '**' + this.languageManager.analysis('would-create-properties') + ' :**\n';
						for (const [prop, value] of Object.entries(analysis.wouldCreateProperties)) {
							analysisContent += '- `' + prop + ': "' + value + '"`\n';
						}
						analysisContent += '\n';
					}

					if (analysis.wouldCreateYamlTags.length > 0) {
						analysisContent += '**' + this.languageManager.analysis('would-create-yaml-tags') + ' :**\n';
						for (const tag of analysis.wouldCreateYamlTags) {
							analysisContent += '- `' + tag + '`\n';
						}
						analysisContent += '\n';
					}

					if (analysis.wouldCreateInlineTags.length > 0) {
						analysisContent += '**' + this.languageManager.analysis('would-create-inline-tags') + ' :**\n';
						for (const tag of analysis.wouldCreateInlineTags) {
							analysisContent += '- `#' + tag + '`\n';
						}
						analysisContent += '\n';
					}
				}

				if (this.settings.removeSourceAfterTransform) {
					const hasDeletions = analysis.wouldRemoveProperties.length > 0 ||
						analysis.wouldRemoveYamlTags.length > 0 || analysis.wouldRemoveInlineTags.length > 0;

					if (hasDeletions) {
						analysisContent += '#### ' + this.languageManager.analysis('deletions-if-enabled') + '\n\n';

						if (analysis.wouldRemoveProperties.length > 0) {
							analysisContent += '**' + this.languageManager.analysis('properties-would-be-deleted') + ' :**\n';
							for (const prop of analysis.wouldRemoveProperties) {
								const value = analysis.relevantProperties[prop];
								analysisContent += '- `' + prop + ': "' + value + '"`\n';
							}
							analysisContent += '\n';
						}

						if (analysis.wouldRemoveYamlTags.length > 0) {
							analysisContent += '**' + this.languageManager.analysis('yaml-tags-would-be-deleted') + ' :**\n';
							for (const tag of analysis.wouldRemoveYamlTags) {
								analysisContent += '- `' + tag + '`\n';
							}
							analysisContent += '\n';
						}

						if (analysis.wouldRemoveInlineTags.length > 0) {
							analysisContent += '**' + this.languageManager.analysis('inline-tags-would-be-deleted') + ' :**\n';
							for (const tag of analysis.wouldRemoveInlineTags) {
								analysisContent += '- `#' + tag + '`\n';
							}
							analysisContent += '\n';
						}
					}
				}

				analysisContent += '---\n\n';
			}
		}

		try {
			await this.fileManager.createFile(analysisFileName, analysisContent);
			new Notice(this.languageManager.notice('analysis-generated', {
				type: this.languageManager.analysis('by-file-title'),
				filename: analysisFileName
			}));
		} catch (error) {
			new Notice(this.languageManager.notice('analysis-error'));
			console.error(error);
		}
	}

	/**
	 * Update settings
	 */
	updateSettings(newSettings: TransformerSettings): void {
		this.settings = newSettings;
	}
}
