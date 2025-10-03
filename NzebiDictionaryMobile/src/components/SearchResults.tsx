import React from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Search, Book } from 'lucide-react-native';
import { WordCard } from './WordCard';
import type { DictionaryEntry } from '../types';

interface SearchResultsProps {
  results: DictionaryEntry[];
  query: string;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  loading?: boolean;
  error?: string | null;
  theme: 'light' | 'dark';
}

export function SearchResults({ 
  results, 
  query, 
  favorites, 
  onToggleFavorite, 
  loading, 
  error,
  theme 
}: SearchResultsProps) {
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center py-12">
        <ActivityIndicator 
          size="large" 
          color={theme === 'light' ? '#f59e0b' : '#fbbf24'} 
        />
        <Text className={`mt-3 ${
          theme === 'light' ? 'text-gray-500' : 'text-gray-400'
        }`}>
          Chargement du dictionnaire...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center py-12 px-4">
        <View className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
          theme === 'light' ? 'bg-red-100' : 'bg-red-900/20'
        }`}>
          <Book size={32} color="#ef4444" />
        </View>
        <Text className={`text-lg font-medium mb-2 ${
          theme === 'light' ? 'text-red-600' : 'text-red-400'
        }`}>
          Erreur de chargement
        </Text>
        <Text className={`text-center max-w-sm ${
          theme === 'light' ? 'text-red-500' : 'text-red-400'
        }`}>
          {error}
        </Text>
      </View>
    );
  }

  if (!query && results.length === 0) {
    return (
      <View className="flex-1 items-center justify-center py-12 px-4">
        <Search size={64} color={theme === 'light' ? '#d1d5db' : '#4b5563'} />
        <Text className={`text-lg font-medium mb-2 mt-4 ${
          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
        }`}>
          Commencez votre recherche
        </Text>
        <Text className={`text-center max-w-sm ${
          theme === 'light' ? 'text-gray-500' : 'text-gray-500'
        }`}>
          Tapez un mot en Nzébi ou en Français pour explorer notre dictionnaire culturel.
        </Text>
      </View>
    );
  }

  if (query && results.length === 0) {
    return (
      <View className="flex-1 items-center justify-center py-12 px-4">
        <Search size={64} color={theme === 'light' ? '#d1d5db' : '#4b5563'} />
        <Text className={`text-lg font-medium mb-2 mt-4 ${
          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
        }`}>
          Aucun résultat trouvé
        </Text>
        <Text className={`text-center max-w-sm ${
          theme === 'light' ? 'text-gray-500' : 'text-gray-500'
        }`}>
          Essayez avec d'autres termes ou vérifiez l'orthographe. Notre recherche intelligente tolère les fautes de frappe.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      {query && (
        <View className="px-4 py-2">
          <Text className={`text-sm ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            {results.length} résultat{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''} pour "{query}"
          </Text>
        </View>
      )}
      
      <View className="pb-4">
        {results.map((entry) => (
          <WordCard
            key={entry.id}
            entry={entry}
            isFavorite={favorites.includes(entry.id)}
            onToggleFavorite={onToggleFavorite}
            theme={theme}
          />
        ))}
      </View>
    </ScrollView>
  );
}