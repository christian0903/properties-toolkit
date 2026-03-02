import { App } from 'obsidian';

interface TypesFile {
  types: Record<string, string>;
}

/**
 * Update the property type in types.json so Obsidian
 * shows the correct icon and handles the property accordingly.
 */
export async function updatePropertyType(
  app: App,
  propertyName: string,
  newType: string
): Promise<void> {
  const typesPath = `${app.vault.configDir}/types.json`;
  let data: TypesFile = { types: {} };

  try {
    const raw = await app.vault.adapter.read(typesPath);
    data = JSON.parse(raw) as TypesFile;
  } catch {
    // File doesn't exist or is invalid — start fresh
    data = { types: {} };
  }

  data.types[propertyName] = newType;

  await app.vault.adapter.write(typesPath, JSON.stringify(data, null, '  '));
}
