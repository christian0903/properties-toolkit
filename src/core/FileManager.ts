import { App, TFile, TFolder, normalizePath, Notice } from 'obsidian';
import { TransformerSettings } from '../types/transformer-types';
import { LanguageManager } from '../lang/LanguageManager';

export class FileManager {
	private app: App;
	private settings: TransformerSettings;
	private languageManager: LanguageManager;

	constructor(app: App, settings: TransformerSettings, languageManager: LanguageManager) {
		this.app = app;
		this.settings = settings;
		this.languageManager = languageManager;
	}

	/**
	 * Determine files to process based on targetFolder setting
	 */
	getTargetFiles(): TFile[] {
		const folderPath = this.settings.targetFolder.trim();

		if (!folderPath) {
			return this.app.vault.getMarkdownFiles();
		}

		// Normalize path to avoid slash issues
		const normalizedPath = normalizePath(folderPath);
		const folder = this.app.vault.getAbstractFileByPath(normalizedPath);

		if (!folder) {
			new Notice(this.languageManager.notice('folder-not-found', { folder: folderPath }));
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
	 * Parse property list from settings
	 */
	getPropertyList(): string[] {
		return this.settings.propertyList
			.split(',')
			.map(prop => prop.trim())
			.filter(prop => prop.length > 0);
	}

	/**
	 * Read file content
	 */
	async readFile(file: TFile): Promise<string> {
		return await this.app.vault.read(file);
	}

	/**
	 * Modify file content
	 */
	async writeFile(file: TFile, content: string): Promise<void> {
		await this.app.vault.modify(file, content);
	}

	/**
	 * Create or overwrite a file
	 */
	async createFile(path: string, content: string): Promise<void> {
		const normalizedPath = normalizePath(path);
		const existingFile = this.app.vault.getAbstractFileByPath(normalizedPath);

		if (existingFile instanceof TFile) {
			// File exists, overwrite it
			await this.app.vault.modify(existingFile, content);
		} else {
			// File doesn't exist, create it
			await this.app.vault.create(normalizedPath, content);
		}
	}

	/**
	 * Update settings (used by other modules)
	 */
	updateSettings(newSettings: TransformerSettings): void {
		this.settings = newSettings;
	}
}
