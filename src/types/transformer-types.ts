import { Language } from '../lang/LanguageManager';

export interface TransformerSettings {
	language: Language;
	targetFolder: string;
	analysisFileName: string;
	propertyList: string;
	overwrite: boolean;
	removeSourceAfterTransform: boolean;
	tagsInYamlZone: boolean;
	tagSearchLocation: 'yaml' | 'content' | 'both';
	analysisType: 'by-property' | 'by-file';
	enableLogging: boolean;
	appendToExistingProperty: boolean;
}

export const DEFAULT_TRANSFORMER_SETTINGS: TransformerSettings = {
	language: 'en',
	targetFolder: '',
	analysisFileName: 'properties-analysis',
	propertyList: 'statut,type',
	overwrite: false,
	removeSourceAfterTransform: false,
	tagsInYamlZone: true,
	tagSearchLocation: 'both',
	analysisType: 'by-property',
	enableLogging: false,
	appendToExistingProperty: false
}

export interface ModificationLog {
	fileName: string;
	command: string;
	changes: Array<{
		type: 'property' | 'tag';
		action: 'added' | 'removed' | 'modified';
		before: string;
		after: string;
		location?: 'yaml' | 'content';
	}>;
}

export interface TagInfo {
	tag: string;
	location: 'yaml' | 'content';
}

export interface ParsedContent {
	metadata: any;
	frontmatter: string;
	body: string;
	yamlTags: string[];
	inlineTags: TagInfo[];
}
