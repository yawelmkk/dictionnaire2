import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { Moon, Sun, Heart, History, BookOpen, MoveVertical as MoreVertical } from 'lucide-react-native';
import { MenuDropdown } from './MenuDropdown';

interface HeaderProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  favoritesCount: number;
  onShowFavorites: () => void;
  onShowHistory: () => void;
  onShowAbout: () => void;
  onShowPrivacy: () => void;
}

export function Header({ 
  theme, 
  onThemeToggle, 
  favoritesCount, 
  onShowFavorites, 
  onShowHistory, 
  onShowAbout, 
  onShowPrivacy 
}: HeaderProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <StatusBar 
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'} 
        backgroundColor={theme === 'light' ? '#ffffff' : '#1f2937'} 
      />
      <View className={`${theme === 'light' ? 'bg-white' : 'bg-gray-900'} border-b ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'} px-4 py-4 pt-12`}>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-3">
            <View className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
              <BookOpen size={24} color="white" />
            </View>
            <View>
              <Text className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                Dictionnaire inzèbi
              </Text>
            </View>
          </View>

          <View className="flex-row items-center space-x-2">
            <TouchableOpacity
              onPress={onShowHistory}
              className={`p-2 rounded-lg ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'}`}
            >
              <History size={20} color={theme === 'light' ? '#6b7280' : '#d1d5db'} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onShowFavorites}
              className={`p-2 rounded-lg ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'} relative`}
            >
              <Heart size={20} color={theme === 'light' ? '#6b7280' : '#d1d5db'} />
              {favoritesCount > 0 && (
                <View className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <Text className="text-white text-xs font-bold">
                    {favoritesCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            <View className="relative">
              <TouchableOpacity
                onPress={() => setShowMenu(!showMenu)}
                className={`p-2 rounded-lg ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'}`}
              >
                <MoreVertical size={20} color={theme === 'light' ? '#6b7280' : '#d1d5db'} />
              </TouchableOpacity>
              
              <MenuDropdown 
                isOpen={showMenu} 
                onClose={() => setShowMenu(false)} 
                onShowAbout={onShowAbout}
                onShowPrivacy={onShowPrivacy}
                theme={theme}
              />
            </View>

            <TouchableOpacity
              onPress={onThemeToggle}
              className={`p-2 rounded-lg ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'}`}
            >
              {theme === 'light' ? (
                <Moon size={20} color="#6b7280" />
              ) : (
                <Sun size={20} color="#eab308" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}