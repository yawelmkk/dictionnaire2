import React from 'react';
import { Search, Book } from 'lucide-react';
import { WordCard } from './WordCard';
import type { DictionaryEntry } from '../types';

interface SearchResultsProps {
  results: DictionaryEntry[];
  query: string;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  loading?: boolean;
}

export function SearchResults({ results, query, favorites, onToggleFavorite, loading }: SearchResultsProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-pulse flex items-center gap-3 text-gray-500 dark:text-gray-400">
          <Book className="w-6 h-6" />
          <span>Chargement du dictionnaire...</span>
        </div>
      </div>
    );
  }

  if (!query && results.length === 0) {
    return (
      <div className="text-center py-12">
        <Search className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
          Commencez votre recherche
        </h3>
        <p className="text-gray-500 dark:text-gray-500 max-w-md mx-auto">
          Tapez un mot en Nzébi ou en Français pour explorer notre dictionnaire culturel.
        </p>
      </div>
    );
  }

  if (query && results.length === 0) {
    return (
      <div className="text-center py-12">
        <Search className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
          Aucun résultat trouvé
        </h3>
        <p className="text-gray-500 dark:text-gray-500 max-w-md mx-auto">
          Essayez avec d'autres termes ou vérifiez l'orthographe. Notre recherche intelligente tolère les fautes de frappe.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {query && (
        <div className="flex items-center justify-between py-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {results.length} résultat{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''} pour "{query}"
          </p>
        </div>
      )}
      
      <div className="grid gap-6">
        {results.map((entry) => (
          <WordCard
            key={entry.id}
            entry={entry}
            isFavorite={favorites.includes(entry.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}