import * as SQLite from 'expo-sqlite';
import type { DictionaryEntry } from '../types';

const DB_NAME = 'nzebi_dictionary.db';

// Ouvrir la base de données SQLite
export async function openDatabase(): Promise<SQLite.SQLiteDatabase> {
  const db = await SQLite.openDatabaseAsync(DB_NAME);
  
  // Créer la table si elle n'existe pas
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS dictionary_entries (
      id TEXT PRIMARY KEY,
      nzebi_word TEXT NOT NULL,
      french_word TEXT NOT NULL,
      part_of_speech TEXT NOT NULL,
      example_nzebi TEXT,
      example_french TEXT,
      pronunciation_url TEXT,
      plural_form TEXT,
      synonyms TEXT,
      scientific_name TEXT,
      imperative TEXT
    );
    
    CREATE INDEX IF NOT EXISTS idx_nzebi_word ON dictionary_entries(nzebi_word);
    CREATE INDEX IF NOT EXISTS idx_french_word ON dictionary_entries(french_word);
    CREATE INDEX IF NOT EXISTS idx_part_of_speech ON dictionary_entries(part_of_speech);
  `);
  
  return db;
}

// Récupérer toutes les entrées du dictionnaire
export async function getDictionaryEntries(): Promise<DictionaryEntry[]> {
  try {
    const db = await openDatabase();
    const result = await db.getAllAsync('SELECT * FROM dictionary_entries ORDER BY nzebi_word');
    return result as DictionaryEntry[];
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    return [];
  }
}

// Ajouter des entrées du dictionnaire
export async function addDictionaryEntries(entries: DictionaryEntry[]): Promise<void> {
  try {
    const db = await openDatabase();
    
    for (const entry of entries) {
      await db.runAsync(
        `INSERT OR REPLACE INTO dictionary_entries 
         (id, nzebi_word, french_word, part_of_speech, example_nzebi, example_french, 
          pronunciation_url, plural_form, synonyms, scientific_name, imperative) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          entry.id,
          entry.nzebi_word,
          entry.french_word,
          entry.part_of_speech,
          entry.example_nzebi,
          entry.example_french,
          entry.pronunciation_url,
          entry.plural_form,
          entry.synonyms,
          entry.scientific_name,
          entry.imperative
        ]
      );
    }
    
    console.log(`${entries.length} entrées ajoutées à SQLite`);
  } catch (error) {
    console.error('Erreur lors de l\'ajout des entrées:', error);
    throw error;
  }
}

// Vérifier si la base de données est vide
export async function isDatabaseEmpty(): Promise<boolean> {
  try {
    const db = await openDatabase();
    const result = await db.getFirstAsync('SELECT COUNT(*) as count FROM dictionary_entries');
    return (result as any)?.count === 0;
  } catch (error) {
    console.error('Erreur lors de la vérification de la base de données:', error);
    return true;
  }
}

// Vider la base de données
export async function clearDatabase(): Promise<void> {
  try {
    const db = await openDatabase();
    await db.runAsync('DELETE FROM dictionary_entries');
    console.log('Base de données vidée');
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    throw error;
  }
}