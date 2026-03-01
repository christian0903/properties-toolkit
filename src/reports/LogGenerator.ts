import { Notice } from 'obsidian';
import { ModificationLog, TransformerSettings } from '../types/transformer-types';
import { LanguageManager } from '../lang/LanguageManager';
import { FileManager } from '../core/FileManager';

export class LogGenerator {
	private settings: TransformerSettings;
	private languageManager: LanguageManager;
	private fileManager: FileManager;

	constructor(
		settings: TransformerSettings,
		languageManager: LanguageManager,
		fileManager: FileManager
	) {
		this.settings = settings;
		this.languageManager = languageManager;
		this.fileManager = fileManager;
	}

	/**
	 * Crée un fichier de log détaillé pour une commande
	 */
	async createDetailedLog(commandName: string, modificationLogs: ModificationLog[]): Promise<void> {
		if (!this.settings.enableLogging || modificationLogs.length === 0) {
			return;
		}

		// Utiliser l'heure locale au lieu d'UTC
		const now = new Date();
		const timestamp = now.getFullYear() + '-' +
			(now.getMonth() + 1).toString().padStart(2, '0') + '-' +
			now.getDate().toString().padStart(2, '0') + '_' +
			now.getHours().toString().padStart(2, '0') + '-' +
			now.getMinutes().toString().padStart(2, '0') + '-' +
			now.getSeconds().toString().padStart(2, '0');

		const logFileName = 'Log_Detaille_' + commandName.replace(/\s+/g, '_') + '_' + timestamp + '.md';

		let logContent = '# ' + this.languageManager.log('title') + '\n\n';
		logContent += '**' + this.languageManager.log('command-executed') + '**: ' + commandName + '\n';
		logContent += '**' + this.languageManager.log('date-time') + '**: ' + new Date().toLocaleString() + '\n';
		logContent += '**' + this.languageManager.log('files-modified') + '**: ' + modificationLogs.length + '\n\n';
		logContent += '---\n\n';

		// Grouper les changements par fichier pour une présentation plus claire
		const changesByFile: { [fileName: string]: ModificationLog } = {};

		for (const log of modificationLogs) {
			changesByFile[log.fileName] = log;
		}

		// Générer le contenu détaillé pour chaque fichier avec le nouveau format
		for (const [fileName, log] of Object.entries(changesByFile)) {
			// Séparer les changements par type pour une meilleure lisibilité
			const createdItems: string[] = [];
			const removedItems: string[] = [];
			const modifiedItems: string[] = [];

			for (const change of log.changes) {
				const itemDescription = change.type === 'property'
					? '**' + this.languageManager.log('property') + '**: `' + (change.after || change.before) + '`'
					: '**' + this.languageManager.log('tag') + '**: `' + (change.after || change.before) + '`' +
					  (change.location ? ' _(' + this.languageManager.log('location') + ': ' + change.location + ')_' : '');

				switch (change.action) {
					case 'added':
						createdItems.push(itemDescription);
						break;
					case 'removed':
						removedItems.push(itemDescription);
						break;
					case 'modified':
						modifiedItems.push(itemDescription + '\n     - ' + this.languageManager.log('before') + ': `' + change.before + '`\n     - ' + this.languageManager.log('after') + ': `' + change.after + '`');
						break;
				}
			}

			// Format de liste imbriquée demandé
			const totalChanges = createdItems.length + removedItems.length + modifiedItems.length;
			logContent += '* **' + this.languageManager.log('note') + '**: ' + fileName + '\n';
			logContent += '   * ' + totalChanges + ' ' + this.languageManager.log('changes-count') + '\n';

			// Afficher les éléments créés
			if (createdItems.length > 0) {
				logContent += '      * ' + this.languageManager.log('elements-created') + ' (' + createdItems.length + ')\n';
				for (const item of createdItems) {
					logContent += '         * ' + item + '\n';
				}
			}

			// Afficher les éléments supprimés
			if (removedItems.length > 0) {
				logContent += '      * ' + this.languageManager.log('elements-removed') + ' (' + removedItems.length + ')\n';
				for (const item of removedItems) {
					logContent += '         * ' + item + '\n';
				}
			}

			// Afficher les éléments modifiés
			if (modifiedItems.length > 0) {
				logContent += '      * ' + this.languageManager.log('elements-modified') + ' (' + modifiedItems.length + ')\n';
				for (const item of modifiedItems) {
					logContent += '         * ' + item + '\n';
				}
			}

			logContent += '\n';
		}

		// Statistiques globales
		logContent += '---\n\n';
		logContent += '## ' + this.languageManager.log('global-stats') + '\n\n';

		let totalCreated = 0;
		let totalRemoved = 0;
		let totalModified = 0;
		let propertiesAffected = 0;
		let tagsAffected = 0;

		for (const log of modificationLogs) {
			for (const change of log.changes) {
				switch (change.action) {
					case 'added':
						totalCreated++;
						break;
					case 'removed':
						totalRemoved++;
						break;
					case 'modified':
						totalModified++;
						break;
				}

				if (change.type === 'property') {
					propertiesAffected++;
				} else {
					tagsAffected++;
				}
			}
		}

		logContent += '- **' + this.languageManager.log('total-created') + '**: ' + totalCreated + '\n';
		logContent += '- **' + this.languageManager.log('total-removed') + '**: ' + totalRemoved + '\n';
		logContent += '- **' + this.languageManager.log('total-modified') + '**: ' + totalModified + '\n';
		logContent += '- **' + this.languageManager.log('properties-affected') + '**: ' + propertiesAffected + '\n';
		logContent += '- **' + this.languageManager.log('tags-affected') + '**: ' + tagsAffected + '\n\n';

		// Informations de configuration utilisée
		logContent += '## ' + this.languageManager.log('configuration-used') + '\n\n';
		logContent += '- **' + this.languageManager.log('target-folder') + '**: ' + (this.settings.targetFolder || this.languageManager.log('vault-root')) + '\n';
		logContent += '- **' + this.languageManager.log('properties-monitored') + '**: ' + this.settings.propertyList + '\n';
		logContent += '- **' + this.languageManager.log('overwrite-existing') + '**: ' + this.languageManager.yesNo(this.settings.overwrite) + '\n';
		logContent += '- **' + this.languageManager.log('append-to-property') + '**: ' + this.languageManager.yesNo(this.settings.appendToExistingProperty) + '\n';
		logContent += '- **' + this.languageManager.log('remove-source-after') + '**: ' + this.languageManager.yesNo(this.settings.removeSourceAfterTransform) + '\n';
		logContent += '- **' + this.languageManager.log('tags-in-yaml-zone') + '**: ' + this.languageManager.yesNo(this.settings.tagsInYamlZone) + '\n';
		logContent += '- **' + this.languageManager.log('tag-location') + '**: ' + this.languageManager.getTagSearchLocationLabel(this.settings.tagSearchLocation) + '\n\n';

		logContent += '---\n\n';
		logContent += '*' + this.languageManager.log('generated-by') + '*\n';

		try {
			await this.fileManager.createFile(logFileName, logContent);
			new Notice(this.languageManager.notice('log-created', { filename: logFileName }));
		} catch (error) {
			new Notice(this.languageManager.notice('log-error'));
			console.error(error);
		}
	}

