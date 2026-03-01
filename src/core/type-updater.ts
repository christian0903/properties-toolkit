import { App } from 'obsidian';

const TYPES_PATH = '.obsidian/types.json';

interface TypesFile {
  types: Record<string, string>;
}

/**
 * Update the property type in .obsidian/types.json so Obsidian
 * shows the correct icon and handles the property accordingly.
 */
export async function updatePropertyType(
  app: App,
  propertyName: string,
  newType: string
): Promise<void> {
  let data: TypesFile = { types: {} };

  try {
    const raw = await app.vault.adapter.read(TYPES_PATH);
    data = JSON.parse(raw);
  } catch {
    // File doesn't exist or is invalid — start fresh
    data = { types: {} };
  }

  data.types[propertyName] = newType;

  await app.vault.adapter.write(TYPES_PATH, JSON.stringify(data, null, '  '));
}
