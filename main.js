"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => PropertiesToolkitPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian14 = require("obsidian");

// src/lang/en.json
var en_default = {
  commands: {
    "delete-empty-properties": "Delete all empty properties (vault)",
    "convert-property": "Convert property type (vault)",
    "show-doc": "Help / Documentation",
    "transpose-properties-to-tags": "Transform properties to tags",
    "transpose-tags-to-properties": "Transform tags to properties",
    "remove-properties": "Remove corresponding properties",
    "remove-tags": "Remove corresponding tags",
    "analyze-property-tags": "Analyze property tags",
    "generate-modification-report": "Generate modification report",
    "search-replace-value": "Search and replace value in property"
  },
  settings: {
    title: "Properties Toolkit settings",
    "section-general": "General settings",
    "section-manager": "Property management",
    "section-transformer": "Property \u2194 tag transformation",
    language: "Language",
    "language-desc": "Plugin interface language",
    "target-folder": "Target folder",
    "target-folder-desc": "Folder where all operations will be applied (empty = entire vault)",
    "analysis-filename": "Analysis file name",
    "analysis-filename-desc": "Base name for the analysis file (date will be appended automatically)",
    "property-list": "Property list",
    "property-list-desc": "Properties to transform (comma separated)",
    "property-list-placeholder": "status,type,priority",
    overwrite: "Overwrite existing values",
    "overwrite-desc": "If enabled, overwrites existing properties/tags",
    "append-to-existing": "Add value to property if exists",
    "append-to-existing-desc": "If enabled, transforms property to list and adds value. If disabled, replaces existing value.",
    "remove-source": "Remove source after transformation",
    "remove-source-desc": "If enabled, removes original property/tag after conversion",
    "tags-in-yaml": "Tags in YAML zone",
    "tags-in-yaml-desc": "If enabled, tags are added to frontmatter",
    "tag-search-location": "Tag search location",
    "tag-search-location-desc": "Where to search for tags when transforming tags \u2192 properties",
    "tag-search-yaml": "YAML only",
    "tag-search-content": "Content only",
    "tag-search-both": "YAML and content",
    "analysis-type": "Analysis type",
    "analysis-type-desc": "Generated analysis report format",
    "analysis-by-property": "By properties and tags",
    "analysis-by-file": "By note (detailed)",
    "enable-logging": "Enable detailed logging",
    "enable-logging-desc": "If enabled, creates detailed log file for each transformation with all changes made"
  },
  notices: {
    "files-modified": "file(s) modified",
    "folder-not-found": 'Folder "{{folder}}" not found',
    "no-modifications": "No modifications to report",
    "no-properties": "No properties defined in settings",
    "log-created": "Detailed log created: {{filename}}",
    "log-error": "Error creating detailed log",
    "report-generated": "Report generated: {{filename}}",
    "report-error": "Error generating report",
    "analysis-generated": "{{type}} analysis generated: {{filename}}",
    "analysis-error": "Error generating analysis",
    "no-empty-properties": "No empty properties found in vault",
    "no-properties-vault": "No properties found in vault"
  },
  log: {
    title: "Detailed Transformation Log",
    "command-executed": "Command executed",
    "date-time": "Date and time",
    "files-modified": "Number of modified files",
    note: "Note",
    "changes-count": "change(s) made",
    "elements-created": "Elements created",
    "elements-removed": "Elements removed",
    "elements-modified": "Elements modified",
    property: "Property",
    tag: "Tag",
    location: "location",
    before: "Before",
    after: "After",
    summary: "Summary for this file",
    "global-stats": "Global statistics",
    "total-created": "Total created",
    "total-removed": "Total removed",
    "total-modified": "Total modified",
    "properties-affected": "Properties affected",
    "tags-affected": "Tags affected",
    "configuration-used": "Configuration used",
    "target-folder": "Target folder",
    "vault-root": "Vault root",
    "properties-monitored": "Monitored properties",
    "overwrite-existing": "Overwrite existing values",
    "append-to-property": "Add value to property if exists",
    "remove-source-after": "Remove source after transformation",
    "tags-in-yaml-zone": "Tags in YAML zone",
    "tag-location": "Tag location",
    yes: "Yes",
    no: "No",
    "generated-by": "Log automatically generated by Properties Toolkit Plugin"
  },
  analysis: {
    "by-property-title": "Analysis by Properties and Tags",
    "by-file-title": "Detailed Analysis by Note",
    "results-summary": "Results summary",
    "files-with-tags": "Files with relevant tags/properties",
    "total-tags-found": "Total tags found",
    "overview-by-property": "Overview by property",
    property: "Property",
    "in-yaml": "In YAML",
    "in-content": "In content",
    files: "file(s)",
    "detailed-analysis": "Detailed analysis by file",
    "current-state": "Current state",
    "properties-found": "Properties found",
    "yaml-tags-found": "YAML tags found",
    "inline-tags-found": "Inline tags found",
    "possible-transformations": "Possible transformations",
    "would-create-properties": '"Transform tags to properties" would create',
    "would-create-yaml-tags": '"Transform properties to tags" would create (YAML)',
    "would-create-inline-tags": '"Transform properties to tags" would create (inline)',
    "deletions-if-enabled": 'Deletions (if "Remove source" enabled)',
    "properties-would-be-deleted": "Properties that would be deleted",
    "yaml-tags-would-be-deleted": "YAML tags that would be deleted",
    "inline-tags-would-be-deleted": "Inline tags that would be deleted"
  },
  report: {
    title: "Modification Report",
    "generated-by": "Generated by Properties Toolkit Plugin",
    summary: "Summary",
    "files-modified": "Number of modified files",
    "generation-date": "Generation date",
    "modification-details": "Modification details",
    command: "Command",
    property: "property",
    tag: "tag",
    added: "added",
    removed: "removed",
    modified: "modified",
    before: "Before",
    after: "After"
  }
};

// src/lang/fr.json
var fr_default = {
  commands: {
    "delete-empty-properties": "Supprimer toutes les propri\xE9t\xE9s vides (vault)",
    "convert-property": "Convertir le type d'une propri\xE9t\xE9 (vault)",
    "show-doc": "Aide / Documentation",
    "transpose-properties-to-tags": "Transposer propri\xE9t\xE9s en tags",
    "transpose-tags-to-properties": "Transposer tags en propri\xE9t\xE9s",
    "remove-properties": "Effacer propri\xE9t\xE9s correspondantes",
    "remove-tags": "Effacer tags correspondants",
    "analyze-property-tags": "Analyser les tags de propri\xE9t\xE9s",
    "generate-modification-report": "G\xE9n\xE9rer rapport de modifications",
    "search-replace-value": "Rechercher et remplacer valeur dans propri\xE9t\xE9"
  },
  settings: {
    title: "Param\xE8tres Properties Toolkit",
    "section-general": "Param\xE8tres g\xE9n\xE9raux",
    "section-manager": "Gestion des propri\xE9t\xE9s",
    "section-transformer": "Transformation propri\xE9t\xE9 \u2194 tag",
    language: "Langue",
    "language-desc": "Langue de l'interface du plugin",
    "target-folder": "Dossier cible",
    "target-folder-desc": "Le dossier o\xF9 appliquer toutes les op\xE9rations (vide = tout le vault)",
    "analysis-filename": "Nom du fichier d'analyse",
    "analysis-filename-desc": "Nom de base du fichier d'analyse (la date sera ajout\xE9e automatiquement)",
    "property-list": "Liste de propri\xE9t\xE9s",
    "property-list-desc": "Propri\xE9t\xE9s \xE0 transformer (s\xE9par\xE9es par des virgules)",
    "property-list-placeholder": "statut,type,priorit\xE9",
    overwrite: "\xC9craser les valeurs existantes",
    "overwrite-desc": "Si activ\xE9, \xE9crase les propri\xE9t\xE9s/tags existants",
    "append-to-existing": "Ajouter valeur \xE0 propri\xE9t\xE9 si existe",
    "append-to-existing-desc": "Si activ\xE9, transforme la propri\xE9t\xE9 en liste et ajoute la valeur. Si d\xE9sactiv\xE9, remplace la valeur existante.",
    "remove-source": "Effacer source apr\xE8s transformation",
    "remove-source-desc": "Si activ\xE9, supprime la propri\xE9t\xE9/tag d'origine apr\xE8s conversion",
    "tags-in-yaml": "Tags dans zone YAML",
    "tags-in-yaml-desc": "Si activ\xE9, les tags sont ajout\xE9s dans le frontmatter",
    "tag-search-location": "Localisation des tags",
    "tag-search-location-desc": "O\xF9 chercher les tags lors de la transformation tags \u2192 propri\xE9t\xE9s",
    "tag-search-yaml": "Uniquement dans YAML",
    "tag-search-content": "Uniquement dans contenu",
    "tag-search-both": "YAML et contenu",
    "analysis-type": "Type d'analyse",
    "analysis-type-desc": "Format du rapport d'analyse g\xE9n\xE9r\xE9",
    "analysis-by-property": "Par propri\xE9t\xE9s et tags",
    "analysis-by-file": "Par note (d\xE9taill\xE9)",
    "enable-logging": "Activer le logging d\xE9taill\xE9",
    "enable-logging-desc": "Si activ\xE9, cr\xE9e un fichier de log d\xE9taill\xE9 pour chaque transformation avec tous les changements effectu\xE9s"
  },
  notices: {
    "files-modified": "fichier(s) modifi\xE9(s)",
    "folder-not-found": 'Dossier "{{folder}}" introuvable',
    "no-modifications": "Aucune modification \xE0 reporter",
    "no-properties": "Aucune propri\xE9t\xE9 d\xE9finie dans les param\xE8tres",
    "log-created": "Log d\xE9taill\xE9 cr\xE9\xE9: {{filename}}",
    "log-error": "Erreur lors de la cr\xE9ation du log d\xE9taill\xE9",
    "report-generated": "Rapport g\xE9n\xE9r\xE9: {{filename}}",
    "report-error": "Erreur lors de la g\xE9n\xE9ration du rapport",
    "analysis-generated": "Analyse {{type}} g\xE9n\xE9r\xE9e: {{filename}}",
    "analysis-error": "Erreur lors de la g\xE9n\xE9ration de l'analyse",
    "no-empty-properties": "Aucune propri\xE9t\xE9 vide trouv\xE9e dans le vault",
    "no-properties-vault": "Aucune propri\xE9t\xE9 trouv\xE9e dans le vault"
  },
  log: {
    title: "Log D\xE9taill\xE9 des Transformations",
    "command-executed": "Commande ex\xE9cut\xE9e",
    "date-time": "Date et heure",
    "files-modified": "Nombre de fichiers modifi\xE9s",
    note: "Note",
    "changes-count": "changement(s) effectu\xE9(s)",
    "elements-created": "\xC9l\xE9ments cr\xE9\xE9s",
    "elements-removed": "\xC9l\xE9ments supprim\xE9s",
    "elements-modified": "\xC9l\xE9ments modifi\xE9s",
    property: "Propri\xE9t\xE9",
    tag: "Tag",
    location: "localisation",
    before: "Avant",
    after: "Apr\xE8s",
    summary: "R\xE9sum\xE9 pour ce fichier",
    "global-stats": "Statistiques globales",
    "total-created": "Total cr\xE9\xE9",
    "total-removed": "Total supprim\xE9",
    "total-modified": "Total modifi\xE9",
    "properties-affected": "Propri\xE9t\xE9s affect\xE9es",
    "tags-affected": "Tags affect\xE9s",
    "configuration-used": "Configuration utilis\xE9e",
    "target-folder": "Dossier cible",
    "vault-root": "Racine du vault",
    "properties-monitored": "Propri\xE9t\xE9s surveill\xE9es",
    "overwrite-existing": "\xC9craser valeurs existantes",
    "append-to-property": "Ajouter valeur \xE0 propri\xE9t\xE9 si existe",
    "remove-source-after": "Effacer source apr\xE8s transformation",
    "tags-in-yaml-zone": "Tags dans zone YAML",
    "tag-location": "Localisation des tags",
    yes: "Oui",
    no: "Non",
    "generated-by": "Log g\xE9n\xE9r\xE9 automatiquement par Properties Toolkit Plugin"
  },
  analysis: {
    "by-property-title": "Analyse par Propri\xE9t\xE9s et Tags",
    "by-file-title": "Analyse D\xE9taill\xE9e par Note",
    "results-summary": "R\xE9sum\xE9 des r\xE9sultats",
    "files-with-tags": "Fichiers avec tags/propri\xE9t\xE9s concern\xE9s",
    "total-tags-found": "Total des tags trouv\xE9s",
    "overview-by-property": "Vue d'ensemble par propri\xE9t\xE9",
    property: "Propri\xE9t\xE9",
    "in-yaml": "Dans YAML",
    "in-content": "Dans contenu",
    files: "fichier(s)",
    "detailed-analysis": "Analyse d\xE9taill\xE9e par fichier",
    "current-state": "\xC9tat actuel",
    "properties-found": "Propri\xE9t\xE9s trouv\xE9es",
    "yaml-tags-found": "Tags YAML trouv\xE9s",
    "inline-tags-found": "Tags inline trouv\xE9s",
    "possible-transformations": "Transformations possibles",
    "would-create-properties": '"Transposer tags en propri\xE9t\xE9s" cr\xE9erait',
    "would-create-yaml-tags": '"Transposer propri\xE9t\xE9s en tags" cr\xE9erait (YAML)',
    "would-create-inline-tags": '"Transposer propri\xE9t\xE9s en tags" cr\xE9erait (inline)',
    "deletions-if-enabled": 'Suppressions (si "Effacer source" activ\xE9)',
    "properties-would-be-deleted": "Propri\xE9t\xE9s qui seraient supprim\xE9es",
    "yaml-tags-would-be-deleted": "Tags YAML qui seraient supprim\xE9s",
    "inline-tags-would-be-deleted": "Tags inline qui seraient supprim\xE9s"
  },
  report: {
    title: "Rapport de Modifications",
    "generated-by": "G\xE9n\xE9r\xE9 par Properties Toolkit Plugin",
    summary: "R\xE9sum\xE9",
    "files-modified": "Nombre de fichiers modifi\xE9s",
    "generation-date": "Date de g\xE9n\xE9ration",
    "modification-details": "D\xE9tails des modifications",
    command: "Commande",
    property: "propri\xE9t\xE9",
    tag: "tag",
    added: "ajout\xE9",
    removed: "supprim\xE9",
    modified: "modifi\xE9",
    before: "Avant",
    after: "Apr\xE8s"
  }
};