	/**
	 * Génère un rapport de modifications
	 */
	async generateModificationReport(modificationLogs: ModificationLog[]): Promise<void> {
		if (modificationLogs.length === 0) {
			new Notice(this.languageManager.notice('no-modifications'));
			return;
		}

		const reportDate = new Date().toISOString().split('T')[0];
		const reportFileName = 'Rapport_Modifications_' + reportDate + '.md';

		let reportContent = '# ' + this.languageManager.report('title') + ' - ' + reportDate + '\n\n';
		reportContent += this.languageManager.report('generated-by') + '\n\n';
		reportContent += '## ' + this.languageManager.report('summary') + '\n\n';
		reportContent += '- ' + this.languageManager.report('files-modified') + ': ' + modificationLogs.length + '\n';
		reportContent += '- ' + this.languageManager.report('generation-date') + ': ' + new Date().toLocaleString() + '\n\n';

		reportContent += '## ' + this.languageManager.report('modification-details') + '\n\n';

		for (const log of modificationLogs) {
			reportContent += '### ' + log.fileName + '\n';
			reportContent += '**' + this.languageManager.report('command') + '**: ' + log.command + '\n\n';

			for (const change of log.changes) {
				reportContent += '- **' + this.languageManager.report(change.type) + '** ' + this.languageManager.report(change.action);
				if (change.location) {
					reportContent += ' (' + change.location + ')';
				}
				reportContent += '\n';
				if (change.before) {
					reportContent += '  - ' + this.languageManager.report('before') + ': `' + change.before + '`\n';
				}
				if (change.after) {
					reportContent += '  - ' + this.languageManager.report('after') + ': `' + change.after + '`\n';
				}
				reportContent += '\n';
			}
			reportContent += '---\n\n';
		}

		try {
			await this.fileManager.createFile(reportFileName, reportContent);
			new Notice(this.languageManager.notice('report-generated', { filename: reportFileName }));
		} catch (error) {
			new Notice(this.languageManager.notice('report-error'));
			console.error(error);
		}
	}

	/**
	 * Met à jour les settings
	 */
	updateSettings(newSettings: TransformerSettings): void {
		this.settings = newSettings;
	}
}
