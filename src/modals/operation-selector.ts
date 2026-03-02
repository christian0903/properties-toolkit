import { App, SuggestModal } from 'obsidian';
import { PropertyConverter } from '../types/mgr-types';

export class OperationSelectorModal extends SuggestModal<PropertyConverter> {
  private converters: PropertyConverter[];
  private onChoose: (converter: PropertyConverter) => void;

  constructor(app: App, converters: PropertyConverter[], onChoose: (converter: PropertyConverter) => void) {
    super(app);
    this.converters = converters;
    this.onChoose = onChoose;
    this.setPlaceholder('Choose an operation...');
  }

  getSuggestions(query: string): PropertyConverter[] {
    const q = query.toLowerCase();
    return this.converters.filter(c =>
      c.label.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    );
  }

  renderSuggestion(converter: PropertyConverter, el: HTMLElement): void {
    el.createEl('div', { text: converter.label, cls: 'pt-suggest-title' });
    el.createEl('small', { text: converter.description, cls: 'pt-suggest-desc' });
  }

  onChooseSuggestion(converter: PropertyConverter, _evt: MouseEvent | KeyboardEvent): void {
    this.onChoose(converter);
  }
}
