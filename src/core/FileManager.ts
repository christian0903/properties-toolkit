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
	 * Détermine les fichiers à traiter selon le paramètre targetFolder
	 */
	async getTargetFiles(): Promise<TFile[]> {
		const folderPath = this.settings.targetFolder.trim();

		if (!folderPath) {
			return this.app.vault.getMarkdownFiles();
		}

		// Normaliser le chemin pour éviter les problèmes de slash
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
	 * Parse la liste des propriétés depuis les settings
	 */
	getPropertyList(): string[] {
		return this.settings.propertyList
			.split(',')
			.map(prop => prop.trim())
			.filter(prop => prop.length > 0);
	}

	/**
	 * Lit le contenu d'un fichier
	 */
	async readFile(file: TFile): Promise<string> {
		return await this.app.vault.read(file);
	}

	/**
	 * Modifie le contenu d'un fichier
	 */
	async writeFile(file: TFile, content: string): Promise<void> {
		await this.app.vault.modify(file, content);
	}

	/**
	 * Crée ou écrase un fichier
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
	 * Met à jour les settings (utilisé par les autres modules)
	 */
	updateSettings(newSettings: TransformerSettings): void {
		this.settings = newSettings;
	}
}
