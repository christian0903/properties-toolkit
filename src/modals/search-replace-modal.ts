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

		contentEl.createEl('h2', { text: 'Search and replace value' });

		// Property name
		new Setting(contentEl)
			.setName('Property name')
			.setDesc('The property to search in')
			.addText(text => text
				.setPlaceholder('e.g. status, type, category')
				.onChange(value => {
					this.params.propertyName = value.trim();
				}));

		// Search value
		new Setting(contentEl)
			.setName('Search value')
			.setDesc('The exact value to replace')
			.addText(text => text
				.setPlaceholder('old value')
				.onChange(value => {
					this.params.searchValue = value;
				}));

		// Replace value
		new Setting(contentEl)
			.setName('Replace value')
			.setDesc('The new value (empty = delete)')
			.addText(text => text
				.setPlaceholder('new value')
				.onChange(value => {
					this.params.replaceValue = value;
				}));

		// Buttons
		const buttonRow = contentEl.createEl('div', { cls: 'pt-button-row' });

		const cancelBtn = buttonRow.createEl('button', { text: 'Cancel' });
		cancelBtn.addEventListener('click', () => this.close());

		const submitBtn = buttonRow.createEl('button', {
			text: 'Search',
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
