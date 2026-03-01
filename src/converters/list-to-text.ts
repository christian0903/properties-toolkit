import { App, TFile } from 'obsidian';
import { PropertyConverter, PropertyAnalysis, PropertyOccurrence } from '../types/mgr-types';
import { PreviewModal, PreviewItem } from '../modals/preview-modal';
import { ProgressModal } from '../modals/progress-modal';
import { MultiValueChoiceModal, MultiValueChoices } from '../modals/multi-value-choice-modal';
import { updatePropertyType } from '../core/type-updater';

interface FileConversion {
  file: TFile;
  chosenValue: any;
}

export class ListToTextConverter implements PropertyConverter {
  id = 'list-to-text';
  label = 'List → Text';
  description = 'Convertir les valeurs liste en texte simple (garde une seule valeur)';

  isApplicable(analysis: PropertyAnalysis): boolean {
    return analysis.singleValueFiles.length > 0 || analysis.multiValueFiles.length > 0;
  }

  execute(app: App, analysis: PropertyAnalysis): Promise<number> {
    return new Promise((resolve) => {
      const propName = analysis.propertyName;
      const singleFiles = analysis.singleValueFiles;
      const multiFiles = analysis.multiValueFiles;

      // Build conversions for single-value files (automatic, first value)
      const autoConversions: FileConversion[] = singleFiles.map(occ => ({
        file: occ.file,
        chosenValue: Array.isArray(occ.currentValue) ? occ.currentValue[0] : occ.currentValue,
      }));

      if (multiFiles.length > 0) {
        // Show radio-button modal for multi-value files
        new MultiValueChoiceModal(app, propName, multiFiles, (choices: MultiValueChoices) => {
          const multiConversions: FileConversion[] = multiFiles.map(occ => ({
            file: occ.file,
            chosenValue: choices.get(occ.file.path),
          }));
          const allConversions = [...autoConversions, ...multiConversions];
          this.showPreviewAndExecute(app, propName, allConversions, resolve);
        }).open();
      } else {
        // Only single-value files: go straight to preview
        this.showPreviewAndExecute(app, propName, autoConversions, resolve);
      }
    });
  }

  private showPreviewAndExecute(
    app: App,
    propName: string,
    conversions: FileConversion[],
    resolve: (count: number) => void
  ): void {
    if (conversions.length === 0) {
      resolve(0);
      return;
    }

    const items: PreviewItem[] = conversions.map(conv => ({
      filePath: conv.file.path,
      fileName: conv.file.basename,
      detail: `→ "${conv.chosenValue}"`,
    }));

    new PreviewModal(app, {
      title: `List → Text : "${propName}"`,
      items,
      confirmLabel: `Convertir ${conversions.length} fichier(s)`,
      onConfirm: async () => {
        const progress = new ProgressModal(app, `Conversion de "${propName}"...`);
        progress.open();

        let count = 0;
        for (const conv of conversions) {
          const val = conv.chosenValue;
          await app.fileManager.processFrontMatter(conv.file, (fm: any) => {
            fm[propName] = val;
          });
          count++;
          progress.setProgress(count, conversions.length);
          if (count % 50 === 0) {
            await new Promise(r => setTimeout(r, 0));
          }
        }

        await updatePropertyType(app, propName, 'text');
        progress.finish(`Terminé : ${count} fichier(s) converti(s).`);
        resolve(count);
      },
    }).open();
  }
}
