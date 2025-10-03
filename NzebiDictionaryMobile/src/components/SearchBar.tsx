import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Search, ListFilter as Filter, X } from 'lucide-react-native';
import { Picker } from '@react-native-picker/picker';
import type { SearchFilters } from '../types';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onAddToHistory: (query: string) => void;
  theme: 'light' | 'dark';
}

const categories = [
  { id: 'all', label: 'Toutes catégories' },
  { id: 'nom', label: 'Noms' },
  { id: 'verbe', label: 'Verbes' },
  { id: 'adjectif', label: 'Adjectifs' },
  { id: 'adverbe', label: 'Adverbes' },
  { id: 'pronom', label: 'Pronoms' }
];

export function SearchBar({ 
  query, 
  onQueryChange, 
  filters, 
  onFiltersChange, 
  onAddToHistory,
  theme 
}: SearchBarProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onQueryChange(inputValue);
      onAddToHistory(inputValue.trim());
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    onQueryChange(value);
  };

  const clearSearch = () => {
    setInputValue('');
    onQueryChange('');
  };

  return (
    <View className="w-full px-4 py-4 space-y-4">
      <View className="relative">
        <View className={`flex-row items-center border rounded-xl px-3 py-4 ${
          theme === 'light' 
            ? 'bg-white border-gray-300' 
            : 'bg-gray-800 border-gray-600'
        }`}>
          <Search size={20} color={theme === 'light' ? '#9ca3af' : '#6b7280'} />
          <TextInput
            value={inputValue}
            onChangeText={handleInputChange}
            onSubmitEditing={handleSubmit}
            placeholder="Rechercher un mot en Nzébi ou en Français..."
            placeholderTextColor={theme === 'light' ? '#9ca3af' : '#6b7280'}
            className={`flex-1 ml-3 text-lg ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}
            returnKeyType="search"
          />
          <View className="flex-row items-center space-x-2">
            {inputValue ? (
              <TouchableOpacity onPress={clearSearch} className="p-1">
                <X size={16} color={theme === 'light' ? '#9ca3af' : '#6b7280'} />
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              onPress={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-lg ${
                showFilters 
                  ? theme === 'light' 
                    ? 'bg-amber-100' 
                    : 'bg-amber-900/20'
                  : theme === 'light' 
                    ? 'bg-gray-100' 
                    : 'bg-gray-700'
              }`}
            >
              <Filter 
                size={16} 
                color={
                  showFilters 
                    ? theme === 'light' ? '#d97706' : '#f59e0b'
                    : theme === 'light' ? '#9ca3af' : '#6b7280'
                } 
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {showFilters && (
        <View className={`border rounded-xl p-4 ${
          theme === 'light' 
            ? 'bg-white border-gray-200' 
            : 'bg-gray-800 border-gray-700'
        }`}>
          <View className="space-y-4">
            <View>
              <Text className={`text-sm font-medium mb-2 ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                Catégorie grammaticale
              </Text>
              <View className={`border rounded-lg ${
                theme === 'light' 
                  ? 'border-gray-300 bg-white' 
                  : 'border-gray-600 bg-gray-700'
              }`}>
                <Picker
                  selectedValue={filters.category}
                  onValueChange={(value) => onFiltersChange({ ...filters, category: value })}
                  style={{ 
                    color: theme === 'light' ? '#1f2937' : '#ffffff',
                    backgroundColor: 'transparent'
                  }}
                >
                  {categories.map((category) => (
                    <Picker.Item 
                      key={category.id} 
                      label={category.label} 
                      value={category.id}
                      color={theme === 'light' ? '#1f2937' : '#ffffff'}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <View>
              <Text className={`text-sm font-medium mb-2 ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                Tri des résultats
              </Text>
              <View className={`border rounded-lg ${
                theme === 'light' 
                  ? 'border-gray-300 bg-white' 
                  : 'border-gray-600 bg-gray-700'
              }`}>
                <Picker
                  selectedValue={filters.sortBy}
                  onValueChange={(value) => onFiltersChange({ ...filters, sortBy: value as 'alphabetical' | 'relevance' })}
                  style={{ 
                    color: theme === 'light' ? '#1f2937' : '#ffffff',
                    backgroundColor: 'transparent'
                  }}
                >
                  <Picker.Item 
                    label="Par pertinence" 
                    value="relevance"
                    color={theme === 'light' ? '#1f2937' : '#ffffff'}
                  />
                  <Picker.Item 
                    label="Par ordre alphabétique" 
                    value="alphabetical"
                    color={theme === 'light' ? '#1f2937' : '#ffffff'}
                  />
                </Picker>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}