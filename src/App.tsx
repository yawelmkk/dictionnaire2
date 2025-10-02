import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { SearchResults } from './components/SearchResults';
import { FavoritesModal } from './components/FavoritesModal';
import { HistoryModal } from './components/HistoryModal';
import { AboutModal } from './components/AboutModal';
import { PrivacyModal } from './components/PrivacyModal';
import { useDictionary } from './hooks/useDictionary';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { SearchFilters, UserPreferences } from './types';

function App() {
  const { entries, searchEntries, loading } = useDictionary();
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    category: 'all',
    sortBy: 'relevance'
  });
  
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>('nzebi-dictionary-preferences', {
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

  // Apply theme to document
  useEffect(() => {
    if (preferences.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [preferences.theme]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Header
        theme={preferences.theme}
        onThemeToggle={handleThemeToggle}
        favoritesCount={preferences.favorites.length}
        onShowFavorites={() => setShowFavorites(true)}
        onShowHistory={() => setShowHistory(true)}
        onShowAbout={() => setShowAbout(true)}
        onShowPrivacy={() => setShowPrivacy(true)}
      />

      {/* Sticky Search Bar */}
      <div className="sticky top-16 z-30 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <SearchBar
            query={query}
            onQueryChange={setQuery}
            filters={filters}
            onFiltersChange={setFilters}
            onAddToHistory={handleAddToHistory}
          />
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <SearchResults
          results={results}
          query={query}
          favorites={preferences.favorites}
          onToggleFavorite={handleToggleFavorite}
          loading={loading}
        />
      </main>

      <FavoritesModal
        isOpen={showFavorites}
        onClose={() => setShowFavorites(false)}
        favorites={favoriteEntries}
        onToggleFavorite={handleToggleFavorite}
        onClearAll={handleClearFavorites}
      />

      <HistoryModal
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        history={preferences.recentSearches}
        onSearchFromHistory={handleSearchFromHistory}
        onClearHistory={handleClearHistory}
      />

      <AboutModal
        isOpen={showAbout}
        onClose={() => setShowAbout(false)}
      />

      <PrivacyModal
        isOpen={showPrivacy}
        onClose={() => setShowPrivacy(false)}
      />

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Dictionnaire Nzébi - Préservation et promotion du patrimoine linguistique africain
          </p>
        </div>
      </footer>

      {/* Portail pour les modales - rendu à la fin pour être au-dessus de tout */}
      <div id="modal-portal"></div>
    </div>
  );
}

export default App;