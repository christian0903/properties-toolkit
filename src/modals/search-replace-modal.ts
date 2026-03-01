import { App, Modal, Setting } from 'obsidian';
import { LanguageManager } from '../lang/LanguageManager';

export interface SearchReplaceParams {
	propertyName: string;
	searchValue: string;
	replaceValue: string;
}

export class SearchReplaceModal extends Modal {
	private languageManager: LanguageManager;
	private onSubmit: (params: SearchReplaceParams) => void;
	private params: SearchReplaceParams = {
		propertyName: '',
		searchValue: '',
		replaceValue: ''
	};

	constructor(app: App, languageManager: LanguageManager, onSubmit: (params: SearchReplaceParams) => void) {
		super(app);
		this.languageManager = languageManager;
		this.onSubmit = onSubmit;
	}

	onOpen(): void {
		const { contentEl } = this;
		contentEl.empty();
		contentEl.addClass('pt-modal');

		const title = this.languageManager.getCurrentLanguage() === 'fr'
			? 'Rechercher et remplacer une valeur'
			: 'Search and replace value';
		contentEl.createEl('h2', { text: title });

		// Property name
		new Setting(contentEl)
			.setName(this.languageManager.getCurrentLanguage() === 'fr' ? 'Nom de la propriété' : 'Property name')
			.setDesc(this.languageManager.getCurrentLanguage() === 'fr'
				? 'La propriété dans laquelle chercher'
				: 'The property to search in')
			.addText(text => text
				.setPlaceholder('status, type, category...')
				.onChange(value => {
					this.params.propertyName = value.trim();
				}));

		// Search value
		new Setting(contentEl)
			.setName(this.languageManager.getCurrentLanguage() === 'fr' ? 'Valeur à chercher' : 'Search value')
			.setDesc(this.languageManager.getCurrentLanguage() === 'fr'
				? 'La valeur exacte à remplacer'
				: 'The exact value to replace')
			.addText(text => text
				.setPlaceholder(this.languageManager.getCurrentLanguage() === 'fr' ? 'ancienne valeur' : 'old value')
				.onChange(value => {
					this.params.searchValue = value;
				}));

		// Replace value
		new Setting(contentEl)
			.setName(this.languageManager.getCurrentLanguage() === 'fr' ? 'Nouvelle valeur' : 'Replace value')
			.setDesc(this.languageManager.getCurrentLanguage() === 'fr'
				? 'La nouvelle valeur (vide = supprimer)'
				: 'The new value (empty = delete)')
			.addText(text => text
				.setPlaceholder(this.languageManager.getCurrentLanguage() === 'fr' ? 'nouvelle valeur' : 'new value')
				.onChange(value => {
					this.params.replaceValue = value;
				}));

		// Buttons
		const buttonRow = contentEl.createEl('div', { cls: 'pt-button-row' });

		const cancelBtn = buttonRow.createEl('button', {
			text: this.languageManager.getCurrentLanguage() === 'fr' ? 'Annuler' : 'Cancel'
		});
		cancelBtn.addEventListener('click', () => this.close());

		const submitBtn = buttonRow.createEl('button', {
			text: this.languageManager.getCurrentLanguage() === 'fr' ? 'Rechercher' : 'Search',
			cls: 'mod-cta'
		});
		submitBtn.addEventListener('click', () => {
			if (!this.params.propertyName) {
				return;
			}
			if (!this.params.searchValue) {
				return;
			}
			this.close();
			this.onSubmit(this.params);
		});
	}

	onClose(): void {
		this.contentEl.empty();
	}
}
