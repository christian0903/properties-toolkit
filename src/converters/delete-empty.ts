import { App } from 'obsidian';
import { PropertyConverter, PropertyAnalysis } from '../types/mgr-types';
import { PreviewModal, PreviewItem } from '../modals/preview-modal';
import { ProgressModal } from '../modals/progress-modal';

export class DeleteEmptyConverter implements PropertyConverter {
  id = 'delete-empty';
  label = 'Supprimer les valeurs vides';
  description = 'Supprimer cette propriété dans les fichiers où elle est vide ou null';

  isApplicable(analysis: PropertyAnalysis): boolean {
    return analysis.emptyFiles.length > 0;
  }

  execute(app: App, analysis: PropertyAnalysis): Promise<number> {
    return new Promise((resolve) => {
      const propName = analysis.propertyName;
      const emptyFiles = analysis.emptyFiles;

      const items: PreviewItem[] = emptyFiles.map(occ => ({
        filePath: occ.file.path,
        fileName: occ.file.basename,
        detail: `"${propName}" sera supprimé`,
      }));

      new PreviewModal(app, {
        title: `Supprimer "${propName}" (valeurs vides)`,
        items,
        confirmLabel: `Supprimer dans ${emptyFiles.length} fichier(s)`,
        onConfirm: async () => {
          const progress = new ProgressModal(app, `Suppression de "${propName}"...`);
          progress.open();

          let count = 0;
          for (const occ of emptyFiles) {
            await app.fileManager.processFrontMatter(occ.file, (fm: any) => {
              delete fm[propName];
            });
            count++;
            progress.setProgress(count, emptyFiles.length);
            if (count % 50 === 0) {
              await new Promise(r => setTimeout(r, 0));
            }
          }

          progress.finish(`Terminé : "${propName}" supprimé dans ${count} fichier(s).`);
          resolve(count);
        },
      }).open();
    });
  }
}
