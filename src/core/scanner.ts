import { App, TFile } from 'obsidian';
import { PropertyInfo, EmptyScanResult, PropertyAnalysis, PropertyOccurrence } from '../types/mgr-types';

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
  constructor(private app: App) {}

  /** Collect all unique property names across the vault with metadata */
  getAllProperties(): PropertyInfo[] {
    const map = new Map<string, PropertyInfo>();
    const files = this.app.vault.getMarkdownFiles();

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

  /** Scan the vault for all empty property occurrences */
  scanEmptyProperties(): EmptyScanResult {
    const byFile = new Map<string, { file: TFile; emptyProps: string[] }>();
    let totalCount = 0;
    const files = this.app.vault.getMarkdownFiles();

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

  /** Analyze a specific property across all files */
  analyzeProperty(propertyName: string): PropertyAnalysis {
    const occurrences: PropertyOccurrence[] = [];
    const singleValueFiles: PropertyOccurrence[] = [];
    const multiValueFiles: PropertyOccurrence[] = [];
    const emptyFiles: PropertyOccurrence[] = [];
    const textFiles: PropertyOccurrence[] = [];
    const files = this.app.vault.getMarkdownFiles();

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
