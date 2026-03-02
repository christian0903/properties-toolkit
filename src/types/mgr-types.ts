import { TFile, App } from 'obsidian';

/** Represents any valid frontmatter property value */
export type PropertyValue = string | number | boolean | null | undefined | string[] | number[];

/** Information about a single property across the vault */
export interface PropertyInfo {
  name: string;
  /** Number of files that have this property */
  fileCount: number;
  /** Distinct value types found: 'string' | 'number' | 'array' | 'null' | 'boolean' | 'object' */
  valueTypes: Set<string>;
}

/** A specific file + property pair identified during scanning */
export interface PropertyOccurrence {
  file: TFile;
  propertyName: string;
  currentValue: PropertyValue;
}

/** Result of scanning for empty properties vault-wide */
export interface EmptyScanResult {
  /** Map from file path to array of empty property names */
  byFile: Map<string, { file: TFile; emptyProps: string[] }>;
  /** Total count of empty property occurrences */
  totalCount: number;
}

/** Result of analyzing a specific property across the vault */
export interface PropertyAnalysis {
  propertyName: string;
  /** All files that have this property */
  occurrences: PropertyOccurrence[];
  /** Files where the property is an array with exactly one element */
  singleValueFiles: PropertyOccurrence[];
  /** Files where the property is an array with multiple elements */
  multiValueFiles: PropertyOccurrence[];
  /** Files where the property is empty/null/undefined/[] */
  emptyFiles: PropertyOccurrence[];
  /** Files where the property is a plain string (not array) */
  textFiles: PropertyOccurrence[];
}

/**
 * A converter operation that can be applied to a property vault-wide.
 * Implement this interface to add a new operation.
 */
export interface PropertyConverter {
  /** Unique identifier, e.g. 'list-to-text' */
  id: string;
  /** Human-readable label shown in the operation selector */
  label: string;
  /** Description shown below the label */
  description: string;
  /**
   * Given the analysis of a property, return true if this operation
   * is applicable (should appear in the operation list).
   */
  isApplicable(analysis: PropertyAnalysis): boolean;
  /**
   * Execute the conversion.
   * Returns the number of files modified, or -1 if user cancelled.
   */
  execute(app: App, analysis: PropertyAnalysis): Promise<number>;
}
