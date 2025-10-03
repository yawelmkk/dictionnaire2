import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { X, Heart, Trash2 } from 'lucide-react-native';
import { WordCard } from './WordCard';
import type { DictionaryEntry } from '../types';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: DictionaryEntry[];
  onToggleFavorite: (id: string) => void;
  onClearAll: () => void;
  theme: 'light' | 'dark';
}

export function FavoritesModal({ 
  isOpen, 
  onClose, 
  favorites, 
  onToggleFavorite, 
  onClearAll,
  theme 
}: FavoritesModalProps) {
  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View className={`flex-1 ${
        theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'
      }`}>
        {/* Header */}
        <View className={`border-b px-6 py-4 pt-12 ${
          theme === 'light' 
            ? 'bg-white border-gray-200' 
            : 'bg-gray-800 border-gray-700'
        }`}>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Heart size={24} color="#ef4444" fill="#ef4444" />
              <Text className={`text-xl font-bold ml-3 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Mes Favoris
              </Text>
              <View className={`px-2 py-1 rounded-full ml-2 ${
                theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'
              }`}>
                <Text className={`text-sm ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                }`}>
                  {favorites.length}
                </Text>
              </View>
            </View>
            
            <View className="flex-row items-center space-x-2">
              {favorites.length > 0 && (
                <TouchableOpacity
                  onPress={onClearAll}
                  className={`p-2 rounded-lg ${
                    theme === 'light' ? 'bg-red-50' : 'bg-red-900/20'
                  }`}
                >
                  <Trash2 size={20} color="#ef4444" />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={onClose}
                className={`p-2 rounded-lg ${
                  theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'
                }`}
              >
                <X size={20} color={theme === 'light' ? '#6b7280' : '#9ca3af'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Content */}
        {favorites.length === 0 ? (
          <View className="flex-1 items-center justify-center px-4">
            <Heart size={64} color={theme === 'light' ? '#d1d5db' : '#4b5563'} />
            <Text className={`text-lg font-medium mb-2 mt-4 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Aucun favori encore
            </Text>
            <Text className={`text-center ${
              theme === 'light' ? 'text-gray-500' : 'text-gray-500'
            }`}>
              Cliquez sur le cœur des mots que vous souhaitez sauvegarder.
            </Text>
          </View>
        ) : (
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View className="py-4">
              {favorites.map((entry) => (
                <WordCard
                  key={entry.id}
                  entry={entry}
                  isFavorite={true}
                  onToggleFavorite={onToggleFavorite}
                  theme={theme}
                />
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    </Modal>
  );
}