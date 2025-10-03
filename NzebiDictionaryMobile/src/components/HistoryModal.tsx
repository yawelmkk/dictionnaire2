import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { X, History, Trash2, Search, Clock } from 'lucide-react-native';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: string[];
  onSearchFromHistory: (query: string) => void;
  onClearHistory: () => void;
  theme: 'light' | 'dark';
}

export function HistoryModal({ 
  isOpen, 
  onClose, 
  history, 
  onSearchFromHistory, 
  onClearHistory,
  theme 
}: HistoryModalProps) {
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
              <History size={24} color="#3b82f6" />
              <Text className={`text-xl font-bold ml-3 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Historique
              </Text>
            </View>
            
            <View className="flex-row items-center space-x-2">
              {history.length > 0 && (
                <TouchableOpacity
                  onPress={onClearHistory}
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
        {history.length === 0 ? (
          <View className="flex-1 items-center justify-center px-4">
            <Clock size={64} color={theme === 'light' ? '#d1d5db' : '#4b5563'} />
            <Text className={`text-lg font-medium mb-2 mt-4 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Aucune recherche récente
            </Text>
          </View>
        ) : (
          <ScrollView className="flex-1 px-6 py-4" showsVerticalScrollIndicator={false}>
            <View className="space-y-2">
              {history.slice().reverse().map((query, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    onSearchFromHistory(query);
                    onClose();
                  }}
                  className={`p-3 rounded-lg flex-row items-center ${
                    theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'
                  }`}
                >
                  <Search size={16} color={theme === 'light' ? '#9ca3af' : '#6b7280'} />
                  <Text className={`ml-3 flex-1 ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                  }`}>
                    {query}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    </Modal>
  );
}