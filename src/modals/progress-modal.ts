import { App, Modal } from 'obsidian';

export class ProgressModal extends Modal {
  private progressEl: HTMLProgressElement;
  private textEl: HTMLElement;
  private title: string;

  constructor(app: App, title: string) {
    super(app);
    this.title = title;
  }

  onOpen(): void {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass('pt-modal');

    contentEl.createEl('h2', { text: this.title });

    const container = contentEl.createEl('div', { cls: 'pt-progress-container' });
    this.progressEl = container.createEl('progress');
    this.progressEl.max = 100;
    this.progressEl.value = 0;

    this.textEl = container.createEl('div', { cls: 'pt-progress-text' });
    this.textEl.setText('Préparation...');

    // Prevent closing during operation
    this.modalEl.querySelectorAll('.modal-close-button').forEach(el => {
      (el as HTMLElement).style.display = 'none';
    });
  }

  setProgress(current: number, total: number): void {
    this.progressEl.value = (current / total) * 100;
    this.textEl.setText(`Traitement ${current} / ${total}...`);
  }

  finish(message: string): void {
    this.textEl.setText(message);
    this.progressEl.value = 100;

    // Re-enable closing
    this.modalEl.querySelectorAll('.modal-close-button').forEach(el => {
      (el as HTMLElement).style.display = '';
    });

    const buttons = this.contentEl.createEl('div', { cls: 'pt-button-row' });
    buttons.createEl('button', { text: 'Fermer', cls: 'mod-cta' })
      .addEventListener('click', () => this.close());
  }

  onClose(): void {
    this.contentEl.empty();
  }
}
