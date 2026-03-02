import { App } from 'obsidian';
import { PropertyConverter, PropertyAnalysis } from '../types/mgr-types';
import { PreviewModal, PreviewItem } from '../modals/preview-modal';
import { ProgressModal } from '../modals/progress-modal';
import { updatePropertyType } from '../core/type-updater';

export class TextToListConverter implements PropertyConverter {
  id = 'text-to-list';
  label = 'Text → List';
  description = 'Convert text values to list (wraps each value in a list)';

  isApplicable(analysis: PropertyAnalysis): boolean {
    return analysis.textFiles.length > 0;
  }

  execute(app: App, analysis: PropertyAnalysis): Promise<number> {
    return new Promise((resolve) => {
      const propName = analysis.propertyName;
      const textFiles = analysis.textFiles;

      const items: PreviewItem[] = textFiles.map(occ => ({
        filePath: occ.file.path,
        fileName: occ.file.basename,
        detail: `"${occ.currentValue}" → ["${occ.currentValue}"]`,
      }));

      new PreviewModal(app, {
        title: `Text → List : "${propName}"`,
        items,
        confirmLabel: `Convert ${textFiles.length} file(s)`,
        onConfirm: () => {
          void (async () => {
            const progress = new ProgressModal(app, `Conversion de "${propName}"...`);
            progress.open();

            let count = 0;
            for (const occ of textFiles) {
              await app.fileManager.processFrontMatter(occ.file, (fm: Record<string, unknown>) => {
                if (typeof fm[propName] === 'string') {
                  fm[propName] = [fm[propName]];
                }
              });
              count++;
              progress.setProgress(count, textFiles.length);
              if (count % 50 === 0) {
                await new Promise(r => setTimeout(r, 0));
              }
            }

            await updatePropertyType(app, propName, 'multitext');
            progress.finish(`Done: ${count} file(s) converted.`);
            resolve(count);
          })();
        },
      }).open();
    });
  }
}
