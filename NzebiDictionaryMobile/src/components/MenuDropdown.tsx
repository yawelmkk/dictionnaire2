import React from 'react';
import { View, Text, TouchableOpacity, Modal, Linking } from 'react-native';
import { Info, Shield, Mail } from 'lucide-react-native';

interface MenuDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onShowAbout: () => void;
  onShowPrivacy: () => void;
  theme: 'light' | 'dark';
}

export function MenuDropdown({ 
  isOpen, 
  onClose, 
  onShowAbout, 
  onShowPrivacy,
  theme 
}: MenuDropdownProps) {
  const handleAbout = () => {
    onShowAbout();
    onClose();
  };

  const handlePrivacy = () => {
    onShowPrivacy();
    onClose();
  };

  const handleContact = () => {
    const email = 'languenzebiofficiel@gmail.com';
    const subject = 'Contact - Dictionnaire Nzébi';
    const body = 'Bonjour,\n\nJe vous contacte concernant le dictionnaire Nzébi.\n\nCordialement,';
    
    Linking.openURL(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    onClose();
  };

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        className="flex-1" 
        activeOpacity={1} 
        onPress={onClose}
      >
        <View className="flex-1 justify-start items-end pt-20 pr-4">
          <View className={`w-48 rounded-lg shadow-lg border py-2 ${
            theme === 'light' 
              ? 'bg-white border-gray-200' 
              : 'bg-gray-800 border-gray-700'
          }`}>
            <TouchableOpacity
              onPress={handleAbout}
              className={`px-4 py-3 flex-row items-center ${
                theme === 'light' ? 'active:bg-gray-100' : 'active:bg-gray-700'
              }`}
            >
              <Info size={16} color={theme === 'light' ? '#374151' : '#d1d5db'} />
              <Text className={`ml-3 ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                À propos de
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={handlePrivacy}
              className={`px-4 py-3 flex-row items-center ${
                theme === 'light' ? 'active:bg-gray-100' : 'active:bg-gray-700'
              }`}
            >
              <Shield size={16} color={theme === 'light' ? '#374151' : '#d1d5db'} />
              <Text className={`ml-3 ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                Confidentialité
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={handleContact}
              className={`px-4 py-3 flex-row items-center ${
                theme === 'light' ? 'active:bg-gray-100' : 'active:bg-gray-700'
              }`}
            >
              <Mail size={16} color={theme === 'light' ? '#374151' : '#d1d5db'} />
              <Text className={`ml-3 ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                Contactez-nous
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}