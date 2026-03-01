# Properties Toolkit

A comprehensive Obsidian plugin for managing frontmatter properties. This plugin combines powerful feature sets:

1. **Property Management**: Delete empty properties, convert between list and text types, search and replace values
2. **Property-Tag Transformation**: Bidirectional transformation between YAML properties and tags

## Features

### Property Management

- **Delete empty properties**: Remove all empty/null properties across your vault
- **Convert List → Text**: Convert array properties to simple text (keep one value)
- **Convert Text → List**: Convert text properties to arrays
- **Search and Replace**: Find and replace values within a specific property

### Property-Tag Transformation

- **Properties → Tags**: Convert YAML properties to hashtags (e.g., `status: active` → `#status/active`)
- **Tags → Properties**: Convert hashtags to YAML properties
- **Remove corresponding properties/tags**: Clean up duplicates
- **Analysis reports**: Generate detailed reports by property or by file

## Commands

| Command | Description |
|---------|-------------|
| Delete all empty properties (vault) | Remove empty/null properties from all files |
| Convert property type (vault) | Convert between list and text types |
| Search and replace value in property | Find and replace values in a property |
| Transform properties to tags | Convert selected properties to hashtags |
| Transform tags to properties | Convert matching hashtags to properties |
| Remove corresponding properties | Delete properties that have matching tags |
| Remove corresponding tags | Delete tags that have matching properties |
| Analyze property tags | Generate analysis report |
| Generate modification report | View transformation history |
| Help / Documentation | Show plugin documentation |

## Settings

### General Settings
- **Language**: Interface language (English/French)
- **Target folder**: Limit ALL operations to a specific folder (empty = entire vault)
- **Analysis file name**: Base name for analysis files (date appended automatically)
- **Enable logging**: Create detailed logs for each operation

### Property ↔ Tag Transformation
- **Property list**: Properties to transform (comma-separated)
- **Overwrite existing**: Replace existing values
- **Append to existing**: Add new values to existing properties
- **Remove source**: Delete original after transformation
- **Tags in YAML**: Place tags in frontmatter (vs inline)
- **Tag search location**: Where to look for tags (YAML/content/both)
- **Analysis type**: Report format (by property or by file)

## Usage Examples

### Delete Empty Properties

1. Run command: `Ctrl+P` → "Delete all empty properties (vault)"
2. Preview affected files
3. Confirm to delete

### Convert Property Type

1. Run command: `Ctrl+P` → "Convert property type (vault)"
2. Select a property from the fuzzy search
3. Choose an operation (List→Text or Text→List)
4. Preview and confirm

### Search and Replace Value

1. Run command: `Ctrl+P` → "Search and replace value in property"
2. Enter the property name (e.g., `status`)
3. Enter the value to search (e.g., `draft`)
4. Enter the replacement value (e.g., `published`, or leave empty to delete)
5. Preview and confirm

### Transform Properties to Tags

1. Configure properties in settings (e.g., `status,type,priority`)
2. Run command: `Ctrl+P` → "Transform properties to tags"
3. Tags will be created: `status: active` → `#status/active`

## Installation

### From Obsidian Community Plugins

1. Open Settings → Community plugins
2. Search for "Properties Toolkit"
3. Click Install, then Enable

### Manual Installation

1. Download `main.js`, `manifest.json`, and `styles.css` from the latest release
2. Create folder `properties-toolkit` in `.obsidian/plugins/`
3. Copy files into the folder
4. Reload Obsidian and enable the plugin

## Multilingual Support

The plugin supports:
- English (en)
- French (fr)

Language is auto-detected from Obsidian settings.

## Author

Christian Vanhenten

## License

[MIT](LICENSE)
