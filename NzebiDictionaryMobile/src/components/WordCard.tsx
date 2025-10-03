import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Heart, Volume2, Tag, FileText, MessageSquare, BookOpen, Beaker } from 'lucide-react-native';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import type { DictionaryEntry } from '../types';

interface WordCardProps {
  entry: DictionaryEntry;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  theme: 'light' | 'dark';
}

export function WordCard({ entry, isFavorite, onToggleFavorite, theme }: WordCardProps) {
  const handlePlayPronunciation = async () => {
    // If pronunciation URL is available, play it
    if (entry.pronunciation_url && entry.pronunciation_url.trim()) {
      try {
        const { sound } = await Audio.Sound.createAsync({ uri: entry.pronunciation_url });
        await sound.playAsync();
      } catch (error) {
        console.error('Error playing audio:', error);
        // Fallback to speech synthesis
        Speech.speak(entry.nzebi_word, { language: 'fr', rate: 0.7 });
      }
    } else {
      // Fallback to speech synthesis
      Speech.speak(entry.nzebi_word, { language: 'fr', rate: 0.7 });
    }
  };

  const getNatureBadgeColor = (nature: string) => {
    switch (nature.toLowerCase()) {
      case 'nom':
        return theme === 'light' 
          ? 'bg-blue-100 text-blue-800' 
          : 'bg-blue-900/20 text-blue-300';
      case 'verbe':
        return theme === 'light' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-green-900/20 text-green-300';
      case 'adjectif':
        return theme === 'light' 
          ? 'bg-purple-100 text-purple-800' 
          : 'bg-purple-900/20 text-purple-300';
      case 'adverbe':
        return theme === 'light' 
          ? 'bg-orange-100 text-orange-800' 
          : 'bg-orange-900/20 text-orange-300';
      default:
        return theme === 'light' 
          ? 'bg-gray-100 text-gray-800' 
          : 'bg-gray-900/20 text-gray-300';
    }
  };

  return (
    <View className={`rounded-xl border shadow-sm mx-4 mb-4 ${
      theme === 'light' 
        ? 'bg-white border-gray-200' 
        : 'bg-gray-800 border-gray-700'
    }`}>
      <View className="p-6">
        {/* Header */}
        <View className="flex-row items-start justify-between mb-4">
          <View className="flex-1">
            <View className="flex-row items-center mb-2">
              <Text className={`text-2xl font-bold mr-3 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                {entry.nzebi_word}
              </Text>
              <TouchableOpacity
                onPress={handlePlayPronunciation}
                className="p-1.5 rounded-full"
              >
                <Volume2 
                  size={16} 
                  color={theme === 'light' ? '#6b7280' : '#9ca3af'} 
                />
              </TouchableOpacity>
            </View>
            <Text className={`text-lg mb-2 ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}>
              {entry.french_word}
            </Text>
            <View className="flex-row items-center">
              <View className={`flex-row items-center px-2.5 py-1 rounded-full ${getNatureBadgeColor(entry.part_of_speech)}`}>
                <Tag size={12} />
                <Text className="text-xs font-medium ml-1">
                  {entry.part_of_speech}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => onToggleFavorite(entry.id)}
            className={`p-2 rounded-full ${
              isFavorite
                ? theme === 'light' 
                  ? 'bg-red-50' 
                  : 'bg-red-900/20'
                : ''
            }`}
          >
            <Heart 
              size={20} 
              color={isFavorite ? '#ef4444' : theme === 'light' ? '#9ca3af' : '#6b7280'}
              fill={isFavorite ? '#ef4444' : 'none'}
            />
          </TouchableOpacity>
        </View>

        {/* Examples */}
        {(entry.example_nzebi || entry.example_french) && (
          <View className="mb-4">
            <View className="flex-row items-center mb-2">
              <MessageSquare 
                size={16} 
                color={theme === 'light' ? '#6b7280' : '#9ca3af'} 
              />
              <Text className={`text-sm font-medium ml-2 ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                Exemple
              </Text>
            </View>
            <View className="ml-6 space-y-1">
              {entry.example_nzebi && (
                <Text className={`italic ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                }`}>
                  {entry.example_nzebi}
                </Text>
              )}
              {entry.example_french && (
                <Text className={`text-sm ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {entry.example_french}
                </Text>
              )}
            </View>
          </View>
        )}

        {/* Additional Information */}
        <View className="space-y-3">
          {/* Plural Form */}
          {entry.plural_form && (
            <View className="flex-row items-start">
              <BookOpen 
                size={16} 
                color={theme === 'light' ? '#6b7280' : '#9ca3af'} 
              />
              <View className="ml-2 flex-1">
                <Text className={`text-sm ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  <Text className="font-medium">Forme plurielle : </Text>
                  <Text className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>
                    {entry.plural_form}
                  </Text>
                </Text>
              </View>
            </View>
          )}

          {/* Imperative */}
          {entry.imperative && (
            <View className="flex-row items-start">
              <Tag 
                size={16} 
                color={theme === 'light' ? '#6b7280' : '#9ca3af'} 
              />
              <View className="ml-2 flex-1">
                <Text className={`text-sm ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  <Text className="font-medium">Impératif : </Text>
                  <Text className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>
                    {entry.imperative}
                  </Text>
                </Text>
              </View>
            </View>
          )}

          {/* Synonyms */}
          {entry.synonyms && (
            <View className="flex-row items-start">
              <FileText 
                size={16} 
                color={theme === 'light' ? '#6b7280' : '#9ca3af'} 
              />
              <View className="ml-2 flex-1">
                <Text className={`text-sm ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  <Text className="font-medium">Synonymes : </Text>
                  <Text className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>
                    {entry.synonyms}
                  </Text>
                </Text>
              </View>
            </View>
          )}

          {/* Scientific Name */}
          {entry.scientific_name && (
            <View className="flex-row items-start">
              <Beaker 
                size={16} 
                color={theme === 'light' ? '#6b7280' : '#9ca3af'} 
              />
              <View className="ml-2 flex-1">
                <Text className={`text-sm ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  <Text className="font-medium">Nom scientifique : </Text>
                  <Text className={`italic ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    {entry.scientific_name}
                  </Text>
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}