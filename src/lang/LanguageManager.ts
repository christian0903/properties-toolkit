import { App } from 'obsidian';

// Import translations
import en from './en.json';
import fr from './fr.json';

export type Language = 'en' | 'fr';

export interface Translation {
	commands: Record<string, string>;
	settings: Record<string, string>;
	notices: Record<string, string>;
	log: Record<string, string>;
	analysis: Record<string, string>;
	report: Record<string, string>;
}

export class LanguageManager {
	private app: App;
	private currentLang: Language;
	private translations: Record<Language, Translation>;

	constructor(app: App, language?: Language) {
		this.app = app;
		this.translations = {
			en: en as Translation,
			fr: fr as Translation
		};
		this.currentLang = language || this.detectLanguage();
	}

	private detectLanguage(): Language {
		// Multiple methods to detect Obsidian language
		try {
			// Method 1: Via moment.js (used by Obsidian)
			const windowWithMoment = window as Window & { moment?: { locale: () => string } };
			const momentLang = windowWithMoment.moment?.locale();
			if (momentLang && momentLang.startsWith('fr')) return 'fr';

			// Method 2: Via DOM elements
			const htmlLang = document.documentElement.lang;
			if (htmlLang && htmlLang.startsWith('fr')) return 'fr';

		} catch {
			console.debug('Could not detect Obsidian language, falling back to English');
		}

		return 'en'; // Fallback to English
	}

	setLanguage(language: Language): void {
		this.currentLang = language;
	}

	getCurrentLanguage(): Language {
		return this.currentLang;
	}

	getAvailableLanguages(): Array<{value: Language, label: string}> {
		return [
			{ value: 'en', label: 'English' },
			{ value: 'fr', label: 'Français' }
		];
	}

	/**
	 * Get translation for a key with optional interpolation
	 * @param section - Section of translations (commands, settings, etc.)
	 * @param key - Translation key
	 * @param variables - Variables for interpolation ({{variable}})
	 */
	t(section: keyof Translation, key: string, variables?: Record<string, string>): string {
		const translation = this.translations[this.currentLang];
		let text = translation[section]?.[key];

		// Fallback to English if translation not found
		if (!text) {
			text = this.translations.en[section]?.[key];
		}

		// Final fallback to key itself
		if (!text) {
			text = key;
		}

		// Handle variable interpolation
		if (variables) {
			Object.entries(variables).forEach(([variable, value]) => {
				text = text.replace(new RegExp(`{{${variable}}}`, 'g'), value);
			});
		}

		return text;
	}

	/**
	 * Shorthand methods for common sections
	 */
	command(key: string): string {
		return this.t('commands', key);
	}

	setting(key: string): string {
		return this.t('settings', key);
	}

	notice(key: string, variables?: Record<string, string>): string {
		return this.t('notices', key, variables);
	}

	log(key: string): string {
		return this.t('log', key);
	}

	analysis(key: string): string {
		return this.t('analysis', key);
	}

	report(key: string): string {
		return this.t('report', key);
	}

	/**
	 * Get tag search location label based on current language
	 */
	getTagSearchLocationLabel(location: 'yaml' | 'content' | 'both'): string {
		switch (location) {
			case 'yaml':
				return this.setting('tag-search-yaml');
			case 'content':
				return this.setting('tag-search-content');
			case 'both':
				return this.setting('tag-search-both');
			default:
				return location;
		}
	}

	/**
	 * Get yes/no translation
	 */
	yesNo(value: boolean): string {
		return value ? this.log('yes') : this.log('no');
	}
}