// src/lang/LanguageManager.ts
var LanguageManager = class {
  constructor(app, language) {
    this.app = app;
    this.translations = {
      en: en_default,
      fr: fr_default
    };
    this.currentLang = language || this.detectLanguage();
  }
  detectLanguage() {
    var _a;
    try {
      const windowWithMoment = window;
      const momentLang = (_a = windowWithMoment.moment) == null ? void 0 : _a.locale();
      if (momentLang && momentLang.startsWith("fr"))
        return "fr";
      const htmlLang = document.documentElement.lang;
      if (htmlLang && htmlLang.startsWith("fr"))
        return "fr";
    } catch (e) {
      console.debug("Could not detect Obsidian language, falling back to English");
    }
    return "en";
  }
  setLanguage(language) {
    this.currentLang = language;
  }
  getCurrentLanguage() {
    return this.currentLang;
  }
  getAvailableLanguages() {
    return [
      { value: "en", label: "English" },
      { value: "fr", label: "Fran\xE7ais" }
    ];
  }
  /**
   * Get translation for a key with optional interpolation
   * @param section - Section of translations (commands, settings, etc.)
   * @param key - Translation key
   * @param variables - Variables for interpolation ({{variable}})
   */
  t(section, key, variables) {
    var _a, _b;
    const translation = this.translations[this.currentLang];
    let text = (_a = translation[section]) == null ? void 0 : _a[key];
    if (!text) {
      text = (_b = this.translations.en[section]) == null ? void 0 : _b[key];
    }
    if (!text) {
      text = key;
    }
    if (variables) {
      Object.entries(variables).forEach(([variable, value]) => {
        text = text.replace(new RegExp(`{{${variable}}}`, "g"), value);
      });
    }
    return text;
  }
  /**
   * Shorthand methods for common sections
   */
  command(key) {
    return this.t("commands", key);
  }
  setting(key) {
    return this.t("settings", key);
  }
  notice(key, variables) {
    return this.t("notices", key, variables);
  }
  log(key) {
    return this.t("log", key);
  }
  analysis(key) {
    return this.t("analysis", key);
  }
  report(key) {
    return this.t("report", key);
  }
  /**
   * Get tag search location label based on current language
   */
  getTagSearchLocationLabel(location) {
    switch (location) {
      case "yaml":
        return this.setting("tag-search-yaml");
      case "content":
        return this.setting("tag-search-content");
      case "both":
        return this.setting("tag-search-both");
      default:
        return location;
    }
  }
  /**
   * Get yes/no translation
   */
  yesNo(value) {
    return value ? this.log("yes") : this.log("no");
  }
};

// src/types/transformer-types.ts
var DEFAULT_TRANSFORMER_SETTINGS = {
  language: "en",
  targetFolder: "",
  analysisFileName: "properties-analysis",
  propertyList: "statut,type",
  overwrite: false,
  removeSourceAfterTransform: false,
  tagsInYamlZone: true,
  tagSearchLocation: "both",
  analysisType: "by-property",
  enableLogging: false,
  appendToExistingProperty: false
};

