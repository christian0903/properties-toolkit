import { App } from 'obsidian';
import { PropertyConverter, PropertyAnalysis } from '../types/mgr-types';
import { PreviewModal, PreviewItem } from '../modals/preview-modal';
import { ProgressModal } from '../modals/progress-modal';

export class DeleteEmptyConverter implements PropertyConverter {
  id = 'delete-empty';
  label = 'Delete empty values';
  description = 'Delete this property in files where it is empty or null';

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
        detail: `"${propName}" will be deleted`,
      }));

      new PreviewModal(app, {
        title: `Delete "${propName}" (empty values)`,
        items,
        confirmLabel: `Delete in ${emptyFiles.length} file(s)`,
        onConfirm: () => {
          void (async () => {
            const progress = new ProgressModal(app, `Suppression de "${propName}"...`);
            progress.open();

            let count = 0;
            for (const occ of emptyFiles) {
              await app.fileManager.processFrontMatter(occ.file, (fm: Record<string, unknown>) => {
                delete fm[propName];
              });
              count++;
              progress.setProgress(count, emptyFiles.length);
              if (count % 50 === 0) {
                await new Promise(r => setTimeout(r, 0));
              }
            }

            progress.finish(`Done: "${propName}" deleted in ${count} file(s).`);
            resolve(count);
          })();
        },
      }).open();
    });
  }
}
