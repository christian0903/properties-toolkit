import { Component, MarkdownRenderer, Notice, Plugin, Modal } from 'obsidian';
import { LanguageManager } from './src/lang/LanguageManager';
import { TransformerSettings, DEFAULT_TRANSFORMER_SETTINGS } from './src/types/transformer-types';
import { VaultScanner } from './src/core/scanner';
import { ConverterRegistry } from './src/converters/registry';
import { ListToTextConverter } from './src/converters/list-to-text';
import { TextToListConverter } from './src/converters/text-to-list';
import { DeleteEmptyConverter } from './src/converters/delete-empty';
import { PropertySelectorModal } from './src/modals/property-selector';
import { OperationSelectorModal } from './src/modals/operation-selector';
import { PreviewModal, PreviewItem } from './src/modals/preview-modal';
import { ProgressModal } from './src/modals/progress-modal';
import { FrontmatterParser } from './src/core/FrontmatterParser';
import { FileManager } from './src/core/FileManager';
import { PropertyTransformer } from './src/core/PropertyTransformer';
import { LogGenerator } from './src/reports/LogGenerator';
import { AnalysisGenerator } from './src/reports/AnalysisGenerator';
import { PropertiesToolkitSettingTab } from './src/ui/Settings';
import { SearchReplaceModal } from './src/modals/search-replace-modal';
import { SearchReplaceExecutor } from './src/converters/search-replace';

export default class PropertiesToolkitPlugin extends Plugin {
	settings!: TransformerSettings;
	languageManager!: LanguageManager;

	// Properties Manager modules
	private scanner!: VaultScanner;
	private registry!: ConverterRegistry;

	// Property Transformer modules
	private frontmatterParser!: FrontmatterParser;
	private fileManager!: FileManager;
	private propertyTransformer!: PropertyTransformer;
	private logGenerator!: LogGenerator;
	private analysisGenerator!: AnalysisGenerator;

	async onload() {
		await this.loadSettings();

		// Initialize language manager
		this.languageManager = new LanguageManager(this.app, this.settings.language);

		// Synchronize detected language
		const detectedLang = this.languageManager.getCurrentLanguage();
		if (this.settings.language !== detectedLang) {
			this.settings.language = detectedLang;
			await this.saveSettings();
			this.languageManager = new LanguageManager(this.app, this.settings.language);
		}

		// Initialize modules
		this.initializeModules();

		// Register commands
		this.registerCommands();

		// Add settings tab
		this.addSettingTab(new PropertiesToolkitSettingTab(this.app, this));
	}

	/**
	 * Initialize all modules with dependencies
	 */
	private initializeModules(): void {
		// Properties Manager modules
		this.scanner = new VaultScanner(this.app, this.settings);
		this.registry = new ConverterRegistry();

		// Register converters
		this.registry.register(new ListToTextConverter());
		this.registry.register(new TextToListConverter());
		this.registry.register(new DeleteEmptyConverter());

		// Property Transformer modules
		this.frontmatterParser = new FrontmatterParser();
		this.fileManager = new FileManager(this.app, this.settings, this.languageManager);
		this.propertyTransformer = new PropertyTransformer(
			this.settings,
			this.languageManager,
			this.frontmatterParser,
			this.fileManager
		);

		// Report modules
		this.logGenerator = new LogGenerator(this.settings, this.languageManager, this.fileManager);
		this.analysisGenerator = new AnalysisGenerator(
			this.settings,
			this.languageManager,
			this.frontmatterParser,
			this.fileManager
		);
	}

