import { useState, useEffect, useMemo } from 'react';
import type { DictionaryEntry, SearchFilters } from '../types';

export function useDictionary() {
  const [entries, setEntries] = useState<DictionaryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading dictionary data
    import('../data/dictionary.json')
      .then((data) => {
        setEntries(data.default);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading dictionary:', error);
        setLoading(false);
      });
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

      // Search query with fuzzy matching
      if (query) {
        const searchTerm = query.toLowerCase().trim();
        filtered = filtered.filter(entry => {
          const searchableText = [
            entry.nzebi_word,
            entry.french_word,
            entry.example_nzebi,
            entry.example_french,
            entry.plural_form,
            entry.synonyms,
            entry.scientific_name,
            entry.imperative
          ].join(' ').toLowerCase();

          // Exact match gets highest priority
          if (searchableText.includes(searchTerm)) return true;

          // Fuzzy matching for partial words
          const words = searchTerm.split(' ');
          return words.some(word => {
            return searchableText.includes(word) || 
                   levenshteinDistance(word, entry.nzebi_word.toLowerCase()) <= 2;
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

  return { entries, searchEntries, loading };
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