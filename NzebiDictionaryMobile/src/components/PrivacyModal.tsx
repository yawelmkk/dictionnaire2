import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { X, Shield } from 'lucide-react-native';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
}

export function PrivacyModal({ isOpen, onClose, theme }: PrivacyModalProps) {
  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View className={`flex-1 ${
        theme === 'light' ? 'bg-white' : 'bg-gray-900'
      }`}>
        {/* Header */}
        <View className={`border-b px-6 py-4 pt-12 ${
          theme === 'light' 
            ? 'bg-white border-gray-200' 
            : 'bg-gray-800 border-gray-700'
        }`}>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Shield size={24} color="#10b981" />
              <Text className={`text-xl font-bold ml-3 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Politique de Confidentialité
              </Text>
            </View>
            
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

        {/* Content */}
        <ScrollView className="flex-1 px-6 py-6" showsVerticalScrollIndicator={false}>
          <View className="space-y-6">
            <View>
              <Text className={`text-lg font-semibold mb-3 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                1. Introduction
              </Text>
              <Text className={`leading-relaxed ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                L'application Dictionnaire Inzèbi (« nous », « notre », « nos ») est une application mobile conçue pour fournir une ressource linguistique sur la langue inzèbi. Votre vie privée est de la plus haute importance.
              </Text>
              <Text className={`leading-relaxed mt-4 ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                La présente politique de confidentialité vise à vous informer de la manière dont nous traitons vos données.
              </Text>
            </View>

            <View>
              <Text className={`text-lg font-semibold mb-3 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                2. Absence de Collecte de Données Personnelles
              </Text>
              <Text className={`leading-relaxed ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                Le Dictionnaire Inzèbi est conçu pour fonctionner sans collecter, stocker, transmettre ou traiter aucune donnée personnelle de ses utilisateurs.
              </Text>
              <Text className={`leading-relaxed mt-4 ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                Nous ne demandons ni n'enregistrons votre nom, votre adresse e-mail, votre localisation, vos identifiants d'appareil ou toute autre information permettant de vous identifier.
              </Text>
              <Text className={`leading-relaxed mt-4 ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                L'application ne nécessite pas de connexion à un compte utilisateur.
              </Text>
              <Text className={`leading-relaxed mt-4 ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                Toutes les recherches de mots et les fonctionnalités (comme les favoris ou l'historique) sont stockées localement sur votre propre appareil et ne sont jamais transmises à nos serveurs ou à des tiers.
              </Text>
            </View>

            <View>
              <Text className={`text-lg font-semibold mb-3 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                3. Données Non-Personnelles
              </Text>
              <Text className={`leading-relaxed ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                Nous n'utilisons aucun outil d'analyse tiers ni aucun service de suivi qui pourrait collecter des informations sur la manière dont vous utilisez l'application.
              </Text>
              <Text className={`leading-relaxed mt-4 ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                Si, à l'avenir, nous décidions d'intégrer des outils d'analyse pour améliorer l'application (par exemple, pour savoir quelles fonctionnalités sont les plus utilisées), nous veillerons à ce que ces données soient :
              </Text>
              <Text className={`leading-relaxed mt-2 ml-4 ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                • Anonymes et agrégées (ne permettant pas d'identifier un utilisateur individuel).{'\n'}
                • Et nous mettrons à jour cette politique en conséquence.
              </Text>
            </View>

            <View>
              <Text className={`text-lg font-semibold mb-3 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                4. Services Tiers
              </Text>
              <Text className={`leading-relaxed ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                L'application est autonome et ne partage pas vos données avec des services tiers, des annonceurs ou des partenaires.
              </Text>
              <Text className={`leading-relaxed mt-4 ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                Si l'application est disponible via une boutique (comme l'App Store d'Apple ou le Google Play Store), leurs politiques de confidentialité respectives régissent les données qu'ils pourraient collecter au moment du téléchargement.
              </Text>
            </View>

            <View>
              <Text className={`text-lg font-semibold mb-3 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                5. Sécurité
              </Text>
              <Text className={`leading-relaxed ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                Puisque nous ne collectons aucune donnée personnelle, le risque de fuite de données personnelles est nul. La sécurité de vos données est assurée par le fait même qu'elles ne quittent jamais votre appareil.
              </Text>
            </View>

            <View>
              <Text className={`text-lg font-semibold mb-3 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                6. Contact
              </Text>
              <Text className={`leading-relaxed ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                Si vous avez des questions concernant cette politique de confidentialité, vous pouvez nous contacter à l'adresse suivante :
              </Text>
              <View className={`p-4 rounded-lg border mt-4 ${
                theme === 'light' 
                  ? 'bg-blue-50 border-blue-200' 
                  : 'bg-blue-900/20 border-blue-800'
              }`}>
                <Text className={`font-mono ${
                  theme === 'light' ? 'text-blue-800' : 'text-blue-200'
                }`}>
                  languenzebiofficiel@gmail.com
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}