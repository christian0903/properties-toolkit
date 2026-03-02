import { App, Modal } from 'obsidian';

export interface PreviewItem {
  filePath: string;
  fileName: string;
  detail: string;
}

export interface PreviewModalConfig {
  title: string;
  items: PreviewItem[];
  confirmLabel: string;
  onConfirm: () => void;
}

export class PreviewModal extends Modal {
  private config: PreviewModalConfig;

  constructor(app: App, config: PreviewModalConfig) {
    super(app);
    this.config = config;
  }

  onOpen(): void {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass('pt-modal');

    contentEl.createEl('h2', { text: this.config.title });

    const summary = contentEl.createEl('div', { cls: 'pt-summary' });
    summary.setText(`${this.config.items.length} file(s) affected`);

    const list = contentEl.createEl('div', { cls: 'pt-preview-list' });

    const MAX_VISIBLE = 200;
    const itemsToShow = this.config.items.slice(0, MAX_VISIBLE);

    for (const item of itemsToShow) {
      const row = list.createEl('div', { cls: 'pt-preview-item' });
      row.createEl('span', { cls: 'pt-file-name', text: item.fileName });
      row.createEl('span', { cls: 'pt-detail', text: item.detail });
    }

    if (this.config.items.length > MAX_VISIBLE) {
      list.createEl('div', {
        cls: 'pt-preview-item',
        text: `... and ${this.config.items.length - MAX_VISIBLE} more`,
      });
    }

    const buttons = contentEl.createEl('div', { cls: 'pt-button-row' });

    const cancelBtn = buttons.createEl('button', { text: 'Cancel' });
    cancelBtn.addEventListener('click', () => this.close());

    const confirmBtn = buttons.createEl('button', {
      text: this.config.confirmLabel,
      cls: 'mod-cta',
    });
    confirmBtn.addEventListener('click', () => {
      this.close();
      this.config.onConfirm();
    });
  }

  onClose(): void {
    this.contentEl.empty();
  }
}