	/**
	 * Register all plugin commands
	 */
	private registerCommands(): void {
		// === PROPERTIES MANAGER COMMANDS ===

		// Command: Delete all empty properties vault-wide
		this.addCommand({
			id: 'delete-empty-properties',
			name: this.languageManager.command('delete-empty-properties'),
			callback: () => { this.deleteEmptyProperties(); },
		});

		// Command: Convert property type
		this.addCommand({
			id: 'convert-property',
			name: this.languageManager.command('convert-property'),
			callback: () => { this.convertProperty(); },
		});

		// Command: Show documentation
		this.addCommand({
			id: 'show-doc',
			name: this.languageManager.command('show-doc'),
			callback: () => { void this.showDoc(); },
		});

		// Command: Search and replace value in property
		this.addCommand({
			id: 'search-replace-value',
			name: this.languageManager.command('search-replace-value'),
			callback: () => { this.searchReplaceValue(); },
		});

		// === PROPERTY TRANSFORMER COMMANDS ===

		// Command: Properties to Tags
		this.addCommand({
			id: 'transpose-properties-to-tags',
			name: this.languageManager.command('transpose-properties-to-tags'),
			callback: () => {
				void (async () => {
					const logs = await this.propertyTransformer.transposePropertiesToTags();

					if (this.settings.enableLogging && logs.length > 0) {
						await this.logGenerator.createDetailedLog(
							this.languageManager.command('transpose-properties-to-tags'),
							logs
						);
					}
				})();
			}
		});

		// Command: Tags to Properties
		this.addCommand({
			id: 'transpose-tags-to-properties',
			name: this.languageManager.command('transpose-tags-to-properties'),
			callback: () => {
				void (async () => {
					const logs = await this.propertyTransformer.transposeTagsToProperties();

					if (this.settings.enableLogging && logs.length > 0) {
						await this.logGenerator.createDetailedLog(
							this.languageManager.command('transpose-tags-to-properties'),
							logs
						);
					}
				})();
			}
		});

		// Command: Remove Properties
		this.addCommand({
			id: 'remove-properties',
			name: this.languageManager.command('remove-properties'),
			callback: () => {
				void (async () => {
					const logs = await this.propertyTransformer.removeCorrespondingProperties();

					if (this.settings.enableLogging && logs.length > 0) {
						await this.logGenerator.createDetailedLog(
							this.languageManager.command('remove-properties'),
							logs
						);
					}
				})();
			}
		});

		// Command: Remove Tags
		this.addCommand({
			id: 'remove-tags',
			name: this.languageManager.command('remove-tags'),
			callback: () => {
				void (async () => {
					const logs = await this.propertyTransformer.removeCorrespondingTags();

					if (this.settings.enableLogging && logs.length > 0) {
						await this.logGenerator.createDetailedLog(
							this.languageManager.command('remove-tags'),
							logs
						);
					}
				})();
			}
		});

		// Command: Analyze Property Tags
		this.addCommand({
			id: 'analyze-property-tags',
			name: this.languageManager.command('analyze-property-tags'),
			callback: () => { void this.analysisGenerator.analyzePropertyTags(); }
		});

		// Command: Generate Modification Report
		this.addCommand({
			id: 'generate-modification-report',
			name: this.languageManager.command('generate-modification-report'),
			callback: () => {
				const logs = this.propertyTransformer.getModificationLogs();
				void this.logGenerator.generateModificationReport(logs);
			}
		});
	}

	// === PROPERTIES MANAGER METHODS ===

	private deleteEmptyProperties(): void {
		const result = this.scanner.scanEmptyProperties();

		if (result.totalCount === 0) {
			new Notice(this.languageManager.notice('no-empty-properties'));
			return;
		}

		// Build preview items grouped by file
		const items: PreviewItem[] = [];
		for (const [, entry] of result.byFile) {
			items.push({
				filePath: entry.file.path,
				fileName: entry.file.basename,
				detail: entry.emptyProps.join(', '),
			});
		}

		new PreviewModal(this.app, {
			title: this.languageManager.command('delete-empty-properties'),
			items,
			confirmLabel: `${result.totalCount} empty property(ies)`,
			onConfirm: () => {
				void (async () => {
					const progress = new ProgressModal(this.app, this.languageManager.command('delete-empty-properties'));
					progress.open();

					let fileCount = 0;
					const entries = Array.from(result.byFile.values());

					for (const entry of entries) {
						await this.app.fileManager.processFrontMatter(entry.file, (fm: Record<string, unknown>) => {
							for (const prop of entry.emptyProps) {
								delete fm[prop];
							}
						});
						fileCount++;
						progress.setProgress(fileCount, entries.length);
						if (fileCount % 50 === 0) {
							await new Promise(r => setTimeout(r, 0));
						}
					}

					progress.finish(
						`${result.totalCount} property(ies) deleted in ${fileCount} file(s).`
					);
				})();
			},
		}).open();
	}

