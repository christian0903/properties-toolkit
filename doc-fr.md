# Properties Toolkit - Documentation

## Vue d'ensemble

Properties Toolkit est un plugin Obsidian complet pour gérer les propriétés frontmatter. Il combine deux ensembles de fonctionnalités :

1. **Gestion des propriétés** : Supprimer les valeurs vides, convertir entre types liste et texte, rechercher et remplacer des valeurs
2. **Transformation Property↔Tag** : Transformation bidirectionnelle entre propriétés YAML et tags

---

## Commandes de gestion des propriétés

### Supprimer toutes les propriétés vides (vault)

Scanne l'ensemble du vault et supprime toutes les propriétés qui sont :
- `null`
- `undefined`
- Chaînes vides `""`
- Tableaux vides `[]`

**Workflow :**
1. Exécuter la commande
2. Prévisualiser les fichiers affectés
3. Confirmer pour supprimer

### Convertir le type d'une propriété (vault)

Permet de convertir le type d'une propriété spécifique dans tous les fichiers.

**Opérations disponibles :**

| Opération | Description |
|-----------|-------------|
| List → Text | Convertit `["valeur"]` en `"valeur"` |
| Text → List | Convertit `"valeur"` en `["valeur"]` |
| Supprimer vides | Supprime la propriété où elle est vide |

**Workflow :**
1. Exécuter la commande
2. Sélectionner une propriété (recherche fuzzy)
3. Choisir une opération applicable
4. Prévisualiser et confirmer

### Rechercher et remplacer valeur dans propriété

Recherche et remplace une valeur spécifique dans une propriété à travers tous les fichiers.

**Workflow :**
1. Exécuter la commande
2. Saisir le nom de la propriété (ex: `status`)
3. Saisir la valeur à chercher (ex: `brouillon`)
4. Saisir la nouvelle valeur (vide = supprimer la valeur)
5. Prévisualiser les fichiers affectés
6. Confirmer pour appliquer

**Notes :**
- Fonctionne avec les valeurs simples et les tableaux
- Dans un tableau, seules les valeurs correspondantes sont modifiées
- Si remplacement vide et tableau devient vide, la propriété est supprimée

---

## Commandes de transformation Property↔Tag

### Transposer propriétés en tags

Convertit les propriétés YAML en tags structurés.

**Exemple :**
```yaml
# Avant
status: active
type: note
```

```yaml
# Après (avec removeSource: false)
status: active
type: note
tags: ["status/active", "type/note"]
```

### Transposer tags en propriétés

Convertit les tags structurés en propriétés YAML.

**Exemple :**
```yaml
# Avant
tags: ["status/active", "type/note"]
```

```yaml
# Après (avec removeSource: false)
status: active
type: note
tags: ["status/active", "type/note"]
```

### Effacer propriétés correspondantes

Supprime les propriétés qui ont un tag correspondant.

### Effacer tags correspondants

Supprime les tags qui ont une propriété correspondante.

### Analyser les tags de propriétés

Génère un rapport d'analyse détaillé :
- **Par propriétés** : Vue d'ensemble des valeurs et fichiers
- **Par notes** : État détaillé de chaque fichier

---

## Paramètres

### Langue
Interface disponible en Anglais et Français. Détection automatique.

### Dossier cible
Limite les opérations à un dossier spécifique. Vide = tout le vault.

### Liste de propriétés
Propriétés à transformer, séparées par des virgules.
Exemple : `status,type,priority`

### Écraser les valeurs existantes
Si activé, remplace les valeurs existantes lors de la transformation.

### Ajouter valeur si existe
Si activé, ajoute la nouvelle valeur à la propriété existante (transforme en liste).

### Effacer source après transformation
Si activé, supprime la propriété/tag d'origine après conversion.

### Tags dans zone YAML
Si activé, les tags sont ajoutés dans le frontmatter. Sinon, en inline.

### Localisation des tags
Où chercher les tags : YAML uniquement, contenu uniquement, ou les deux.

### Type d'analyse
Format du rapport : par propriétés ou par notes (détaillé).

### Logging détaillé
Si activé, crée un fichier de log pour chaque transformation.

---

## Conseils d'utilisation

1. **Faites une sauvegarde** avant d'effectuer des modifications en masse
2. Utilisez l'**analyse** avant de transformer pour voir ce qui sera affecté
3. Testez d'abord sur un **dossier restreint** avant d'appliquer au vault entier
4. Activez le **logging** pour tracer les modifications

---

*Plugin développé par Christian Vanhenten*
