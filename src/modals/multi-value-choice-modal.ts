import { App, Modal } from 'obsidian';
import { PropertyOccurrence, PropertyValue } from '../types/mgr-types';

/** Map from file path to the chosen value */
export type MultiValueChoices = Map<string, PropertyValue>;

export class MultiValueChoiceModal extends Modal {
  private propertyName: string;
  private multiValueFiles: PropertyOccurrence[];
  private onConfirm: (choices: MultiValueChoices) => void;
  private choices: MultiValueChoices = new Map();

  constructor(
    app: App,
    propertyName: string,
    multiValueFiles: PropertyOccurrence[],
    onConfirm: (choices: MultiValueChoices) => void
  ) {
    super(app);
    this.propertyName = propertyName;
    this.multiValueFiles = multiValueFiles;
    this.onConfirm = onConfirm;

    // Default: first value for each file
    for (const occ of multiValueFiles) {
      if (Array.isArray(occ.currentValue) && occ.currentValue.length > 0) {
        this.choices.set(occ.file.path, occ.currentValue[0]);
      }
    }
  }

  onOpen(): void {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass('pt-modal');

    contentEl.createEl('h2', {
      text: `List → Text : "${this.propertyName}"`,
    });

    contentEl.createEl('p', {
      text: `${this.multiValueFiles.length} file(s) have multiple values. Select the value to keep for each file.`,
    });

    const list = contentEl.createEl('div', { cls: 'pt-preview-list' });

    for (const occ of this.multiValueFiles) {
      const values: PropertyValue[] = Array.isArray(occ.currentValue) ? occ.currentValue : [occ.currentValue];
      const groupName = `pt-radio-${occ.file.path.replace(/[^a-zA-Z0-9]/g, '_')}`;

      const fileBlock = list.createEl('div', { cls: 'pt-radio-file' });

      const header = fileBlock.createEl('div', { cls: 'pt-radio-file-header' });
      header.createEl('span', { cls: 'pt-file-name', text: occ.file.basename });
      header.createEl('span', {
        cls: 'pt-detail',
        text: occ.file.parent?.path || '',
      });

      const valuesContainer = fileBlock.createEl('div', { cls: 'pt-radio-values' });

      for (let i = 0; i < values.length; i++) {
        const val = values[i];
        const label = valuesContainer.createEl('label', { cls: 'pt-radio-label' });

        const radio = label.createEl('input', { type: 'radio' });
        radio.name = groupName;
        radio.checked = i === 0; // first value selected by default
        radio.addEventListener('change', () => {
          if (radio.checked) {
            this.choices.set(occ.file.path, val);
          }
        });

        label.createEl('span', { text: String(val) });
      }
    }

    const buttons = contentEl.createEl('div', { cls: 'pt-button-row' });

    const cancelBtn = buttons.createEl('button', { text: 'Cancel' });
    cancelBtn.addEventListener('click', () => this.close());

    const confirmBtn = buttons.createEl('button', {
      text: `Convert ${this.multiValueFiles.length} file(s)`,
      cls: 'mod-cta',
    });
    confirmBtn.addEventListener('click', () => {
      this.close();
      this.onConfirm(this.choices);
    });
  }

  onClose(): void {
    this.contentEl.empty();
  }
}
