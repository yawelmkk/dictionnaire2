import type { DictionaryEntry } from '../types';

const DB_NAME = 'NzebiDictionaryDB';
const DB_VERSION = 1;
const STORE_NAME = 'dictionaryEntries';

// Ouvrir la base de données IndexedDB
export function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(new Error('Erreur lors de l\'ouverture de la base de données'));
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Créer l'object store s'il n'existe pas
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        
        // Créer des index pour améliorer les performances de recherche
        store.createIndex('nzebi_word', 'nzebi_word', { unique: false });
        store.createIndex('french_word', 'french_word', { unique: false });
        store.createIndex('part_of_speech', 'part_of_speech', { unique: false });
      }
    };
  });
}

// Récupérer toutes les entrées du dictionnaire depuis IndexedDB
export async function getDictionaryEntries(): Promise<DictionaryEntry[]> {
  try {
    const db = await openDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onerror = () => {
        reject(new Error('Erreur lors de la récupération des données'));
      };

      request.onsuccess = () => {
        resolve(request.result || []);
      };
    });
  } catch (error) {
    console.error('Erreur IndexedDB:', error);
    return [];
  }
}

// Ajouter des entrées du dictionnaire dans IndexedDB
export async function addDictionaryEntries(entries: DictionaryEntry[]): Promise<void> {
  try {
    const db = await openDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      // Ajouter toutes les entrées
      entries.forEach(entry => {
        store.put(entry);
      });

      transaction.oncomplete = () => {
        console.log(`${entries.length} entrées ajoutées à IndexedDB`);
        resolve();
      };

      transaction.onerror = () => {
        reject(new Error('Erreur lors de l\'ajout des données'));
      };
    });
  } catch (error) {
    console.error('Erreur lors de l\'ajout des entrées:', error);
    throw error;
  }
}

// Vérifier si IndexedDB contient des données
export async function isDatabaseEmpty(): Promise<boolean> {
  try {
    const entries = await getDictionaryEntries();
    return entries.length === 0;
  } catch (error) {
    console.error('Erreur lors de la vérification de la base de données:', error);
    return true;
  }
}

// Vider la base de données (utile pour le développement)
export async function clearDatabase(): Promise<void> {
  try {
    const db = await openDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onerror = () => {
        reject(new Error('Erreur lors de la suppression des données'));
      };

      request.onsuccess = () => {
        console.log('Base de données vidée');
        resolve();
      };
    });
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    throw error;
  }
}