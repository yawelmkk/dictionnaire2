import { useState, useEffect, useMemo } from 'react';
import type { DictionaryEntry, SearchFilters } from '../types';
import { getDictionaryEntries, addDictionaryEntries, isDatabaseEmpty } from '../utils/indexedDB';

export function useDictionary() {
  const [entries, setEntries] = useState<DictionaryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        setLoading(true);
        setError(null);

        // Vérifier si IndexedDB contient déjà des données
        const isEmpty = await isDatabaseEmpty();
        
        if (!isEmpty) {
          // Charger depuis IndexedDB
          console.log('Chargement des données depuis IndexedDB...');
          const indexedDBEntries = await getDictionaryEntries();
          setEntries(indexedDBEntries);
          console.log(`${indexedDBEntries.length} entrées chargées depuis IndexedDB`);
        } else {
          // Première utilisation : charger depuis le fichier JSON et sauvegarder dans IndexedDB
          console.log('Première utilisation : chargement depuis dictionary.json...');
          
          try {
            const response = await fetch('/src/data/dictionary.json');
            if (!response.ok) {
              throw new Error(`Erreur HTTP: ${response.status}`);
            }
            
            const jsonData = await response.json();
            const jsonEntries: DictionaryEntry[] = Array.isArray(jsonData) ? jsonData : jsonData.default || [];
            
            if (jsonEntries.length === 0) {
              throw new Error('Aucune donnée trouvée dans le fichier JSON');
            }

            // Sauvegarder dans IndexedDB pour les utilisations futures
            await addDictionaryEntries(jsonEntries);
            setEntries(jsonEntries);
            console.log(`${jsonEntries.length} entrées chargées depuis JSON et sauvegardées dans IndexedDB`);
          } catch (jsonError) {
            console.error('Erreur lors du chargement du fichier JSON:', jsonError);
            
            // Fallback : essayer d'importer directement le module
            try {
              const module = await import('../data/dictionary.json');
              const fallbackEntries: DictionaryEntry[] = module.default || [];
              
              if (fallbackEntries.length > 0) {
                await addDictionaryEntries(fallbackEntries);
                setEntries(fallbackEntries);
                console.log(`${fallbackEntries.length} entrées chargées via import fallback`);
              } else {
                throw new Error('Aucune donnée dans le fallback');
              }
            } catch (fallbackError) {
              console.error('Erreur lors du fallback:', fallbackError);
              setError('Impossible de charger les données du dictionnaire');
            }
          }
        }
      } catch (err) {
        console.error('Erreur lors du chargement du dictionnaire:', err);
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    loadDictionary();
  }, []);

  const searchEntries = useMemo(() => {
    return (query: string, filters: SearchFilters) => {
      if (!query && filters.category === 'all') return entries;

      let filtered = entries;

      // Filter by category
      if (filters.category !== 'all') {
        filtered = filtered.filter(entry =>
          entry.part_of_speech.toLowerCase() === filters.category.toLowerCase()
        );
      }

      // Search query with optimized matching
      if (query) {
        const searchTerm = query.toLowerCase().trim();
        const words = searchTerm.split(' ').filter(w => w.length > 0);

        filtered = filtered.filter(entry => {
          // Exact match gets highest priority
          const nzebiLower = entry.nzebi_word.toLowerCase();
          const frenchLower = entry.french_word.toLowerCase();

          if (nzebiLower.includes(searchTerm) || frenchLower.includes(searchTerm)) {
            return true;
          }

          // Check if all words are present (partial match)
          return words.every(word => {
            return nzebiLower.includes(word) ||
                   frenchLower.includes(word) ||
                   entry.example_nzebi.toLowerCase().includes(word) ||
                   entry.example_french.toLowerCase().includes(word) ||
                   (word.length >= 3 && levenshteinDistance(word, nzebiLower) <= 1);
          });
        });

        // Sort by relevance
        if (filters.sortBy === 'relevance') {
          filtered.sort((a, b) => {
            const aScore = getRelevanceScore(a, searchTerm);
            const bScore = getRelevanceScore(b, searchTerm);
            return bScore - aScore;
          });
        }
      }

      // Sort alphabetically if specified
      if (filters.sortBy === 'alphabetical') {
        filtered.sort((a, b) => a.nzebi_word.localeCompare(b.nzebi_word));
      }

      return filtered;
    };
  }, [entries]);

  return { entries, searchEntries, loading, error };
}

// Helper function for fuzzy string matching
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));

  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + indicator // substitution
      );
    }
  }

  return matrix[str2.length][str1.length];
}

// Helper function to calculate relevance score
function getRelevanceScore(entry: DictionaryEntry, searchTerm: string): number {
  let score = 0;
  const term = searchTerm.toLowerCase();

  // Exact match in Nzébi word gets highest score
  if (entry.nzebi_word.toLowerCase().includes(term)) score += 10;
  
  // Match in French translation
  if (entry.french_word.toLowerCase().includes(term)) score += 8;
  
  // Match in examples
  if (entry.example_nzebi.toLowerCase().includes(term)) score += 5;
  if (entry.example_french.toLowerCase().includes(term)) score += 5;
  
  // Match in other fields
  if (entry.plural_form.toLowerCase().includes(term)) score += 6;
  if (entry.synonyms.toLowerCase().includes(term)) score += 6;
  if (entry.scientific_name.toLowerCase().includes(term)) score += 4;
  if (entry.imperative.toLowerCase().includes(term)) score += 6;

  return score;
}