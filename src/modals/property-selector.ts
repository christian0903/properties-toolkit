import { App, FuzzySuggestModal } from 'obsidian';
import { PropertyInfo } from '../types/mgr-types';

export class PropertySelectorModal extends FuzzySuggestModal<PropertyInfo> {
  private properties: PropertyInfo[];
  private onChoose: (propName: string) => void;

  constructor(app: App, properties: PropertyInfo[], onChoose: (propName: string) => void) {
    super(app);
    this.properties = properties;
    this.onChoose = onChoose;
    this.setPlaceholder('Tapez pour filtrer les propriétés...');
  }

  getItems(): PropertyInfo[] {
    return this.properties;
  }

  getItemText(item: PropertyInfo): string {
    return `${item.name} (${item.fileCount} fichiers)`;
  }

  onChooseItem(item: PropertyInfo, _evt: MouseEvent | KeyboardEvent): void {
    this.onChoose(item.name);
  }
}
