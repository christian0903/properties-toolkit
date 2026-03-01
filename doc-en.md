# Properties Toolkit - Documentation

## Overview

Properties Toolkit is a comprehensive Obsidian plugin for managing frontmatter properties. It combines two feature sets:

1. **Property Management**: Delete empty values, convert between list and text types, search and replace values
2. **Property-Tag Transformation**: Bidirectional transformation between YAML properties and tags

---

## Property Management Commands

### Delete all empty properties (vault)

Scans the entire vault and removes all properties that are:
- `null`
- `undefined`
- Empty strings `""`
- Empty arrays `[]`

**Workflow:**
1. Run the command
2. Preview affected files
3. Confirm to delete

### Convert property type (vault)

Allows converting a specific property type across all files.

**Available operations:**

| Operation | Description |
|-----------|-------------|
| List → Text | Converts `["value"]` to `"value"` |
| Text → List | Converts `"value"` to `["value"]` |
| Delete empty | Removes property where it's empty |

**Workflow:**
1. Run the command
2. Select a property (fuzzy search)
3. Choose an applicable operation
4. Preview and confirm

### Search and replace value in property

Find and replace a specific value within a property across all files.

**Workflow:**
1. Run the command
2. Enter the property name (e.g., `status`)
3. Enter the value to search (e.g., `draft`)
4. Enter the replacement value (leave empty to delete the value)
5. Preview affected files
6. Confirm to apply changes

**Notes:**
- Works with both single values and arrays
- If replacing in an array, only matching values are changed
- If replacement is empty and array becomes empty, property is removed

---

## Property-Tag Transformation Commands

### Transform properties to tags

Converts YAML properties to structured tags.

**Example:**
```yaml
# Before
status: active
type: note
```

```yaml
# After (with removeSource: false)
status: active
type: note
tags: ["status/active", "type/note"]
```

### Transform tags to properties

Converts structured tags to YAML properties.

**Example:**
```yaml
# Before
tags: ["status/active", "type/note"]
```

```yaml
# After (with removeSource: false)
status: active
type: note
tags: ["status/active", "type/note"]
```

### Remove corresponding properties

Deletes properties that have a matching tag.

### Remove corresponding tags

Deletes tags that have a matching property.

### Analyze property tags

Generates a detailed analysis report:
- **By properties**: Overview of values and files
- **By notes**: Detailed state of each file

---

## Settings

### Language
Interface available in English and French. Auto-detected.

### Target folder
Limits operations to a specific folder. Empty = entire vault.

### Property list
Properties to transform, comma-separated.
Example: `status,type,priority`

### Overwrite existing values
If enabled, replaces existing values during transformation.

### Add value if exists
If enabled, adds new value to existing property (transforms to list).

### Remove source after transformation
If enabled, deletes original property/tag after conversion.

### Tags in YAML zone
If enabled, tags are added to frontmatter. Otherwise, inline.

### Tag search location
Where to search for tags: YAML only, content only, or both.

### Analysis type
Report format: by properties or by notes (detailed).

### Detailed logging
If enabled, creates a log file for each transformation.

---

## Usage Tips

1. **Make a backup** before bulk modifications
2. Use **analysis** before transforming to see what will be affected
3. Test first on a **restricted folder** before applying to entire vault
4. Enable **logging** to track modifications

---

*Plugin developed by Christian Vanhenten*
