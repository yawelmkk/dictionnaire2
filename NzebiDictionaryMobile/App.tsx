import React, { useState, useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Header } from './src/components/Header';
import { SearchBar } from './src/components/SearchBar';
import { SearchResults } from './src/components/SearchResults';
import { FavoritesModal } from './src/components/FavoritesModal';
import { HistoryModal } from './src/components/HistoryModal';
import { AboutModal } from './src/components/AboutModal';
import { PrivacyModal } from './src/components/PrivacyModal';
import { useDictionary } from './src/hooks/useDictionary';
import { useAsyncStorage } from './src/hooks/useAsyncStorage';
import type { SearchFilters, UserPreferences } from './src/types';

export default function App() {
  const { entries, searchEntries, loading, error } = useDictionary();
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    category: 'all',
    sortBy: 'relevance'
  });
  
  const [preferences, setPreferences, preferencesLoading] = useAsyncStorage<UserPreferences>('nzebi-dictionary-preferences', {
    theme: 'light',
    favorites: [],
    recentSearches: []
  });

  const [showFavorites, setShowFavorites] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const results = searchEntries(query, filters);
  const favoriteEntries = entries.filter(entry => preferences.favorites.includes(entry.id));

  const handleThemeToggle = () => {
    setPreferences(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light'
    }));
  };

  const handleToggleFavorite = (id: string) => {
    setPreferences(prev => ({
      ...prev,
      favorites: prev.favorites.includes(id)
        ? prev.favorites.filter(fav => fav !== id)
        : [...prev.favorites, id]
    }));
  };

  const handleAddToHistory = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setPreferences(prev => ({
      ...prev,
      recentSearches: [
        searchQuery,
        ...prev.recentSearches.filter(search => search !== searchQuery)
      ].slice(0, 20) // Keep only last 20 searches
    }));
  };

  const handleSearchFromHistory = (historyQuery: string) => {
    setQuery(historyQuery);
  };

  const handleClearHistory = () => {
    setPreferences(prev => ({
      ...prev,
      recentSearches: []
    }));
  };

  const handleClearFavorites = () => {
    setPreferences(prev => ({
      ...prev,
      favorites: []
    }));
  };

  if (preferencesLoading) {
    return <View className="flex-1 bg-white" />;
  }

  return (
    <SafeAreaView className={`flex-1 ${
      preferences.theme === 'light' 
        ? 'bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50' 
        : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    }`}>
      <StatusBar style={preferences.theme === 'light' ? 'dark' : 'light'} />
      
      <Header
        theme={preferences.theme}
        onThemeToggle={handleThemeToggle}
        favoritesCount={preferences.favorites.length}
        onShowFavorites={() => setShowFavorites(true)}
        onShowHistory={() => setShowHistory(true)}
        onShowAbout={() => setShowAbout(true)}
        onShowPrivacy={() => setShowPrivacy(true)}
      />

      <SearchBar
        query={query}
        onQueryChange={setQuery}
        filters={filters}
        onFiltersChange={setFilters}
        onAddToHistory={handleAddToHistory}
        theme={preferences.theme}
      />

      <SearchResults
        results={results}
        query={query}
        favorites={preferences.favorites}
        onToggleFavorite={handleToggleFavorite}
        loading={loading}
        error={error}
        theme={preferences.theme}
      />

      <FavoritesModal
        isOpen={showFavorites}
        onClose={() => setShowFavorites(false)}
        favorites={favoriteEntries}
        onToggleFavorite={handleToggleFavorite}
        onClearAll={handleClearFavorites}
        theme={preferences.theme}
      />

      <HistoryModal
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        history={preferences.recentSearches}
        onSearchFromHistory={handleSearchFromHistory}
        onClearHistory={handleClearHistory}
        theme={preferences.theme}
      />

      <AboutModal
        isOpen={showAbout}
        onClose={() => setShowAbout(false)}
        theme={preferences.theme}
      />

      <PrivacyModal
        isOpen={showPrivacy}
        onClose={() => setShowPrivacy(false)}
        theme={preferences.theme}
      />
    </SafeAreaView>
  );
}