import { App, TFile, TFolder, normalizePath } from 'obsidian';
import { PreviewModal, PreviewItem } from '../modals/preview-modal';
import { ProgressModal } from '../modals/progress-modal';
import { LanguageManager } from '../lang/LanguageManager';
import { TransformerSettings } from '../types/transformer-types';

export interface SearchReplaceResult {
	file: TFile;
	oldValue: string | string[];
	newValue: string | string[] | null;
}

export class SearchReplaceExecutor {
	private app: App;
	private languageManager: LanguageManager;
	private settings: TransformerSettings;

	constructor(app: App, languageManager: LanguageManager, settings: TransformerSettings) {
		this.app = app;
		this.languageManager = languageManager;
		this.settings = settings;
	}

	/**
	 * Get target files based on targetFolder setting
	 */
	private getTargetFiles(): TFile[] {
		const folderPath = this.settings.targetFolder.trim();

		if (!folderPath) {
			return this.app.vault.getMarkdownFiles();
		}

		const normalizedPath = normalizePath(folderPath);
		const folder = this.app.vault.getAbstractFileByPath(normalizedPath);

		if (!folder) {
			return [];
		}

		if (folder instanceof TFile) {
			return folder.extension === 'md' ? [folder] : [];
		}

		if (folder instanceof TFolder) {
			const getAllFiles = (currentFolder: TFolder): TFile[] => {
				const result: TFile[] = [];

				for (const child of currentFolder.children) {
					if (child instanceof TFile && child.extension === 'md') {
						result.push(child);
					} else if (child instanceof TFolder) {
						result.push(...getAllFiles(child));
					}
				}

				return result;
			};

			return getAllFiles(folder);
		}

		return [];
	}

	/**
	 * Scan vault for files containing the search value in the specified property
	 */
	scanForMatches(propertyName: string, searchValue: string): SearchReplaceResult[] {
		const results: SearchReplaceResult[] = [];
		const files = this.getTargetFiles();

		for (const file of files) {
			const cache = this.app.metadataCache.getFileCache(file);
			const fm = cache?.frontmatter;
			if (!fm || !(propertyName in fm)) continue;

			const value = fm[propertyName];

			// Check if value matches (handle arrays and strings)
			if (Array.isArray(value)) {
				if (value.includes(searchValue)) {
					const newArray = value.map(v => v === searchValue ? null : v); // null = to be replaced
					results.push({ file, oldValue: value, newValue: newArray });
				}
			} else if (value === searchValue) {
				results.push({ file, oldValue: value, newValue: null }); // null = to be replaced
			}
		}

		return results;
	}

	/**
	 * Execute search and replace with preview
	 */
	async executeWithPreview(
		propertyName: string,
		searchValue: string,
		replaceValue: string
	): Promise<number> {
		const matches = this.scanForMatches(propertyName, searchValue);

		if (matches.length === 0) {
			return 0;
		}

		// Build preview items
		const items: PreviewItem[] = matches.map(match => {
			let detail: string;
			if (Array.isArray(match.oldValue)) {
				const newArr = match.oldValue.map(v =>
					v === searchValue ? (replaceValue || '∅') : v
				).filter(v => v !== '∅' || replaceValue);
				detail = `[${match.oldValue.join(', ')}] → [${replaceValue ? newArr.join(', ') : newArr.filter(v => v !== searchValue).join(', ')}]`;
			} else {
				detail = `"${searchValue}" → "${replaceValue || '(deleted)'}"`;
			}
			return {
				filePath: match.file.path,
				fileName: match.file.basename,
				detail
			};
		});

		return new Promise((resolve) => {
			const title = `Replace "${searchValue}" with "${replaceValue || '(delete)'}" in "${propertyName}"`;

			new PreviewModal(this.app, {
				title,
				items,
				confirmLabel: `Replace in ${matches.length} file(s)`,
				onConfirm: () => {
					void (async () => {
						const count = await this.executeReplace(propertyName, searchValue, replaceValue, matches);
						resolve(count);
					})();
				}
			}).open();
		});
	}

	/**
	 * Execute the actual replacement
	 */
	private async executeReplace(
		propertyName: string,
		searchValue: string,
		replaceValue: string,
		matches: SearchReplaceResult[]
	): Promise<number> {
		const progressTitle = `Replacing "${searchValue}"...`;

		const progress = new ProgressModal(this.app, progressTitle);
		progress.open();

		let count = 0;
		for (const match of matches) {
			await this.app.fileManager.processFrontMatter(match.file, (fm: Record<string, unknown>) => {
				const currentValue = fm[propertyName];

				if (Array.isArray(currentValue)) {
					if (replaceValue) {
						// Replace value in array
						fm[propertyName] = currentValue.map(v =>
							v === searchValue ? replaceValue : v
						);
					} else {
						// Remove value from array
						fm[propertyName] = currentValue.filter(v => v !== searchValue);
						// If array is empty, remove property
						if (fm[propertyName].length === 0) {
							delete fm[propertyName];
						}
					}
				} else {
					if (replaceValue) {
						// Replace single value
						fm[propertyName] = replaceValue;
					} else {
						// Delete property
						delete fm[propertyName];
					}
				}
			});

			count++;
			progress.setProgress(count, matches.length);

			if (count % 50 === 0) {
				await new Promise(r => setTimeout(r, 0));
			}
		}

		progress.finish(`Done: ${count} file(s) modified.`);

		return count;
	}
}
