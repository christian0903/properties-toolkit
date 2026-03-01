import { App, TFile, TFolder, normalizePath } from 'obsidian';
import { PropertyInfo, EmptyScanResult, PropertyAnalysis, PropertyOccurrence } from '../types/mgr-types';
import { TransformerSettings } from '../types/transformer-types';

function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true;
  if (value === '') return true;
  if (Array.isArray(value) && value.length === 0) return true;
  return false;
}

function getValueType(value: any): string {
  if (value === null || value === undefined) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value;
}

export class VaultScanner {
  private settings: TransformerSettings;

  constructor(private app: App, settings: TransformerSettings) {
    this.settings = settings;
  }

  /**
   * Update settings reference
   */
  updateSettings(settings: TransformerSettings): void {
    this.settings = settings;
  }

  /**
   * Get target files based on targetFolder setting
   */
  private getTargetFiles(): TFile[] {
    const folderPath = this.settings.targetFolder.trim();

    if (!folderPath) {
      return this.app.vault.getMarkdownFiles();
    }

    const normalizedPath = normalizePath(folderPath);
    const folder = this.app.vault.getAbstractFileByPath(normalizedPath);

    if (!folder) {
      return [];
    }

    if (folder instanceof TFile) {
      return folder.extension === 'md' ? [folder] : [];
    }

    if (folder instanceof TFolder) {
      const getAllFiles = (currentFolder: TFolder): TFile[] => {
        const result: TFile[] = [];

        for (const child of currentFolder.children) {
          if (child instanceof TFile && child.extension === 'md') {
            result.push(child);
          } else if (child instanceof TFolder) {
            result.push(...getAllFiles(child));
          }
        }

        return result;
      };

      return getAllFiles(folder);
    }

    return [];
  }

  /** Collect all unique property names across the target files with metadata */
  getAllProperties(): PropertyInfo[] {
    const map = new Map<string, PropertyInfo>();
    const files = this.getTargetFiles();

    for (const file of files) {
      const cache = this.app.metadataCache.getFileCache(file);
      const fm = cache?.frontmatter;
      if (!fm) continue;

      for (const key of Object.keys(fm)) {
        if (key === 'position') continue;

        const existing = map.get(key);
        if (existing) {
          existing.fileCount++;
          existing.valueTypes.add(getValueType(fm[key]));
        } else {
          map.set(key, {
            name: key,
            fileCount: 1,
            valueTypes: new Set([getValueType(fm[key])]),
          });
        }
      }
    }

    return Array.from(map.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  /** Scan the target files for all empty property occurrences */
  scanEmptyProperties(): EmptyScanResult {
    const byFile = new Map<string, { file: TFile; emptyProps: string[] }>();
    let totalCount = 0;
    const files = this.getTargetFiles();

    for (const file of files) {
      const cache = this.app.metadataCache.getFileCache(file);
      const fm = cache?.frontmatter;
      if (!fm) continue;

      const emptyProps: string[] = [];
      for (const key of Object.keys(fm)) {
        if (key === 'position') continue;
        if (isEmpty(fm[key])) {
          emptyProps.push(key);
        }
      }

      if (emptyProps.length > 0) {
        byFile.set(file.path, { file, emptyProps });
        totalCount += emptyProps.length;
      }
    }

    return { byFile, totalCount };
  }

  /** Analyze a specific property across target files */
  analyzeProperty(propertyName: string): PropertyAnalysis {
    const occurrences: PropertyOccurrence[] = [];
    const singleValueFiles: PropertyOccurrence[] = [];
    const multiValueFiles: PropertyOccurrence[] = [];
    const emptyFiles: PropertyOccurrence[] = [];
    const textFiles: PropertyOccurrence[] = [];
    const files = this.getTargetFiles();

    for (const file of files) {
      const cache = this.app.metadataCache.getFileCache(file);
      const fm = cache?.frontmatter;
      if (!fm || !(propertyName in fm)) continue;

      const value = fm[propertyName];
      const occ: PropertyOccurrence = { file, propertyName, currentValue: value };
      occurrences.push(occ);

      if (isEmpty(value)) {
        emptyFiles.push(occ);
      } else if (Array.isArray(value)) {
        if (value.length === 1) {
          singleValueFiles.push(occ);
        } else {
          multiValueFiles.push(occ);
        }
      } else if (typeof value === 'string') {
        textFiles.push(occ);
      }
      // numbers, booleans, objects are in occurrences but not classified further
    }

    return {
      propertyName,
      occurrences,
      singleValueFiles,
      multiValueFiles,
      emptyFiles,
      textFiles,
    };
  }
}