	private async showDoc(): Promise<void> {
		// Load doc file based on current language
		const lang = this.languageManager.getCurrentLanguage();
		const docPath = this.manifest.dir + '/doc-' + lang + '.md';
		const fallbackPath = this.manifest.dir + '/doc-en.md';

		try {
			let markdown: string;
			try {
				markdown = await this.app.vault.adapter.read(docPath);
			} catch {
				// Fallback to English if language-specific doc not found
				markdown = await this.app.vault.adapter.read(fallbackPath);
			}

			const modal = new Modal(this.app);
			const title = lang === 'fr' ? 'Properties Toolkit — Aide' : 'Properties Toolkit — Help';
			modal.titleEl.setText(title);
			modal.modalEl.addClass('pt-doc-modal');
			modal.contentEl.addClass('pt-doc');
			const component = new Component();
			component.load();
			await MarkdownRenderer.render(this.app, markdown, modal.contentEl, '', component);
			modal.onClose = () => { component.unload(); };
			modal.open();
		} catch {
			new Notice(lang === 'fr'
				? 'Documentation introuvable : ' + docPath
				: 'Documentation not found: ' + docPath);
		}
	}

	private searchReplaceValue(): void {
		new SearchReplaceModal(this.app, this.languageManager, (params) => {
			void (async () => {
				const executor = new SearchReplaceExecutor(this.app, this.languageManager, this.settings);
				const count = await executor.executeWithPreview(
					params.propertyName,
					params.searchValue,
					params.replaceValue
				);

				if (count === 0) {
					const isFr = this.languageManager.getCurrentLanguage() === 'fr';
					new Notice(isFr
						? `No match found for "${params.searchValue}" in "${params.propertyName}"`
						: `No match found for "${params.searchValue}" in "${params.propertyName}"`);
				}
			})();
		}).open();
	}

	private convertProperty(): void {
		const properties = this.scanner.getAllProperties();

		if (properties.length === 0) {
			new Notice(this.languageManager.notice('no-properties-vault'));
			return;
		}

		new PropertySelectorModal(this.app, properties, (propName: string) => {
			const analysis = this.scanner.analyzeProperty(propName);
			const applicable = this.registry.getAll().filter(c => c.isApplicable(analysis));

			if (applicable.length === 0) {
				new Notice(`No applicable operation for "${propName}".`);
				return;
			}

			new OperationSelectorModal(this.app, applicable, (converter) => {
				void (async () => {
					const count = await converter.execute(this.app, analysis);
					if (count >= 0) {
						new Notice(`Operation complete: ${count} file(s) modified.`);
					}
				})();
			}).open();
		}).open();
	}

	// === SETTINGS METHODS ===

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_TRANSFORMER_SETTINGS, await this.loadData());

		// Update language manager if language changed
		if (this.languageManager) {
			this.languageManager.setLanguage(this.settings.language);
		}

		// Update modules settings if they exist
		this.updateModulesSettings();
	}

	async saveSettings() {
		await this.saveData(this.settings);

		// Update language manager when settings change
		if (this.languageManager) {
			this.languageManager.setLanguage(this.settings.language);
		}

		// Update modules settings
		this.updateModulesSettings();
	}

	private updateModulesSettings(): void {
		if (this.scanner) {
			this.scanner.updateSettings(this.settings);
		}
		if (this.fileManager) {
			this.fileManager.updateSettings(this.settings);
		}
		if (this.propertyTransformer) {
			this.propertyTransformer.updateSettings(this.settings);
		}
		if (this.logGenerator) {
			this.logGenerator.updateSettings(this.settings);
		}
		if (this.analysisGenerator) {
			this.analysisGenerator.updateSettings(this.settings);
		}
	}
}
