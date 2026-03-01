import { App, PluginSettingTab, Setting } from 'obsidian';
import { TransformerSettings } from '../types/transformer-types';
import { LanguageManager, Language } from '../lang/LanguageManager';

export interface SettingsManager {
	settings: TransformerSettings;
	saveSettings(): Promise<void>;
	languageManager: LanguageManager;
}

export class PropertiesToolkitSettingTab extends PluginSettingTab {
	private settingsManager: SettingsManager;

	constructor(app: App, settingsManager: SettingsManager) {
		super(app, settingsManager as any);
		this.settingsManager = settingsManager;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		containerEl.createEl('h2', { text: this.settingsManager.languageManager.setting('title') });

		// ========================================
		// Section: General Settings
		// ========================================
		containerEl.createEl('h3', { text: this.settingsManager.languageManager.setting('section-general') });

		// Paramètre de langue
		new Setting(containerEl)
			.setName(this.settingsManager.languageManager.setting('language'))
			.setDesc(this.settingsManager.languageManager.setting('language-desc'))
			.addDropdown(dropdown => {
				const languages = this.settingsManager.languageManager.getAvailableLanguages();
				languages.forEach(lang => {
					dropdown.addOption(lang.value, lang.label);
				});
				dropdown.setValue(this.settingsManager.settings.language)
					.onChange(async (value: Language) => {
						this.settingsManager.settings.language = value;
						await this.settingsManager.saveSettings();
						// Refresh the settings display to update language
						this.display();
					});
			});

		// Dossier cible (en haut pour toutes les opérations)
		new Setting(containerEl)
			.setName(this.settingsManager.languageManager.setting('target-folder'))
			.setDesc(this.settingsManager.languageManager.setting('target-folder-desc'))
			.addText(text => text
				.setPlaceholder('path/to/folder')
				.setValue(this.settingsManager.settings.targetFolder)
				.onChange(async (value) => {
					this.settingsManager.settings.targetFolder = value;
					await this.settingsManager.saveSettings();
				}));

		// Nom du fichier d'analyse
		new Setting(containerEl)
			.setName(this.settingsManager.languageManager.setting('analysis-filename'))
			.setDesc(this.settingsManager.languageManager.setting('analysis-filename-desc'))
			.addText(text => text
				.setPlaceholder('properties-analysis')
				.setValue(this.settingsManager.settings.analysisFileName)
				.onChange(async (value) => {
					this.settingsManager.settings.analysisFileName = value || 'properties-analysis';
					await this.settingsManager.saveSettings();
				}));

		// Activer le logging détaillé
		new Setting(containerEl)
			.setName(this.settingsManager.languageManager.setting('enable-logging'))
			.setDesc(this.settingsManager.languageManager.setting('enable-logging-desc'))
			.addToggle(toggle => toggle
				.setValue(this.settingsManager.settings.enableLogging)
				.onChange(async (value) => {
					this.settingsManager.settings.enableLogging = value;
					await this.settingsManager.saveSettings();
				}));

		// ========================================
		// Section: Transformation Property ↔ Tag
		// ========================================
		containerEl.createEl('h3', { text: this.settingsManager.languageManager.setting('section-transformer') });

		// Liste de propriétés
		new Setting(containerEl)
			.setName(this.settingsManager.languageManager.setting('property-list'))
			.setDesc(this.settingsManager.languageManager.setting('property-list-desc'))
			.addText(text => text
				.setPlaceholder(this.settingsManager.languageManager.setting('property-list-placeholder'))
				.setValue(this.settingsManager.settings.propertyList)
				.onChange(async (value) => {
					this.settingsManager.settings.propertyList = value;
					await this.settingsManager.saveSettings();
				}));

		// Écraser les valeurs existantes
		new Setting(containerEl)
			.setName(this.settingsManager.languageManager.setting('overwrite'))
			.setDesc(this.settingsManager.languageManager.setting('overwrite-desc'))
			.addToggle(toggle => toggle
				.setValue(this.settingsManager.settings.overwrite)
				.onChange(async (value) => {
					this.settingsManager.settings.overwrite = value;
					await this.settingsManager.saveSettings();
				}));

		// Ajouter à la propriété existante
		new Setting(containerEl)
			.setName(this.settingsManager.languageManager.setting('append-to-existing'))
			.setDesc(this.settingsManager.languageManager.setting('append-to-existing-desc'))
			.addToggle(toggle => toggle
				.setValue(this.settingsManager.settings.appendToExistingProperty)
				.onChange(async (value) => {
					this.settingsManager.settings.appendToExistingProperty = value;
					await this.settingsManager.saveSettings();
				}));

		// Supprimer la source après transformation
		new Setting(containerEl)
			.setName(this.settingsManager.languageManager.setting('remove-source'))
			.setDesc(this.settingsManager.languageManager.setting('remove-source-desc'))
			.addToggle(toggle => toggle
				.setValue(this.settingsManager.settings.removeSourceAfterTransform)
				.onChange(async (value) => {
					this.settingsManager.settings.removeSourceAfterTransform = value;
					await this.settingsManager.saveSettings();
				}));

		// Tags dans la zone YAML
		new Setting(containerEl)
			.setName(this.settingsManager.languageManager.setting('tags-in-yaml'))
			.setDesc(this.settingsManager.languageManager.setting('tags-in-yaml-desc'))
			.addToggle(toggle => toggle
				.setValue(this.settingsManager.settings.tagsInYamlZone)
				.onChange(async (value) => {
					this.settingsManager.settings.tagsInYamlZone = value;
					await this.settingsManager.saveSettings();
				}));

		// Localisation de recherche des tags
		new Setting(containerEl)
			.setName(this.settingsManager.languageManager.setting('tag-search-location'))
			.setDesc(this.settingsManager.languageManager.setting('tag-search-location-desc'))
			.addDropdown(dropdown => dropdown
				.addOption('yaml', this.settingsManager.languageManager.setting('tag-search-yaml'))
				.addOption('content', this.settingsManager.languageManager.setting('tag-search-content'))
				.addOption('both', this.settingsManager.languageManager.setting('tag-search-both'))
				.setValue(this.settingsManager.settings.tagSearchLocation)
				.onChange(async (value) => {
					this.settingsManager.settings.tagSearchLocation = value as 'yaml' | 'content' | 'both';
					await this.settingsManager.saveSettings();
				}));

		// Type d'analyse
		new Setting(containerEl)
			.setName(this.settingsManager.languageManager.setting('analysis-type'))
			.setDesc(this.settingsManager.languageManager.setting('analysis-type-desc'))
			.addDropdown(dropdown => dropdown
				.addOption('by-property', this.settingsManager.languageManager.setting('analysis-by-property'))
				.addOption('by-file', this.settingsManager.languageManager.setting('analysis-by-file'))
				.setValue(this.settingsManager.settings.analysisType)
				.onChange(async (value) => {
					this.settingsManager.settings.analysisType = value as 'by-property' | 'by-file';
					await this.settingsManager.saveSettings();
				}));
	}
}