// src/core/scanner.ts
var import_obsidian = require("obsidian");
function isEmpty(value) {
  if (value === null || value === void 0)
    return true;
  if (value === "")
    return true;
  if (Array.isArray(value) && value.length === 0)
    return true;
  return false;
}
function getValueType(value) {
  if (value === null || value === void 0)
    return "null";
  if (Array.isArray(value))
    return "array";
  return typeof value;
}
var VaultScanner = class {
  constructor(app, settings) {
    this.app = app;
    this.settings = settings;
  }
  /**
   * Update settings reference
   */
  updateSettings(settings) {
    this.settings = settings;
  }
  /**
   * Get target files based on targetFolder setting
   */
  getTargetFiles() {
    const folderPath = this.settings.targetFolder.trim();
    if (!folderPath) {
      return this.app.vault.getMarkdownFiles();
    }
    const normalizedPath = (0, import_obsidian.normalizePath)(folderPath);
    const folder = this.app.vault.getAbstractFileByPath(normalizedPath);
    if (!folder) {
      return [];
    }
    if (folder instanceof import_obsidian.TFile) {
      return folder.extension === "md" ? [folder] : [];
    }
    if (folder instanceof import_obsidian.TFolder) {
      const getAllFiles = (currentFolder) => {
        const result = [];
        for (const child of currentFolder.children) {
          if (child instanceof import_obsidian.TFile && child.extension === "md") {
            result.push(child);
          } else if (child instanceof import_obsidian.TFolder) {
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
  getAllProperties() {
    const map = /* @__PURE__ */ new Map();
    const files = this.getTargetFiles();
    for (const file of files) {
      const cache = this.app.metadataCache.getFileCache(file);
      const fm = cache == null ? void 0 : cache.frontmatter;
      if (!fm)
        continue;
      for (const key of Object.keys(fm)) {
        if (key === "position")
          continue;
        const existing = map.get(key);
        if (existing) {
          existing.fileCount++;
          existing.valueTypes.add(getValueType(fm[key]));
        } else {
          map.set(key, {
            name: key,
            fileCount: 1,
            valueTypes: /* @__PURE__ */ new Set([getValueType(fm[key])])
          });
        }
      }
    }
    return Array.from(map.values()).sort(
      (a, b) => a.name.localeCompare(b.name)
    );
  }
  /** Scan the target files for all empty property occurrences */
  scanEmptyProperties() {
    const byFile = /* @__PURE__ */ new Map();
    let totalCount = 0;
    const files = this.getTargetFiles();
    for (const file of files) {
      const cache = this.app.metadataCache.getFileCache(file);
      const fm = cache == null ? void 0 : cache.frontmatter;
      if (!fm)
        continue;
      const emptyProps = [];
      for (const key of Object.keys(fm)) {
        if (key === "position")
          continue;
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
  analyzeProperty(propertyName) {
    const occurrences = [];
    const singleValueFiles = [];
    const multiValueFiles = [];
    const emptyFiles = [];
    const textFiles = [];
    const files = this.getTargetFiles();
    for (const file of files) {
      const cache = this.app.metadataCache.getFileCache(file);
      const fm = cache == null ? void 0 : cache.frontmatter;
      if (!fm || !(propertyName in fm))
        continue;
      const value = fm[propertyName];
      const occ = { file, propertyName, currentValue: value };
      occurrences.push(occ);
      if (isEmpty(value)) {
        emptyFiles.push(occ);
      } else if (Array.isArray(value)) {
        if (value.length === 1) {
          singleValueFiles.push(occ);
        } else {
          multiValueFiles.push(occ);
        }
      } else if (typeof value === "string") {
        textFiles.push(occ);
      }
    }
    return {
      propertyName,
      occurrences,
      singleValueFiles,
      multiValueFiles,
      emptyFiles,
      textFiles
    };
  }
};

// src/converters/registry.ts
var ConverterRegistry = class {
  constructor() {
    this.converters = [];
  }
  register(converter) {
    this.converters.push(converter);
  }
  getAll() {
    return [...this.converters];
  }
  getById(id) {
    return this.converters.find((c) => c.id === id);
  }
};

// src/modals/preview-modal.ts
var import_obsidian2 = require("obsidian");
var PreviewModal = class extends import_obsidian2.Modal {
  constructor(app, config) {
    super(app);
    this.config = config;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("pt-modal");
    contentEl.createEl("h2", { text: this.config.title });
    const summary = contentEl.createEl("div", { cls: "pt-summary" });
    summary.setText(`${this.config.items.length} file(s) affected`);
    const list = contentEl.createEl("div", { cls: "pt-preview-list" });
    const MAX_VISIBLE = 200;
    const itemsToShow = this.config.items.slice(0, MAX_VISIBLE);
    for (const item of itemsToShow) {
      const row = list.createEl("div", { cls: "pt-preview-item" });
      row.createEl("span", { cls: "pt-file-name", text: item.fileName });
      row.createEl("span", { cls: "pt-detail", text: item.detail });
    }
    if (this.config.items.length > MAX_VISIBLE) {
      list.createEl("div", {
        cls: "pt-preview-item",
        text: `... and ${this.config.items.length - MAX_VISIBLE} more`
      });
    }
    const buttons = contentEl.createEl("div", { cls: "pt-button-row" });
    const cancelBtn = buttons.createEl("button", { text: "Cancel" });
    cancelBtn.addEventListener("click", () => this.close());
    const confirmBtn = buttons.createEl("button", {
      text: this.config.confirmLabel,
      cls: "mod-cta"
    });
    confirmBtn.addEventListener("click", () => {
      this.close();
      this.config.onConfirm();
    });
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/modals/progress-modal.ts
var import_obsidian3 = require("obsidian");
var ProgressModal = class extends import_obsidian3.Modal {
  constructor(app, title) {
    super(app);
    this.title = title;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("pt-modal");
    contentEl.createEl("h2", { text: this.title });
    const container = contentEl.createEl("div", { cls: "pt-progress-container" });
    this.progressEl = container.createEl("progress");
    this.progressEl.max = 100;
    this.progressEl.value = 0;
    this.textEl = container.createEl("div", { cls: "pt-progress-text" });
    this.textEl.setText("Preparing...");
    this.modalEl.querySelectorAll(".modal-close-button").forEach((el) => {
      el.addClass("pt-close-button-hidden");
    });
  }
  setProgress(current, total) {
    this.progressEl.value = current / total * 100;
    this.textEl.setText(`Processing ${current} / ${total}...`);
  }
  finish(message) {
    this.textEl.setText(message);
    this.progressEl.value = 100;
    this.modalEl.querySelectorAll(".modal-close-button").forEach((el) => {
      el.removeClass("pt-close-button-hidden");
    });
    const buttons = this.contentEl.createEl("div", { cls: "pt-button-row" });
    buttons.createEl("button", { text: "Close", cls: "mod-cta" }).addEventListener("click", () => this.close());
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/modals/multi-value-choice-modal.ts
var import_obsidian4 = require("obsidian");
var MultiValueChoiceModal = class extends import_obsidian4.Modal {
  constructor(app, propertyName, multiValueFiles, onConfirm) {
    super(app);
    this.choices = /* @__PURE__ */ new Map();
    this.propertyName = propertyName;
    this.multiValueFiles = multiValueFiles;
    this.onConfirm = onConfirm;
    for (const occ of multiValueFiles) {
      if (Array.isArray(occ.currentValue) && occ.currentValue.length > 0) {
        this.choices.set(occ.file.path, occ.currentValue[0]);
      }
    }
  }
  onOpen() {
    var _a;
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("pt-modal");
    contentEl.createEl("h2", {
      text: `List \u2192 Text : "${this.propertyName}"`
    });
    contentEl.createEl("p", {
      text: `${this.multiValueFiles.length} file(s) have multiple values. Select the value to keep for each file.`
    });
    const list = contentEl.createEl("div", { cls: "pt-preview-list" });
    for (const occ of this.multiValueFiles) {
      const values = Array.isArray(occ.currentValue) ? occ.currentValue : [occ.currentValue];
      const groupName = `pt-radio-${occ.file.path.replace(/[^a-zA-Z0-9]/g, "_")}`;
      const fileBlock = list.createEl("div", { cls: "pt-radio-file" });
      const header = fileBlock.createEl("div", { cls: "pt-radio-file-header" });
      header.createEl("span", { cls: "pt-file-name", text: occ.file.basename });
      header.createEl("span", {
        cls: "pt-detail",
        text: ((_a = occ.file.parent) == null ? void 0 : _a.path) || ""
      });
      const valuesContainer = fileBlock.createEl("div", { cls: "pt-radio-values" });
      for (let i = 0; i < values.length; i++) {
        const val = values[i];
        const label = valuesContainer.createEl("label", { cls: "pt-radio-label" });
        const radio = label.createEl("input", { type: "radio" });
        radio.name = groupName;
        radio.checked = i === 0;
        radio.addEventListener("change", () => {
          if (radio.checked) {
            this.choices.set(occ.file.path, val);
          }
        });
        label.createEl("span", { text: String(val) });
      }
    }
    const buttons = contentEl.createEl("div", { cls: "pt-button-row" });
    const cancelBtn = buttons.createEl("button", { text: "Cancel" });
    cancelBtn.addEventListener("click", () => this.close());
    const confirmBtn = buttons.createEl("button", {
      text: `Convert ${this.multiValueFiles.length} file(s)`,
      cls: "mod-cta"
    });
    confirmBtn.addEventListener("click", () => {
      this.close();
      this.onConfirm(this.choices);
    });
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/core/type-updater.ts
async function updatePropertyType(app, propertyName, newType) {
  const typesPath = `${app.vault.configDir}/types.json`;
  let data = { types: {} };
  try {
    const raw = await app.vault.adapter.read(typesPath);
    data = JSON.parse(raw);
  } catch (e) {
    data = { types: {} };
  }
  data.types[propertyName] = newType;
  await app.vault.adapter.write(typesPath, JSON.stringify(data, null, "  "));
}

// src/converters/list-to-text.ts
var ListToTextConverter = class {
  constructor() {
    this.id = "list-to-text";
    this.label = "List \u2192 Text";
    this.description = "Convert list values to plain text (keeps a single value)";
  }
  isApplicable(analysis) {
    return analysis.singleValueFiles.length > 0 || analysis.multiValueFiles.length > 0;
  }
  execute(app, analysis) {
    return new Promise((resolve) => {
      const propName = analysis.propertyName;
      const singleFiles = analysis.singleValueFiles;
      const multiFiles = analysis.multiValueFiles;
      const autoConversions = singleFiles.map((occ) => ({
        file: occ.file,
        chosenValue: Array.isArray(occ.currentValue) ? occ.currentValue[0] : occ.currentValue
      }));
      if (multiFiles.length > 0) {
        new MultiValueChoiceModal(app, propName, multiFiles, (choices) => {
          const multiConversions = multiFiles.map((occ) => ({
            file: occ.file,
            chosenValue: choices.get(occ.file.path)
          }));
          const allConversions = [...autoConversions, ...multiConversions];
          this.showPreviewAndExecute(app, propName, allConversions, resolve);
        }).open();
      } else {
        this.showPreviewAndExecute(app, propName, autoConversions, resolve);
      }
    });
  }
  showPreviewAndExecute(app, propName, conversions, resolve) {
    if (conversions.length === 0) {
      resolve(0);
      return;
    }
    const items = conversions.map((conv) => ({
      filePath: conv.file.path,
      fileName: conv.file.basename,
      detail: `\u2192 "${conv.chosenValue}"`
    }));
    new PreviewModal(app, {
      title: `List \u2192 Text : "${propName}"`,
      items,
      confirmLabel: `Convert ${conversions.length} file(s)`,
      onConfirm: () => {
        void (async () => {
          const progress = new ProgressModal(app, `Conversion de "${propName}"...`);
          progress.open();
          let count = 0;
          for (const conv of conversions) {
            const val = conv.chosenValue;
            await app.fileManager.processFrontMatter(conv.file, (fm) => {
              fm[propName] = val;
            });
            count++;
            progress.setProgress(count, conversions.length);
            if (count % 50 === 0) {
              await new Promise((r) => setTimeout(r, 0));
            }
          }
          await updatePropertyType(app, propName, "text");
          progress.finish(`Done: ${count} file(s) converted.`);
          resolve(count);
        })();
      }
    }).open();
  }
};

// src/converters/text-to-list.ts
var TextToListConverter = class {
  constructor() {
    this.id = "text-to-list";
    this.label = "Text \u2192 List";
    this.description = "Convert text values to list (wraps each value in a list)";
  }
  isApplicable(analysis) {
    return analysis.textFiles.length > 0;
  }
  execute(app, analysis) {
    return new Promise((resolve) => {
      const propName = analysis.propertyName;
      const textFiles = analysis.textFiles;
      const items = textFiles.map((occ) => ({
        filePath: occ.file.path,
        fileName: occ.file.basename,
        detail: `"${occ.currentValue}" \u2192 ["${occ.currentValue}"]`
      }));
      new PreviewModal(app, {
        title: `Text \u2192 List : "${propName}"`,
        items,
        confirmLabel: `Convert ${textFiles.length} file(s)`,
        onConfirm: () => {
          void (async () => {
            const progress = new ProgressModal(app, `Conversion de "${propName}"...`);
            progress.open();
            let count = 0;
            for (const occ of textFiles) {
              await app.fileManager.processFrontMatter(occ.file, (fm) => {
                if (typeof fm[propName] === "string") {
                  fm[propName] = [fm[propName]];
                }
              });
              count++;
              progress.setProgress(count, textFiles.length);
              if (count % 50 === 0) {
                await new Promise((r) => setTimeout(r, 0));
              }
            }
            await updatePropertyType(app, propName, "multitext");
            progress.finish(`Done: ${count} file(s) converted.`);
            resolve(count);
          })();
        }
      }).open();
    });
  }
};

// src/converters/delete-empty.ts
var DeleteEmptyConverter = class {
  constructor() {
    this.id = "delete-empty";
    this.label = "Delete empty values";
    this.description = "Delete this property in files where it is empty or null";
  }
  isApplicable(analysis) {
    return analysis.emptyFiles.length > 0;
  }
  execute(app, analysis) {
    return new Promise((resolve) => {
      const propName = analysis.propertyName;
      const emptyFiles = analysis.emptyFiles;
      const items = emptyFiles.map((occ) => ({
        filePath: occ.file.path,
        fileName: occ.file.basename,
        detail: `"${propName}" will be deleted`
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
              await app.fileManager.processFrontMatter(occ.file, (fm) => {
                delete fm[propName];
              });
              count++;
              progress.setProgress(count, emptyFiles.length);
              if (count % 50 === 0) {
                await new Promise((r) => setTimeout(r, 0));
              }
            }
            progress.finish(`Done: "${propName}" deleted in ${count} file(s).`);
            resolve(count);
          })();
        }
      }).open();
    });
  }
};

// src/modals/property-selector.ts
var import_obsidian5 = require("obsidian");
var PropertySelectorModal = class extends import_obsidian5.FuzzySuggestModal {
  constructor(app, properties, onChoose) {
    super(app);
    this.properties = properties;
    this.onChoose = onChoose;
    this.setPlaceholder("Type to filter properties...");
  }
  getItems() {
    return this.properties;
  }
  getItemText(item) {
    return `${item.name} (${item.fileCount} files)`;
  }
  onChooseItem(item, _evt) {
    this.onChoose(item.name);
  }
};

// src/modals/operation-selector.ts
var import_obsidian6 = require("obsidian");
var OperationSelectorModal = class extends import_obsidian6.SuggestModal {
  constructor(app, converters, onChoose) {
    super(app);
    this.converters = converters;
    this.onChoose = onChoose;
    this.setPlaceholder("Choose an operation...");
  }
  getSuggestions(query) {
    const q = query.toLowerCase();
    return this.converters.filter(
      (c) => c.label.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    );
  }
  renderSuggestion(converter, el) {
    el.createEl("div", { text: converter.label, cls: "pt-suggest-title" });
    el.createEl("small", { text: converter.description, cls: "pt-suggest-desc" });
  }
  onChooseSuggestion(converter, _evt) {
    this.onChoose(converter);
  }
};

// src/core/FrontmatterParser.ts
var FrontmatterParser = class {
  /**
   * Parse file content to extract frontmatter, metadata and tags
   */
  parseFrontmatter(content) {
    const frontmatterRegex = /^---\s*\n(.*?)\n---\s*\n?(.*?)$/s;
    const match = content.match(frontmatterRegex);
    const metadata = {};
    let frontmatterText = "";
    let body = "";
    let yamlTags = [];
    let inlineTags = [];
    if (match) {
      frontmatterText = match[1];
      body = match[2];
      const lines = frontmatterText.split("\n");
      let i = 0;
      while (i < lines.length) {
        const line = lines[i];
        const trimmedLine = line.trim();
        if (!trimmedLine || trimmedLine.startsWith("#")) {
          i++;
          continue;
        }
        const colonIndex = trimmedLine.indexOf(":");
        if (colonIndex === -1) {
          i++;
          continue;
        }
        const key = trimmedLine.substring(0, colonIndex).trim();
        const value = trimmedLine.substring(colonIndex + 1).trim();
        if (!key) {
          i++;
          continue;
        }
        if (key === "tags") {
          if (value) {
            if (value.startsWith("[") && value.endsWith("]")) {
              const tagContent = value.slice(1, -1);
              const tags = tagContent.split(",").map((t) => t.trim().replace(/^["']|["']$/g, "")).filter((t) => t.length > 0);
              metadata[key] = tags;
              yamlTags = tags;
            } else {
              const tag = value.replace(/^["']|["']$/g, "");
              metadata[key] = [tag];
              yamlTags = [tag];
            }
          } else {
            const arrayItems = [];
            i++;
            while (i < lines.length) {
              const nextLine = lines[i];
              const trimmed = nextLine.trim();
              if (trimmed.startsWith("- ")) {
                const item = trimmed.substring(2).trim().replace(/^["']|["']$/g, "");
                if (item)
                  arrayItems.push(item);
                i++;
              } else if (nextLine.startsWith("  ") && !trimmed.startsWith("- ")) {
                i++;
              } else {
                break;
              }
            }
            metadata[key] = arrayItems;
            yamlTags = arrayItems;
            continue;
          }
        } else {
          if (value) {
            if (value.startsWith("[") && value.endsWith("]")) {
              const arrayContent = value.slice(1, -1);
              const arrayValues = arrayContent.split(",").map((v) => v.trim().replace(/^["']|["']$/g, "")).filter((v) => v.length > 0);
              metadata[key] = arrayValues;
            } else {
              metadata[key] = value.replace(/^["']|["']$/g, "");
            }
          } else {
            const arrayItems = [];
            i++;
            while (i < lines.length) {
              const nextLine = lines[i];
              const trimmed = nextLine.trim();
              if (trimmed.startsWith("- ")) {
                const item = trimmed.substring(2).trim().replace(/^["']|["']$/g, "");
                if (item)
                  arrayItems.push(item);
                i++;
              } else if (nextLine.startsWith("  ") && !trimmed.startsWith("- ")) {
                i++;
              } else {
                break;
              }
            }
            if (arrayItems.length > 0) {
              metadata[key] = arrayItems;
            }
            continue;
          }
        }
        i++;
      }
    } else {
      body = content;
    }
    const tagRegex = /#([a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*)/g;
    let tagMatch;
    const foundInlineTags = /* @__PURE__ */ new Set();
    while ((tagMatch = tagRegex.exec(body)) !== null) {
      const tag = tagMatch[1];
      if (!foundInlineTags.has(tag)) {
        foundInlineTags.add(tag);
        inlineTags.push({
          tag,
          location: "content"
        });
      }
    }
    return { metadata, frontmatter: frontmatterText, body, yamlTags, inlineTags };
  }
  /**
   * Rebuild content with modified metadata
   */
  rebuildContent(metadata, body, tagsToRemoveFromContent = [], tagsInYamlZone = true) {
    if (tagsToRemoveFromContent.length > 0) {
      for (const tagToRemove of tagsToRemoveFromContent) {
        const tagWithHash = "#" + tagToRemove;
        body = body.replace(new RegExp(tagWithHash + "(?=\\s|$)", "g"), "");
        body = body.replace(new RegExp(tagToRemove + "(?=\\s|$)", "g"), "");
        body = body.replace(/\s+/g, " ");
        const lines = body.split("\n").filter((line) => line.trim().length > 0);
        body = lines.join("\n");
      }
    }
    let frontmatterContent = "";
    let tagsToAddInline = [];
    let hasFrontmatterProperties = false;
    for (const [key, value] of Object.entries(metadata)) {
      if (value === void 0 || value === null) {
        continue;
      }
      if (key === "tags" && Array.isArray(value)) {
        if (value.length > 0) {
          if (tagsInYamlZone) {
            const formattedTags = value.map((tag) => '"' + tag + '"').join(", ");
            frontmatterContent += key + ": [" + formattedTags + "]\n";
            hasFrontmatterProperties = true;
          } else {
            tagsToAddInline = value;
          }
        }
      } else if (Array.isArray(value)) {
        if (value.length > 0) {
          frontmatterContent += key + ":\n";
          for (const item of value) {
            const escapedItem = item.toString().replace(/"/g, '\\"');
            frontmatterContent += "  - " + escapedItem + "\n";
          }
          hasFrontmatterProperties = true;
        }
      } else if (typeof value === "string" && value.length > 0) {
        const escapedValue = value.replace(/"/g, '\\"');
        frontmatterContent += key + ': "' + escapedValue + '"\n';
        hasFrontmatterProperties = true;
      } else if (typeof value === "number" || typeof value === "boolean") {
        frontmatterContent += key + ": " + value + "\n";
        hasFrontmatterProperties = true;
      }
    }
    if (tagsToAddInline.length > 0 && !tagsInYamlZone) {
      const inlineTags = tagsToAddInline.map((tag) => "#" + tag).join(" ");
      body = body.trim();
      if (body.length > 0) {
        body = inlineTags + "\n\n" + body;
      } else {
        body = inlineTags;
      }
    }
    if (hasFrontmatterProperties) {
      const frontmatter = "---\n" + frontmatterContent + "---\n";
      if (body.trim().length > 0) {
        return frontmatter + "\n" + body;
      } else {
        return frontmatter;
      }
    } else {
      if (body.trim().length > 0) {
        return body;
      } else {
        return "";
      }
    }
  }
};

// src/core/FileManager.ts
var import_obsidian7 = require("obsidian");
var FileManager = class {
  constructor(app, settings, languageManager) {
    this.app = app;
    this.settings = settings;
    this.languageManager = languageManager;
  }
  /**
   * Determine files to process based on targetFolder setting
   */
  getTargetFiles() {
    const folderPath = this.settings.targetFolder.trim();
    if (!folderPath) {
      return this.app.vault.getMarkdownFiles();
    }
    const normalizedPath = (0, import_obsidian7.normalizePath)(folderPath);
    const folder = this.app.vault.getAbstractFileByPath(normalizedPath);
    if (!folder) {
      new import_obsidian7.Notice(this.languageManager.notice("folder-not-found", { folder: folderPath }));
      return [];
    }
    if (folder instanceof import_obsidian7.TFile) {
      return folder.extension === "md" ? [folder] : [];
    }
    if (folder instanceof import_obsidian7.TFolder) {
      const getAllFiles = (currentFolder) => {
        const result = [];
        for (const child of currentFolder.children) {
          if (child instanceof import_obsidian7.TFile && child.extension === "md") {
            result.push(child);
          } else if (child instanceof import_obsidian7.TFolder) {
            result.push(...getAllFiles(child));
          }
        }
        return result;
      };
      return getAllFiles(folder);
    }
    return [];
  }
  /**
   * Parse property list from settings
   */
  getPropertyList() {
    return this.settings.propertyList.split(",").map((prop) => prop.trim()).filter((prop) => prop.length > 0);
  }
  /**
   * Read file content
   */
  async readFile(file) {
    return await this.app.vault.read(file);
  }
  /**
   * Modify file content
   */
  async writeFile(file, content) {
    await this.app.vault.modify(file, content);
  }
  /**
   * Create or overwrite a file
   */
  async createFile(path, content) {
    const normalizedPath = (0, import_obsidian7.normalizePath)(path);
    const existingFile = this.app.vault.getAbstractFileByPath(normalizedPath);
    if (existingFile instanceof import_obsidian7.TFile) {
      await this.app.vault.modify(existingFile, content);
    } else {
      await this.app.vault.create(normalizedPath, content);
    }
  }
  /**
   * Update settings (used by other modules)
   */
  updateSettings(newSettings) {
    this.settings = newSettings;
  }
};

// src/core/PropertyTransformer.ts
var import_obsidian8 = require("obsidian");
var PropertyTransformer = class {
  constructor(settings, languageManager, frontmatterParser, fileManager) {
    this.modificationLogs = [];
    this.settings = settings;
    this.languageManager = languageManager;
    this.frontmatterParser = frontmatterParser;
    this.fileManager = fileManager;
  }
  /**
   * Convert YAML properties to tags
   */
  async transposePropertiesToTags() {
    const files = this.fileManager.getTargetFiles();
    const propertyList = this.fileManager.getPropertyList();
    let modifiedCount = 0;
    this.modificationLogs = [];
    for (const file of files) {
      const content = await this.fileManager.readFile(file);
      const { metadata, body } = this.frontmatterParser.parseFrontmatter(content);
      let modified = false;
      const log = {
        fileName: file.path,
        command: this.languageManager.command("transpose-properties-to-tags"),
        changes: []
      };
      for (const propName of propertyList) {
        if (metadata[propName]) {
          const propValue = metadata[propName];
          const valuesToProcess = Array.isArray(propValue) ? propValue : [propValue];
          const existingTags = metadata.tags || [];
          let updatedTags = [...existingTags];
          if (this.settings.overwrite) {
            const oldTags = updatedTags.filter((tag) => tag.startsWith(propName + "/"));
            updatedTags = updatedTags.filter((tag) => !tag.startsWith(propName + "/"));
            if (oldTags.length > 0) {
              log.changes.push({
                type: "tag",
                action: "removed",
                before: oldTags.join(", "),
                after: ""
              });
            }
          }
          const newTags = [];
          for (const singleValue of valuesToProcess) {
            const newTag = propName + "/" + singleValue;
            if (!updatedTags.includes(newTag)) {
              updatedTags.push(newTag);
              newTags.push(newTag);
              modified = true;
            }
          }
          if (newTags.length > 0) {
            log.changes.push({
              type: "tag",
              action: "added",
              before: "",
              after: newTags.join(", ")
            });
          }
          metadata.tags = updatedTags;
          if (this.settings.removeSourceAfterTransform) {
            log.changes.push({
              type: "property",
              action: "removed",
              before: propName + ": " + (Array.isArray(propValue) ? "[" + propValue.join(", ") + "]" : propValue),
              after: ""
            });
            delete metadata[propName];
            modified = true;
          }
        }
      }
      if (modified) {
        const newContent = this.frontmatterParser.rebuildContent(metadata, body, [], this.settings.tagsInYamlZone);
        await this.fileManager.writeFile(file, newContent);
        modifiedCount++;
        if (log.changes.length > 0) {
          this.modificationLogs.push(log);
        }
      }
    }
    new import_obsidian8.Notice(modifiedCount + " " + this.languageManager.notice("files-modified"));
    return this.modificationLogs;
  }
  /**
   * Convert tags to YAML properties
   */
  async transposeTagsToProperties() {
    const files = this.fileManager.getTargetFiles();
    const propertyList = this.fileManager.getPropertyList();
    let modifiedCount = 0;
    this.modificationLogs = [];
    for (const file of files) {
      const content = await this.fileManager.readFile(file);
      const { metadata, body, yamlTags, inlineTags } = this.frontmatterParser.parseFrontmatter(content);
      let modified = false;
      const log = {
        fileName: file.path,
        command: this.languageManager.command("transpose-tags-to-properties"),
        changes: []
      };
      let tagsToSearch = [];
      if (this.settings.tagSearchLocation === "yaml" || this.settings.tagSearchLocation === "both") {
        tagsToSearch.push(...yamlTags.map((tag) => ({ tag, location: "yaml" })));
      }
      if (this.settings.tagSearchLocation === "content" || this.settings.tagSearchLocation === "both") {
        tagsToSearch.push(...inlineTags);
      }
      const tagsToRemoveFromYaml = [];
      const tagsToRemoveFromContent = [];
      for (const propName of propertyList) {
        const relevantTagInfos = tagsToSearch.filter(
          (tagInfo) => tagInfo.tag.startsWith(propName + "/")
        );
        if (relevantTagInfos.length > 0) {
          const propValues = relevantTagInfos.map((tagInfo) => tagInfo.tag.split("/")[1]);
          if (!metadata[propName] || this.settings.appendToExistingProperty || this.settings.overwrite) {
            const oldValue = metadata[propName];
            if (oldValue && this.settings.appendToExistingProperty && !this.settings.overwrite) {
              if (Array.isArray(oldValue)) {
                const newValues = propValues.filter((val) => !oldValue.includes(val));
                if (newValues.length > 0) {
                  metadata[propName] = [...oldValue, ...newValues];
                  modified = true;
                  log.changes.push({
                    type: "property",
                    action: "modified",
                    before: propName + ": [" + oldValue.join(", ") + "]",
                    after: propName + ": [" + [...oldValue, ...newValues].join(", ") + "]"
                  });
                }
              } else {
                metadata[propName] = [oldValue, ...propValues];
                modified = true;
                log.changes.push({
                  type: "property",
                  action: "modified",
                  before: propName + ": " + oldValue,
                  after: propName + ": [" + [oldValue, ...propValues].join(", ") + "]"
                });
              }
            } else {
              if (propValues.length === 1) {
                metadata[propName] = propValues[0];
              } else {
                metadata[propName] = propValues;
              }
              modified = true;
              log.changes.push({
                type: "property",
                action: oldValue ? "modified" : "added",
                before: Array.isArray(oldValue) ? propName + ": [" + oldValue.join(", ") + "]" : oldValue ? propName + ": " + oldValue : "",
                after: propValues.length === 1 ? propName + ": " + propValues[0] : propName + ": [" + propValues.join(", ") + "]"
              });
            }
            if (this.settings.removeSourceAfterTransform) {
              for (const relevantTagInfo of relevantTagInfos) {
                if (relevantTagInfo.location === "yaml") {
                  tagsToRemoveFromYaml.push(relevantTagInfo.tag);
                } else {
                  tagsToRemoveFromContent.push(relevantTagInfo.tag);
                }
                log.changes.push({
                  type: "tag",
                  action: "removed",
                  before: relevantTagInfo.tag,
                  after: "",
                  location: relevantTagInfo.location
                });
              }
            }
          }
        }
      }
      if (tagsToRemoveFromYaml.length > 0) {
        const currentYamlTags = metadata.tags || [];
        metadata.tags = currentYamlTags.filter((tag) => !tagsToRemoveFromYaml.includes(tag));
      }
      if (modified) {
        const newContent = this.frontmatterParser.rebuildContent(metadata, body, tagsToRemoveFromContent, this.settings.tagsInYamlZone);
        await this.fileManager.writeFile(file, newContent);
        modifiedCount++;
        if (log.changes.length > 0) {
          this.modificationLogs.push(log);
        }
      }
    }
    new import_obsidian8.Notice(modifiedCount + " " + this.languageManager.notice("files-modified"));
    return this.modificationLogs;
  }
  /**
   * Remove properties corresponding to existing tags
   */
  async removeCorrespondingProperties() {
    const files = this.fileManager.getTargetFiles();
    const propertyList = this.fileManager.getPropertyList();
    let modifiedCount = 0;
    this.modificationLogs = [];
    for (const file of files) {
      const content = await this.fileManager.readFile(file);
      const { metadata, body, yamlTags, inlineTags } = this.frontmatterParser.parseFrontmatter(content);
      let modified = false;
      const log = {
        fileName: file.path,
        command: this.languageManager.command("remove-properties"),
        changes: []
      };
      let allTags = [];
      if (this.settings.tagSearchLocation === "yaml" || this.settings.tagSearchLocation === "both") {
        allTags.push(...yamlTags);
      }
      if (this.settings.tagSearchLocation === "content" || this.settings.tagSearchLocation === "both") {
        allTags.push(...inlineTags.map((t) => t.tag));
      }
      for (const propName of propertyList) {
        if (metadata[propName]) {
          const propValue = metadata[propName];
          const correspondingTag = propName + "/" + propValue;
          if (allTags.includes(correspondingTag)) {
            log.changes.push({
              type: "property",
              action: "removed",
              before: propName + ": " + propValue,
              after: ""
            });
            delete metadata[propName];
            modified = true;
          }
        }
      }
      if (modified) {
        const newContent = this.frontmatterParser.rebuildContent(metadata, body, [], this.settings.tagsInYamlZone);
        await this.fileManager.writeFile(file, newContent);
        modifiedCount++;
        if (log.changes.length > 0) {
          this.modificationLogs.push(log);
        }
      }
    }
    new import_obsidian8.Notice(modifiedCount + " " + this.languageManager.notice("files-modified"));
    return this.modificationLogs;
  }
  /**
   * Remove tags corresponding to existing properties
   */
  async removeCorrespondingTags() {
    const files = this.fileManager.getTargetFiles();
    const propertyList = this.fileManager.getPropertyList();
    let modifiedCount = 0;
    this.modificationLogs = [];
    for (const file of files) {
      const content = await this.fileManager.readFile(file);
      const { metadata, body, yamlTags, inlineTags } = this.frontmatterParser.parseFrontmatter(content);
      let modified = false;
      const log = {
        fileName: file.path,
        command: this.languageManager.command("remove-tags"),
        changes: []
      };
      const tagsToRemoveFromYaml = [];
      const tagsToRemoveFromContent = [];
      for (const propName of propertyList) {
        if (metadata[propName]) {
          const propValue = metadata[propName];
          const correspondingTag = propName + "/" + propValue;
          if ((this.settings.tagSearchLocation === "yaml" || this.settings.tagSearchLocation === "both") && yamlTags.includes(correspondingTag)) {
            tagsToRemoveFromYaml.push(correspondingTag);
            log.changes.push({
              type: "tag",
              action: "removed",
              before: correspondingTag,
              after: "",
              location: "yaml"
            });
            modified = true;
          }
          if ((this.settings.tagSearchLocation === "content" || this.settings.tagSearchLocation === "both") && inlineTags.some((t) => t.tag === correspondingTag)) {
            tagsToRemoveFromContent.push(correspondingTag);
            log.changes.push({
              type: "tag",
              action: "removed",
              before: correspondingTag,
              after: "",
              location: "content"
            });
            modified = true;
          }
        }
      }
      if (tagsToRemoveFromYaml.length > 0) {
        const currentYamlTags = metadata.tags || [];
        metadata.tags = currentYamlTags.filter((tag) => !tagsToRemoveFromYaml.includes(tag));
      }
      if (modified) {
        const newContent = this.frontmatterParser.rebuildContent(metadata, body, tagsToRemoveFromContent, this.settings.tagsInYamlZone);
        await this.fileManager.writeFile(file, newContent);
        modifiedCount++;
        if (log.changes.length > 0) {
          this.modificationLogs.push(log);
        }
      }
    }
    new import_obsidian8.Notice(modifiedCount + " " + this.languageManager.notice("files-modified"));
    return this.modificationLogs;
  }
  /**
   * Update settings
   */
  updateSettings(newSettings) {
    this.settings = newSettings;
    this.fileManager.updateSettings(newSettings);
  }
  /**
   * Get modification logs
   */
  getModificationLogs() {
    return this.modificationLogs;
  }
  /**
   * Clear modification logs
   */
  clearModificationLogs() {
    this.modificationLogs = [];
  }
};

// src/reports/LogGenerator.ts
var import_obsidian9 = require("obsidian");
var LogGenerator = class {
  constructor(settings, languageManager, fileManager) {
    this.settings = settings;
    this.languageManager = languageManager;
    this.fileManager = fileManager;
  }
  /**
   * Create a detailed log file for a command
   */
  async createDetailedLog(commandName, modificationLogs) {
    if (!this.settings.enableLogging || modificationLogs.length === 0) {
      return;
    }
    const now = /* @__PURE__ */ new Date();
    const timestamp = now.getFullYear() + "-" + (now.getMonth() + 1).toString().padStart(2, "0") + "-" + now.getDate().toString().padStart(2, "0") + "_" + now.getHours().toString().padStart(2, "0") + "-" + now.getMinutes().toString().padStart(2, "0") + "-" + now.getSeconds().toString().padStart(2, "0");
    const logFileName = "Log_Detaille_" + commandName.replace(/\s+/g, "_") + "_" + timestamp + ".md";
    let logContent = "# " + this.languageManager.log("title") + "\n\n";
    logContent += "**" + this.languageManager.log("command-executed") + "**: " + commandName + "\n";
    logContent += "**" + this.languageManager.log("date-time") + "**: " + (/* @__PURE__ */ new Date()).toLocaleString() + "\n";
    logContent += "**" + this.languageManager.log("files-modified") + "**: " + modificationLogs.length + "\n\n";
    logContent += "---\n\n";
    const changesByFile = {};
    for (const log of modificationLogs) {
      changesByFile[log.fileName] = log;
    }
    for (const [fileName, log] of Object.entries(changesByFile)) {
      const createdItems = [];
      const removedItems = [];
      const modifiedItems = [];
      for (const change of log.changes) {
        const itemDescription = change.type === "property" ? "**" + this.languageManager.log("property") + "**: `" + (change.after || change.before) + "`" : "**" + this.languageManager.log("tag") + "**: `" + (change.after || change.before) + "`" + (change.location ? " _(" + this.languageManager.log("location") + ": " + change.location + ")_" : "");
        switch (change.action) {
          case "added":
            createdItems.push(itemDescription);
            break;
          case "removed":
            removedItems.push(itemDescription);
            break;
          case "modified":
            modifiedItems.push(itemDescription + "\n     - " + this.languageManager.log("before") + ": `" + change.before + "`\n     - " + this.languageManager.log("after") + ": `" + change.after + "`");
            break;
        }
      }
      const totalChanges = createdItems.length + removedItems.length + modifiedItems.length;
      logContent += "* **" + this.languageManager.log("note") + "**: " + fileName + "\n";
      logContent += "   * " + totalChanges + " " + this.languageManager.log("changes-count") + "\n";
      if (createdItems.length > 0) {
        logContent += "      * " + this.languageManager.log("elements-created") + " (" + createdItems.length + ")\n";
        for (const item of createdItems) {
          logContent += "         * " + item + "\n";
        }
      }
      if (removedItems.length > 0) {
        logContent += "      * " + this.languageManager.log("elements-removed") + " (" + removedItems.length + ")\n";
        for (const item of removedItems) {
          logContent += "         * " + item + "\n";
        }
      }
      if (modifiedItems.length > 0) {
        logContent += "      * " + this.languageManager.log("elements-modified") + " (" + modifiedItems.length + ")\n";
        for (const item of modifiedItems) {
          logContent += "         * " + item + "\n";
        }
      }
      logContent += "\n";
    }
    logContent += "---\n\n";
    logContent += "## " + this.languageManager.log("global-stats") + "\n\n";
    let totalCreated = 0;
    let totalRemoved = 0;
    let totalModified = 0;
    let propertiesAffected = 0;
    let tagsAffected = 0;
    for (const log of modificationLogs) {
      for (const change of log.changes) {
        switch (change.action) {
          case "added":
            totalCreated++;
            break;
          case "removed":
            totalRemoved++;
            break;
          case "modified":
            totalModified++;
            break;
        }
        if (change.type === "property") {
          propertiesAffected++;
        } else {
          tagsAffected++;
        }
      }
    }
    logContent += "- **" + this.languageManager.log("total-created") + "**: " + totalCreated + "\n";
    logContent += "- **" + this.languageManager.log("total-removed") + "**: " + totalRemoved + "\n";
    logContent += "- **" + this.languageManager.log("total-modified") + "**: " + totalModified + "\n";
    logContent += "- **" + this.languageManager.log("properties-affected") + "**: " + propertiesAffected + "\n";
    logContent += "- **" + this.languageManager.log("tags-affected") + "**: " + tagsAffected + "\n\n";
    logContent += "## " + this.languageManager.log("configuration-used") + "\n\n";
    logContent += "- **" + this.languageManager.log("target-folder") + "**: " + (this.settings.targetFolder || this.languageManager.log("vault-root")) + "\n";
    logContent += "- **" + this.languageManager.log("properties-monitored") + "**: " + this.settings.propertyList + "\n";
    logContent += "- **" + this.languageManager.log("overwrite-existing") + "**: " + this.languageManager.yesNo(this.settings.overwrite) + "\n";
    logContent += "- **" + this.languageManager.log("append-to-property") + "**: " + this.languageManager.yesNo(this.settings.appendToExistingProperty) + "\n";
    logContent += "- **" + this.languageManager.log("remove-source-after") + "**: " + this.languageManager.yesNo(this.settings.removeSourceAfterTransform) + "\n";
    logContent += "- **" + this.languageManager.log("tags-in-yaml-zone") + "**: " + this.languageManager.yesNo(this.settings.tagsInYamlZone) + "\n";
    logContent += "- **" + this.languageManager.log("tag-location") + "**: " + this.languageManager.getTagSearchLocationLabel(this.settings.tagSearchLocation) + "\n\n";
    logContent += "---\n\n";
    logContent += "*" + this.languageManager.log("generated-by") + "*\n";
    try {
      await this.fileManager.createFile(logFileName, logContent);
      new import_obsidian9.Notice(this.languageManager.notice("log-created", { filename: logFileName }));
    } catch (error) {
      new import_obsidian9.Notice(this.languageManager.notice("log-error"));
      console.error(error);
    }
  }
  /**
   * Generate modification report
   */
  async generateModificationReport(modificationLogs) {
    if (modificationLogs.length === 0) {
      new import_obsidian9.Notice(this.languageManager.notice("no-modifications"));
      return;
    }
    const reportDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const reportFileName = "Rapport_Modifications_" + reportDate + ".md";
    let reportContent = "# " + this.languageManager.report("title") + " - " + reportDate + "\n\n";
    reportContent += this.languageManager.report("generated-by") + "\n\n";
    reportContent += "## " + this.languageManager.report("summary") + "\n\n";
    reportContent += "- " + this.languageManager.report("files-modified") + ": " + modificationLogs.length + "\n";
    reportContent += "- " + this.languageManager.report("generation-date") + ": " + (/* @__PURE__ */ new Date()).toLocaleString() + "\n\n";
    reportContent += "## " + this.languageManager.report("modification-details") + "\n\n";
    for (const log of modificationLogs) {
      reportContent += "### " + log.fileName + "\n";
      reportContent += "**" + this.languageManager.report("command") + "**: " + log.command + "\n\n";
      for (const change of log.changes) {
        reportContent += "- **" + this.languageManager.report(change.type) + "** " + this.languageManager.report(change.action);
        if (change.location) {
          reportContent += " (" + change.location + ")";
        }
        reportContent += "\n";
        if (change.before) {
          reportContent += "  - " + this.languageManager.report("before") + ": `" + change.before + "`\n";
        }
        if (change.after) {
          reportContent += "  - " + this.languageManager.report("after") + ": `" + change.after + "`\n";
        }
        reportContent += "\n";
      }
      reportContent += "---\n\n";
    }
    try {
      await this.fileManager.createFile(reportFileName, reportContent);
      new import_obsidian9.Notice(this.languageManager.notice("report-generated", { filename: reportFileName }));
    } catch (error) {
      new import_obsidian9.Notice(this.languageManager.notice("report-error"));
      console.error(error);
    }
  }
  /**
   * Update settings
   */
  updateSettings(newSettings) {
    this.settings = newSettings;
  }
};

// src/reports/AnalysisGenerator.ts
var import_obsidian10 = require("obsidian");
var AnalysisGenerator = class {
  constructor(settings, languageManager, frontmatterParser, fileManager) {
    this.settings = settings;
    this.languageManager = languageManager;
    this.frontmatterParser = frontmatterParser;
    this.fileManager = fileManager;
  }
  /**
   * Run property tag analysis based on configured type
   */
  async analyzePropertyTags() {
    const files = this.fileManager.getTargetFiles();
    const propertyList = this.fileManager.getPropertyList();
    if (propertyList.length === 0) {
      new import_obsidian10.Notice(this.languageManager.notice("no-properties"));
      return;
    }
    const analysisDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const baseName = this.settings.analysisFileName || "properties-analysis";
    const analysisFileName = baseName + "-" + analysisDate + ".md";
    if (this.settings.analysisType === "by-property") {
      await this.generatePropertyBasedAnalysis(files, propertyList, analysisFileName);
    } else {
      await this.generateFileBasedAnalysis(files, propertyList, analysisFileName);
    }
  }
  /**
   * Generate analysis organized by property
   */
  async generatePropertyBasedAnalysis(files, propertyList, analysisFileName) {
    let analysisContent = "# " + this.languageManager.analysis("by-property-title") + " - " + (/* @__PURE__ */ new Date()).toISOString().split("T")[0] + "\n\n";
    const results = {};
    let filesWithPropertyTags = [];
    let totalTagsFound = 0;
    for (const file of files) {
      const content = await this.fileManager.readFile(file);
      const { metadata, yamlTags, inlineTags } = this.frontmatterParser.parseFrontmatter(content);
      let fileHasPropertyTags = false;
      for (const tag of yamlTags) {
        for (const propName of propertyList) {
          if (tag.startsWith(propName + "/")) {
            const propValue = tag.split("/").slice(1).join("/");
            if (!results[propName])
              results[propName] = {};
            if (!results[propName][propValue])
              results[propName][propValue] = {};
            if (!results[propName][propValue]["yaml"])
              results[propName][propValue]["yaml"] = [];
            results[propName][propValue]["yaml"].push(file.path);
            fileHasPropertyTags = true;
            totalTagsFound++;
          }
        }
      }
      for (const tagInfo of inlineTags) {
        for (const propName of propertyList) {
          if (tagInfo.tag.startsWith(propName + "/")) {
            const propValue = tagInfo.tag.split("/").slice(1).join("/");
            if (!results[propName])
              results[propName] = {};
            if (!results[propName][propValue])
              results[propName][propValue] = {};
            if (!results[propName][propValue]["content"])
              results[propName][propValue]["content"] = [];
            results[propName][propValue]["content"].push(file.path);
            fileHasPropertyTags = true;
            totalTagsFound++;
          }
        }
      }
      for (const propName of propertyList) {
        if (metadata[propName]) {
          fileHasPropertyTags = true;
        }
      }
      if (fileHasPropertyTags && !filesWithPropertyTags.includes(file.path)) {
        filesWithPropertyTags.push(file.path);
      }
    }
    analysisContent += "## " + this.languageManager.analysis("results-summary") + "\n\n";
    analysisContent += "- **" + this.languageManager.analysis("files-with-tags") + "**: " + filesWithPropertyTags.length + "\n";
    analysisContent += "- **" + this.languageManager.analysis("total-tags-found") + "**: " + totalTagsFound + "\n\n";
    if (Object.keys(results).length > 0) {
      analysisContent += "## " + this.languageManager.analysis("overview-by-property") + "\n\n";
      for (const [propName, values] of Object.entries(results)) {
        analysisContent += "### " + this.languageManager.analysis("property") + ": " + propName + "\n\n";
        for (const [value, locations] of Object.entries(values)) {
          analysisContent += "#### `" + propName + "/" + value + "`\n\n";
          if (locations["yaml"] && locations["yaml"].length > 0) {
            analysisContent += "**" + this.languageManager.analysis("in-yaml") + "** (" + locations["yaml"].length + " " + this.languageManager.analysis("files") + "):\n";
            for (const filePath of locations["yaml"].sort()) {
              analysisContent += "- [[" + filePath.replace(".md", "") + "]]\n";
            }
            analysisContent += "\n";
          }
          if (locations["content"] && locations["content"].length > 0) {
            analysisContent += "**" + this.languageManager.analysis("in-content") + "** (" + locations["content"].length + " " + this.languageManager.analysis("files") + "):\n";
            for (const filePath of locations["content"].sort()) {
              analysisContent += "- [[" + filePath.replace(".md", "") + "]]\n";
            }
            analysisContent += "\n";
          }
        }
        analysisContent += "---\n\n";
      }
    }
    try {
      await this.fileManager.createFile(analysisFileName, analysisContent);
      new import_obsidian10.Notice(this.languageManager.notice("analysis-generated", {
        type: this.languageManager.analysis("by-property-title"),
        filename: analysisFileName
      }));
    } catch (error) {
      new import_obsidian10.Notice(this.languageManager.notice("analysis-error"));
      console.error(error);
    }
  }
  /**
   * Generate detailed analysis organized by file
   */
  async generateFileBasedAnalysis(files, propertyList, analysisFileName) {
    let analysisContent = "# " + this.languageManager.analysis("by-file-title") + " - " + (/* @__PURE__ */ new Date()).toISOString().split("T")[0] + "\n\n";
    const fileAnalysis = {};
    let filesWithPropertyTags = [];
    for (const file of files) {
      const content = await this.fileManager.readFile(file);
      const { metadata, yamlTags, inlineTags } = this.frontmatterParser.parseFrontmatter(content);
      let fileHasRelevantContent = false;
      const analysis = {
        relevantYamlTags: [],
        relevantInlineTags: [],
        relevantProperties: {},
        wouldCreateProperties: {},
        wouldCreateYamlTags: [],
        wouldCreateInlineTags: [],
        wouldRemoveProperties: [],
        wouldRemoveYamlTags: [],
        wouldRemoveInlineTags: []
      };
      for (const tag of yamlTags) {
        for (const propName of propertyList) {
          if (tag.startsWith(propName + "/")) {
            const propValue = tag.split("/").slice(1).join("/");
            analysis.relevantYamlTags.push(tag);
            fileHasRelevantContent = true;
            if (this.settings.tagSearchLocation === "yaml" || this.settings.tagSearchLocation === "both") {
              if (!metadata[propName] || this.settings.overwrite) {
                analysis.wouldCreateProperties[propName] = propValue;
                if (this.settings.removeSourceAfterTransform) {
                  analysis.wouldRemoveYamlTags.push(tag);
                }
              }
            }
          }
        }
      }
      for (const tagInfo of inlineTags) {
        for (const propName of propertyList) {
          if (tagInfo.tag.startsWith(propName + "/")) {
            const propValue = tagInfo.tag.split("/").slice(1).join("/");
            analysis.relevantInlineTags.push(tagInfo.tag);
            fileHasRelevantContent = true;
            if (this.settings.tagSearchLocation === "content" || this.settings.tagSearchLocation === "both") {
              if (!metadata[propName] || this.settings.overwrite) {
                analysis.wouldCreateProperties[propName] = propValue;
                if (this.settings.removeSourceAfterTransform) {
                  analysis.wouldRemoveInlineTags.push(tagInfo.tag);
                }
              }
            }
          }
        }
      }
      for (const propName of propertyList) {
        if (metadata[propName]) {
          const propValue = metadata[propName];
          analysis.relevantProperties[propName] = propValue;
          fileHasRelevantContent = true;
          const newTag = propName + "/" + propValue;
          const existingTags = metadata.tags || [];
          const tagExists = existingTags.some((tag) => tag.startsWith(propName + "/"));
          if (!tagExists || this.settings.overwrite) {
            if (this.settings.tagsInYamlZone) {
              analysis.wouldCreateYamlTags.push(newTag);
            } else {
              analysis.wouldCreateInlineTags.push(newTag);
            }
            if (this.settings.removeSourceAfterTransform) {
              analysis.wouldRemoveProperties.push(propName);
            }
          }
        }
      }
      if (fileHasRelevantContent) {
        filesWithPropertyTags.push(file.path);
        fileAnalysis[file.path] = analysis;
      }
    }
    analysisContent += "## " + this.languageManager.analysis("results-summary") + "\n\n";
    analysisContent += "- **" + this.languageManager.analysis("files-with-tags") + "**: " + filesWithPropertyTags.length + "\n\n";
    if (Object.keys(fileAnalysis).length > 0) {
      analysisContent += "## " + this.languageManager.analysis("detailed-analysis") + "\n\n";
      for (const [filePath, analysis] of Object.entries(fileAnalysis)) {
        const fileName = filePath.replace(".md", "");
        analysisContent += "### [[" + fileName + "]]\n\n";
        analysisContent += "#### " + this.languageManager.analysis("current-state") + "\n\n";
        if (Object.keys(analysis.relevantProperties).length > 0) {
          analysisContent += "**" + this.languageManager.analysis("properties-found") + " :**\n";
          for (const [prop, value] of Object.entries(analysis.relevantProperties)) {
            analysisContent += "- `" + prop + ': "' + value + '"`\n';
          }
          analysisContent += "\n";
        }
        if (analysis.relevantYamlTags.length > 0) {
          analysisContent += "**" + this.languageManager.analysis("yaml-tags-found") + " :**\n";
          for (const tag of analysis.relevantYamlTags) {
            analysisContent += "- `" + tag + "`\n";
          }
          analysisContent += "\n";
        }
        if (analysis.relevantInlineTags.length > 0) {
          analysisContent += "**" + this.languageManager.analysis("inline-tags-found") + " :**\n";
          for (const tag of analysis.relevantInlineTags) {
            analysisContent += "- `#" + tag + "`\n";
          }
          analysisContent += "\n";
        }
        const hasTransformations = Object.keys(analysis.wouldCreateProperties).length > 0 || analysis.wouldCreateYamlTags.length > 0 || analysis.wouldCreateInlineTags.length > 0;
        if (hasTransformations) {
          analysisContent += "#### " + this.languageManager.analysis("possible-transformations") + "\n\n";
          if (Object.keys(analysis.wouldCreateProperties).length > 0) {
            analysisContent += "**" + this.languageManager.analysis("would-create-properties") + " :**\n";
            for (const [prop, value] of Object.entries(analysis.wouldCreateProperties)) {
              analysisContent += "- `" + prop + ': "' + value + '"`\n';
            }
            analysisContent += "\n";
          }
          if (analysis.wouldCreateYamlTags.length > 0) {
            analysisContent += "**" + this.languageManager.analysis("would-create-yaml-tags") + " :**\n";
            for (const tag of analysis.wouldCreateYamlTags) {
              analysisContent += "- `" + tag + "`\n";
            }
            analysisContent += "\n";
          }
          if (analysis.wouldCreateInlineTags.length > 0) {
            analysisContent += "**" + this.languageManager.analysis("would-create-inline-tags") + " :**\n";
            for (const tag of analysis.wouldCreateInlineTags) {
              analysisContent += "- `#" + tag + "`\n";
            }
            analysisContent += "\n";
          }
        }
        if (this.settings.removeSourceAfterTransform) {
          const hasDeletions = analysis.wouldRemoveProperties.length > 0 || analysis.wouldRemoveYamlTags.length > 0 || analysis.wouldRemoveInlineTags.length > 0;
          if (hasDeletions) {
            analysisContent += "#### " + this.languageManager.analysis("deletions-if-enabled") + "\n\n";
            if (analysis.wouldRemoveProperties.length > 0) {
              analysisContent += "**" + this.languageManager.analysis("properties-would-be-deleted") + " :**\n";
              for (const prop of analysis.wouldRemoveProperties) {
                const value = analysis.relevantProperties[prop];
                analysisContent += "- `" + prop + ': "' + value + '"`\n';
              }
              analysisContent += "\n";
            }
            if (analysis.wouldRemoveYamlTags.length > 0) {
              analysisContent += "**" + this.languageManager.analysis("yaml-tags-would-be-deleted") + " :**\n";
              for (const tag of analysis.wouldRemoveYamlTags) {
                analysisContent += "- `" + tag + "`\n";
              }
              analysisContent += "\n";
            }
            if (analysis.wouldRemoveInlineTags.length > 0) {
              analysisContent += "**" + this.languageManager.analysis("inline-tags-would-be-deleted") + " :**\n";
              for (const tag of analysis.wouldRemoveInlineTags) {
                analysisContent += "- `#" + tag + "`\n";
              }
              analysisContent += "\n";
            }
          }
        }
        analysisContent += "---\n\n";
      }
    }
    try {
      await this.fileManager.createFile(analysisFileName, analysisContent);
      new import_obsidian10.Notice(this.languageManager.notice("analysis-generated", {
        type: this.languageManager.analysis("by-file-title"),
        filename: analysisFileName
      }));
    } catch (error) {
      new import_obsidian10.Notice(this.languageManager.notice("analysis-error"));
      console.error(error);
    }
  }
  /**
   * Update settings
   */
  updateSettings(newSettings) {
    this.settings = newSettings;
  }
};

// src/ui/Settings.ts
var import_obsidian11 = require("obsidian");
var PropertiesToolkitSettingTab = class extends import_obsidian11.PluginSettingTab {
  constructor(app, settingsManager) {
    super(app, settingsManager);
    this.settingsManager = settingsManager;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    new import_obsidian11.Setting(containerEl).setName(this.settingsManager.languageManager.setting("title")).setHeading();
    new import_obsidian11.Setting(containerEl).setName(this.settingsManager.languageManager.setting("section-general")).setHeading();
    new import_obsidian11.Setting(containerEl).setName(this.settingsManager.languageManager.setting("language")).setDesc(this.settingsManager.languageManager.setting("language-desc")).addDropdown((dropdown) => {
      const languages = this.settingsManager.languageManager.getAvailableLanguages();
      languages.forEach((lang) => {
        dropdown.addOption(lang.value, lang.label);
      });
      dropdown.setValue(this.settingsManager.settings.language).onChange(async (value) => {
        this.settingsManager.settings.language = value;
        await this.settingsManager.saveSettings();
        this.display();
      });
    });
    new import_obsidian11.Setting(containerEl).setName(this.settingsManager.languageManager.setting("target-folder")).setDesc(this.settingsManager.languageManager.setting("target-folder-desc")).addText((text) => text.setPlaceholder("path/to/folder").setValue(this.settingsManager.settings.targetFolder).onChange(async (value) => {
      this.settingsManager.settings.targetFolder = value;
      await this.settingsManager.saveSettings();
    }));
    new import_obsidian11.Setting(containerEl).setName(this.settingsManager.languageManager.setting("analysis-filename")).setDesc(this.settingsManager.languageManager.setting("analysis-filename-desc")).addText((text) => text.setPlaceholder("properties-analysis").setValue(this.settingsManager.settings.analysisFileName).onChange(async (value) => {
      this.settingsManager.settings.analysisFileName = value || "properties-analysis";
      await this.settingsManager.saveSettings();
    }));
    new import_obsidian11.Setting(containerEl).setName(this.settingsManager.languageManager.setting("enable-logging")).setDesc(this.settingsManager.languageManager.setting("enable-logging-desc")).addToggle((toggle) => toggle.setValue(this.settingsManager.settings.enableLogging).onChange(async (value) => {
      this.settingsManager.settings.enableLogging = value;
      await this.settingsManager.saveSettings();
    }));
    new import_obsidian11.Setting(containerEl).setName(this.settingsManager.languageManager.setting("section-transformer")).setHeading();
    new import_obsidian11.Setting(containerEl).setName(this.settingsManager.languageManager.setting("property-list")).setDesc(this.settingsManager.languageManager.setting("property-list-desc")).addText((text) => text.setPlaceholder(this.settingsManager.languageManager.setting("property-list-placeholder")).setValue(this.settingsManager.settings.propertyList).onChange(async (value) => {
      this.settingsManager.settings.propertyList = value;
      await this.settingsManager.saveSettings();
    }));
    new import_obsidian11.Setting(containerEl).setName(this.settingsManager.languageManager.setting("overwrite")).setDesc(this.settingsManager.languageManager.setting("overwrite-desc")).addToggle((toggle) => toggle.setValue(this.settingsManager.settings.overwrite).onChange(async (value) => {
      this.settingsManager.settings.overwrite = value;
      await this.settingsManager.saveSettings();
    }));
    new import_obsidian11.Setting(containerEl).setName(this.settingsManager.languageManager.setting("append-to-existing")).setDesc(this.settingsManager.languageManager.setting("append-to-existing-desc")).addToggle((toggle) => toggle.setValue(this.settingsManager.settings.appendToExistingProperty).onChange(async (value) => {
      this.settingsManager.settings.appendToExistingProperty = value;
      await this.settingsManager.saveSettings();
    }));
    new import_obsidian11.Setting(containerEl).setName(this.settingsManager.languageManager.setting("remove-source")).setDesc(this.settingsManager.languageManager.setting("remove-source-desc")).addToggle((toggle) => toggle.setValue(this.settingsManager.settings.removeSourceAfterTransform).onChange(async (value) => {
      this.settingsManager.settings.removeSourceAfterTransform = value;
      await this.settingsManager.saveSettings();
    }));
    new import_obsidian11.Setting(containerEl).setName(this.settingsManager.languageManager.setting("tags-in-yaml")).setDesc(this.settingsManager.languageManager.setting("tags-in-yaml-desc")).addToggle((toggle) => toggle.setValue(this.settingsManager.settings.tagsInYamlZone).onChange(async (value) => {
      this.settingsManager.settings.tagsInYamlZone = value;
      await this.settingsManager.saveSettings();
    }));
    new import_obsidian11.Setting(containerEl).setName(this.settingsManager.languageManager.setting("tag-search-location")).setDesc(this.settingsManager.languageManager.setting("tag-search-location-desc")).addDropdown((dropdown) => dropdown.addOption("yaml", this.settingsManager.languageManager.setting("tag-search-yaml")).addOption("content", this.settingsManager.languageManager.setting("tag-search-content")).addOption("both", this.settingsManager.languageManager.setting("tag-search-both")).setValue(this.settingsManager.settings.tagSearchLocation).onChange(async (value) => {
      this.settingsManager.settings.tagSearchLocation = value;
      await this.settingsManager.saveSettings();
    }));
    new import_obsidian11.Setting(containerEl).setName(this.settingsManager.languageManager.setting("analysis-type")).setDesc(this.settingsManager.languageManager.setting("analysis-type-desc")).addDropdown((dropdown) => dropdown.addOption("by-property", this.settingsManager.languageManager.setting("analysis-by-property")).addOption("by-file", this.settingsManager.languageManager.setting("analysis-by-file")).setValue(this.settingsManager.settings.analysisType).onChange(async (value) => {
      this.settingsManager.settings.analysisType = value;
      await this.settingsManager.saveSettings();
    }));
  }
};

// src/modals/search-replace-modal.ts
var import_obsidian12 = require("obsidian");
var SearchReplaceModal = class extends import_obsidian12.Modal {
  constructor(app, languageManager, onSubmit) {
    super(app);
    this.params = {
      propertyName: "",
      searchValue: "",
      replaceValue: ""
    };
    this.languageManager = languageManager;
    this.onSubmit = onSubmit;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("pt-modal");
    contentEl.createEl("h2", { text: "Search and replace value" });
    new import_obsidian12.Setting(contentEl).setName("Property name").setDesc("The property to search in").addText((text) => text.setPlaceholder("e.g. status, type, category").onChange((value) => {
      this.params.propertyName = value.trim();
    }));
    new import_obsidian12.Setting(contentEl).setName("Search value").setDesc("The exact value to replace").addText((text) => text.setPlaceholder("old value").onChange((value) => {
      this.params.searchValue = value;
    }));
    new import_obsidian12.Setting(contentEl).setName("Replace value").setDesc("The new value (empty = delete)").addText((text) => text.setPlaceholder("new value").onChange((value) => {
      this.params.replaceValue = value;
    }));
    const buttonRow = contentEl.createEl("div", { cls: "pt-button-row" });
    const cancelBtn = buttonRow.createEl("button", { text: "Cancel" });
    cancelBtn.addEventListener("click", () => this.close());
    const submitBtn = buttonRow.createEl("button", {
      text: "Search",
      cls: "mod-cta"
    });
    submitBtn.addEventListener("click", () => {
      if (!this.params.propertyName) {
        return;
      }
      if (!this.params.searchValue) {
        return;
      }
      this.close();
      this.onSubmit(this.params);
    });
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/converters/search-replace.ts
var import_obsidian13 = require("obsidian");
var SearchReplaceExecutor = class {
  constructor(app, languageManager, settings) {
    this.app = app;
    this.languageManager = languageManager;
    this.settings = settings;
  }
  /**
   * Get target files based on targetFolder setting
   */
  getTargetFiles() {
    const folderPath = this.settings.targetFolder.trim();
    if (!folderPath) {
      return this.app.vault.getMarkdownFiles();
    }
    const normalizedPath = (0, import_obsidian13.normalizePath)(folderPath);
    const folder = this.app.vault.getAbstractFileByPath(normalizedPath);
    if (!folder) {
      return [];
    }
    if (folder instanceof import_obsidian13.TFile) {
      return folder.extension === "md" ? [folder] : [];
    }
    if (folder instanceof import_obsidian13.TFolder) {
      const getAllFiles = (currentFolder) => {
        const result = [];
        for (const child of currentFolder.children) {
          if (child instanceof import_obsidian13.TFile && child.extension === "md") {
            result.push(child);
          } else if (child instanceof import_obsidian13.TFolder) {
            result.push(...getAllFiles(child));
          }
        }
        return result;
      };
      return getAllFiles(folder);
    }
    return [];
  }
  /**
   * Scan vault for files containing the search value in the specified property
   */
  scanForMatches(propertyName, searchValue) {
    const results = [];
    const files = this.getTargetFiles();
    for (const file of files) {
      const cache = this.app.metadataCache.getFileCache(file);
      const fm = cache == null ? void 0 : cache.frontmatter;
      if (!fm || !(propertyName in fm))
        continue;
      const value = fm[propertyName];
      if (Array.isArray(value)) {
        if (value.includes(searchValue)) {
          const newArray = value.map((v) => v === searchValue ? null : v);
          results.push({ file, oldValue: value, newValue: newArray });
        }
      } else if (value === searchValue) {
        results.push({ file, oldValue: value, newValue: null });
      }
    }
    return results;
  }
  /**
   * Execute search and replace with preview
   */
  async executeWithPreview(propertyName, searchValue, replaceValue) {
    const matches = this.scanForMatches(propertyName, searchValue);
    if (matches.length === 0) {
      return 0;
    }
    const items = matches.map((match) => {
      let detail;
      if (Array.isArray(match.oldValue)) {
        const newArr = match.oldValue.map(
          (v) => v === searchValue ? replaceValue || "\u2205" : v
        ).filter((v) => v !== "\u2205" || replaceValue);
        detail = `[${match.oldValue.join(", ")}] \u2192 [${replaceValue ? newArr.join(", ") : newArr.filter((v) => v !== searchValue).join(", ")}]`;
      } else {
        detail = `"${searchValue}" \u2192 "${replaceValue || "(deleted)"}"`;
      }
      return {
        filePath: match.file.path,
        fileName: match.file.basename,
        detail
      };
    });
    return new Promise((resolve) => {
      const title = `Replace "${searchValue}" with "${replaceValue || "(delete)"}" in "${propertyName}"`;
      new PreviewModal(this.app, {
        title,
        items,
        confirmLabel: `Replace in ${matches.length} file(s)`,
        onConfirm: () => {
          void (async () => {
            const count = await this.executeReplace(propertyName, searchValue, replaceValue, matches);
            resolve(count);
          })();
        }
      }).open();
    });
  }
  /**
   * Execute the actual replacement
   */
  async executeReplace(propertyName, searchValue, replaceValue, matches) {
    const progressTitle = `Replacing "${searchValue}"...`;
    const progress = new ProgressModal(this.app, progressTitle);
    progress.open();
    let count = 0;
    for (const match of matches) {
      await this.app.fileManager.processFrontMatter(match.file, (fm) => {
        const currentValue = fm[propertyName];
        if (Array.isArray(currentValue)) {
          if (replaceValue) {
            fm[propertyName] = currentValue.map(
              (v) => v === searchValue ? replaceValue : v
            );
          } else {
            fm[propertyName] = currentValue.filter((v) => v !== searchValue);
            if (fm[propertyName].length === 0) {
              delete fm[propertyName];
            }
          }
        } else {
          if (replaceValue) {
            fm[propertyName] = replaceValue;
          } else {
            delete fm[propertyName];
          }
        }
      });
      count++;
      progress.setProgress(count, matches.length);
      if (count % 50 === 0) {
        await new Promise((r) => setTimeout(r, 0));
      }
    }
    progress.finish(`Done: ${count} file(s) modified.`);
    return count;
  }
};

// main.ts
var PropertiesToolkitPlugin = class extends import_obsidian14.Plugin {
  async onload() {
    await this.loadSettings();
    this.languageManager = new LanguageManager(this.app, this.settings.language);
    const detectedLang = this.languageManager.getCurrentLanguage();
    if (this.settings.language !== detectedLang) {
      this.settings.language = detectedLang;
      await this.saveSettings();
      this.languageManager = new LanguageManager(this.app, this.settings.language);
    }
    this.initializeModules();
    this.registerCommands();
    this.addSettingTab(new PropertiesToolkitSettingTab(this.app, this));
  }
  /**
   * Initialize all modules with dependencies
   */
  initializeModules() {
    this.scanner = new VaultScanner(this.app, this.settings);
    this.registry = new ConverterRegistry();
    this.registry.register(new ListToTextConverter());
    this.registry.register(new TextToListConverter());
    this.registry.register(new DeleteEmptyConverter());
    this.frontmatterParser = new FrontmatterParser();
    this.fileManager = new FileManager(this.app, this.settings, this.languageManager);
    this.propertyTransformer = new PropertyTransformer(
      this.settings,
      this.languageManager,
      this.frontmatterParser,
      this.fileManager
    );
    this.logGenerator = new LogGenerator(this.settings, this.languageManager, this.fileManager);
    this.analysisGenerator = new AnalysisGenerator(
      this.settings,
      this.languageManager,
      this.frontmatterParser,
      this.fileManager
    );
  }
  /**
   * Register all plugin commands
   */
  registerCommands() {
    this.addCommand({
      id: "delete-empty-properties",
      name: this.languageManager.command("delete-empty-properties"),
      callback: () => {
        this.deleteEmptyProperties();
      }
    });
    this.addCommand({
      id: "convert-property",
      name: this.languageManager.command("convert-property"),
      callback: () => {
        this.convertProperty();
      }
    });
    this.addCommand({
      id: "show-doc",
      name: this.languageManager.command("show-doc"),
      callback: () => {
        void this.showDoc();
      }
    });
    this.addCommand({
      id: "search-replace-value",
      name: this.languageManager.command("search-replace-value"),
      callback: () => {
        this.searchReplaceValue();
      }
    });
    this.addCommand({
      id: "transpose-properties-to-tags",
      name: this.languageManager.command("transpose-properties-to-tags"),
      callback: () => {
        void (async () => {
          const logs = await this.propertyTransformer.transposePropertiesToTags();
          if (this.settings.enableLogging && logs.length > 0) {
            await this.logGenerator.createDetailedLog(
              this.languageManager.command("transpose-properties-to-tags"),
              logs
            );
          }
        })();
      }
    });
    this.addCommand({
      id: "transpose-tags-to-properties",
      name: this.languageManager.command("transpose-tags-to-properties"),
      callback: () => {
        void (async () => {
          const logs = await this.propertyTransformer.transposeTagsToProperties();
          if (this.settings.enableLogging && logs.length > 0) {
            await this.logGenerator.createDetailedLog(
              this.languageManager.command("transpose-tags-to-properties"),
              logs
            );
          }
        })();
      }
    });
    this.addCommand({
      id: "remove-properties",
      name: this.languageManager.command("remove-properties"),
      callback: () => {
        void (async () => {
          const logs = await this.propertyTransformer.removeCorrespondingProperties();
          if (this.settings.enableLogging && logs.length > 0) {
            await this.logGenerator.createDetailedLog(
              this.languageManager.command("remove-properties"),
              logs
            );
          }
        })();
      }
    });
    this.addCommand({
      id: "remove-tags",
      name: this.languageManager.command("remove-tags"),
      callback: () => {
        void (async () => {
          const logs = await this.propertyTransformer.removeCorrespondingTags();
          if (this.settings.enableLogging && logs.length > 0) {
            await this.logGenerator.createDetailedLog(
              this.languageManager.command("remove-tags"),
              logs
            );
          }
        })();
      }
    });
    this.addCommand({
      id: "analyze-property-tags",
      name: this.languageManager.command("analyze-property-tags"),
      callback: () => {
        void this.analysisGenerator.analyzePropertyTags();
      }
    });
    this.addCommand({
      id: "generate-modification-report",
      name: this.languageManager.command("generate-modification-report"),
      callback: () => {
        const logs = this.propertyTransformer.getModificationLogs();
        void this.logGenerator.generateModificationReport(logs);
      }
    });
  }
  // === PROPERTIES MANAGER METHODS ===
  deleteEmptyProperties() {
    const result = this.scanner.scanEmptyProperties();
    if (result.totalCount === 0) {
      new import_obsidian14.Notice(this.languageManager.notice("no-empty-properties"));
      return;
    }
    const items = [];
    for (const [, entry] of result.byFile) {
      items.push({
        filePath: entry.file.path,
        fileName: entry.file.basename,
        detail: entry.emptyProps.join(", ")
      });
    }
    new PreviewModal(this.app, {
      title: this.languageManager.command("delete-empty-properties"),
      items,
      confirmLabel: `${result.totalCount} empty property(ies)`,
      onConfirm: () => {
        void (async () => {
          const progress = new ProgressModal(this.app, this.languageManager.command("delete-empty-properties"));
          progress.open();
          let fileCount = 0;
          const entries = Array.from(result.byFile.values());
          for (const entry of entries) {
            await this.app.fileManager.processFrontMatter(entry.file, (fm) => {
              for (const prop of entry.emptyProps) {
                delete fm[prop];
              }
            });
            fileCount++;
            progress.setProgress(fileCount, entries.length);
            if (fileCount % 50 === 0) {
              await new Promise((r) => setTimeout(r, 0));
            }
          }
          progress.finish(
            `${result.totalCount} property(ies) deleted in ${fileCount} file(s).`
          );
        })();
      }
    }).open();
  }
  async showDoc() {
    const lang = this.languageManager.getCurrentLanguage();
    const docPath = this.manifest.dir + "/doc-" + lang + ".md";
    const fallbackPath = this.manifest.dir + "/doc-en.md";
    try {
      let markdown;
      try {
        markdown = await this.app.vault.adapter.read(docPath);
      } catch (e) {
        markdown = await this.app.vault.adapter.read(fallbackPath);
      }
      const modal = new import_obsidian14.Modal(this.app);
      const title = lang === "fr" ? "Properties Toolkit \u2014 Aide" : "Properties Toolkit \u2014 Help";
      modal.titleEl.setText(title);
      modal.modalEl.addClass("pt-doc-modal");
      modal.contentEl.addClass("pt-doc");
      const component = new import_obsidian14.Component();
      component.load();
      await import_obsidian14.MarkdownRenderer.render(this.app, markdown, modal.contentEl, "", component);
      modal.onClose = () => {
        component.unload();
      };
      modal.open();
    } catch (e) {
      new import_obsidian14.Notice(lang === "fr" ? "Documentation introuvable : " + docPath : "Documentation not found: " + docPath);
    }
  }
  searchReplaceValue() {
    new SearchReplaceModal(this.app, this.languageManager, (params) => {
      void (async () => {
        const executor = new SearchReplaceExecutor(this.app, this.languageManager, this.settings);
        const count = await executor.executeWithPreview(
          params.propertyName,
          params.searchValue,
          params.replaceValue
        );
        if (count === 0) {
          const isFr = this.languageManager.getCurrentLanguage() === "fr";
          new import_obsidian14.Notice(isFr ? `No match found for "${params.searchValue}" in "${params.propertyName}"` : `No match found for "${params.searchValue}" in "${params.propertyName}"`);
        }
      })();
    }).open();
  }
  convertProperty() {
    const properties = this.scanner.getAllProperties();
    if (properties.length === 0) {
      new import_obsidian14.Notice(this.languageManager.notice("no-properties-vault"));
      return;
    }
    new PropertySelectorModal(this.app, properties, (propName) => {
      const analysis = this.scanner.analyzeProperty(propName);
      const applicable = this.registry.getAll().filter((c) => c.isApplicable(analysis));
      if (applicable.length === 0) {
        new import_obsidian14.Notice(`No applicable operation for "${propName}".`);
        return;
      }
      new OperationSelectorModal(this.app, applicable, (converter) => {
        void (async () => {
          const count = await converter.execute(this.app, analysis);
          if (count >= 0) {
            new import_obsidian14.Notice(`Operation complete: ${count} file(s) modified.`);
          }
        })();
      }).open();
    }).open();
  }
  // === SETTINGS METHODS ===
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_TRANSFORMER_SETTINGS, await this.loadData());
    if (this.languageManager) {
      this.languageManager.setLanguage(this.settings.language);
    }
    this.updateModulesSettings();
  }
  async saveSettings() {
    await this.saveData(this.settings);
    if (this.languageManager) {
      this.languageManager.setLanguage(this.settings.language);
    }
    this.updateModulesSettings();
  }
  updateModulesSettings() {
    if (this.scanner) {
      this.scanner.updateSettings(this.settings);
    }
    if (this.fileManager) {
      this.fileManager.updateSettings(this.settings);
    }
    if (this.propertyTransformer) {
      this.propertyTransformer.updateSettings(this.settings);
    }
    if (this.logGenerator) {
      this.logGenerator.updateSettings(this.settings);
    }
    if (this.analysisGenerator) {
      this.analysisGenerator.updateSettings(this.settings);
    }
  }
};
