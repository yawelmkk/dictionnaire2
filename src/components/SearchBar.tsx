import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Search, Filter, X } from 'lucide-react';
import type { SearchFilters } from '../types';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onAddToHistory: (query: string) => void;
}

export function SearchBar({ query, onQueryChange, filters, onFiltersChange, onAddToHistory }: SearchBarProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [inputValue, setInputValue] = useState(query);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onQueryChange(inputValue);
      onAddToHistory(inputValue.trim());
    }
  };

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onQueryChange(value);
    }, 50);
  }, [onQueryChange]);

  const clearSearch = useCallback(() => {
    setInputValue('');
    onQueryChange('');
  }, [onQueryChange]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Rechercher un mot en Nzébi ou en Français..."
            translate="no"
            className="w-full pl-10 pr-20 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-xl 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                     focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200
                     shadow-sm hover:shadow-md focus:shadow-lg"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            {inputValue && (
              <button
                type="button"
                onClick={clearSearch}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                showFilters 
                  ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400'
              }`}
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>

      {showFilters && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-lg animate-in slide-in-from-top duration-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tri des résultats
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => onFiltersChange({ ...filters, sortBy: e.target.value as 'alphabetical' | 'relevance' })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors duration-200"
            >
              <option value="alphabetical">Par ordre alphabétique</option>
              <option value="relevance">Par pertinence</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}