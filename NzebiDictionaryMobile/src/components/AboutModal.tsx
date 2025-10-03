import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { X, Info } from 'lucide-react-native';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
}

export function AboutModal({ isOpen, onClose, theme }: AboutModalProps) {
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
              <Info size={24} color="#3b82f6" />
              <Text className={`text-xl font-bold ml-3 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                À propos du Dictionnaire Inzèbi
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
              <Text className={`leading-relaxed ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                Le dictionnaire Inzèbi-français est une application conçue pour préserver, valoriser et transmettre la langue et le patrimoine culturel de l'ethnie Inzèbi du Gabon et du Congo.
              </Text>
              <Text className={`leading-relaxed mt-4 ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                Elle permet à tout utilisateur de découvrir des mots en langue inzèbi, leur traduction en français, et dans certains cas, leur prononciation audio, afin d'en faciliter l'apprentissage et la mémorisation.
              </Text>
              <Text className={`leading-relaxed mt-4 ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                Ce projet s'inscrit dans une démarche de sauvegarde des langues gabonaises minoritaires, souvent menacées de disparition à cause de l'exode rural, de la domination du français, et du vieillissement des locuteurs natifs.
              </Text>
            </View>

            <View>
              <Text className={`text-lg font-semibold mb-3 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Origine des données linguistiques
              </Text>
              <Text className={`leading-relaxed ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                Les données de ce dictionnaire proviennent d'un travail existant, réalisé par: Luc de NADAILLAC, sous la forme d'un PDF librement accessible en ligne.
              </Text>
              <Text className={`leading-relaxed mt-4 ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                Ce dictionnaire numérique ne prétend en aucun cas s'approprier ce travail. Au contraire, il vise à le valoriser, le diffuser et le rendre plus accessible, notamment aux jeunes générations.
              </Text>
              <Text className={`leading-relaxed mt-4 ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                Nous reconnaissons et respectons la propriété intellectuelle de l'auteur initial, et l'application ne saurait exister sans sa contribution précieuse.
              </Text>
            </View>

            <View>
              <Text className={`text-lg font-semibold mb-3 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Qui sont les Inzèbi ?
              </Text>
              <Text className={`leading-relaxed ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                Les Inzèbi (ou Ndzébi, parfois écrit Njebi) sont un peuple bantou du Gabon et du Congo-Brazzaville. Au Gabon, ils sont principalement présents dans le sud-est du pays.
              </Text>
            </View>

            <View>
              <Text className={`text-base font-semibold mb-2 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Localisation
              </Text>
              <Text className={`leading-relaxed ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                Ils sont installés dans la province du Haut-Ogooué (notamment autour de Franceville, Moanda, Bongoville) et aussi dans le sud de la Ngounié (Mbigou, Mandji, Lébamba, inounoushyabola, makongonio, Mouila).
              </Text>
              <Text className={`leading-relaxed mt-4 ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                Le territoire inzèbi se situe entre forêts équatoriales, plateaux sablonneux et zones minières, en bordure du fleuve Ogooué et de ses affluents.
              </Text>
            </View>

            <View>
              <Text className={`text-base font-semibold mb-2 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Population
              </Text>
              <Text className={`leading-relaxed ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                Leur population est estimée entre 50 000 et 70 000 personnes au Gabon, bien que beaucoup aient migré vers les villes comme Libreville ou Port-Gentil. Certains groupes Inzèbi sont également présents au Congo-Brazzaville.
              </Text>
            </View>

            <View>
              <Text className={`text-base font-semibold mb-2 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Histoire, culture et langue
              </Text>
              <Text className={`leading-relaxed ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                Les Inzèbi descendent de peuples bantous migrants, venus des rives du fleuve Congo.
              </Text>
              <Text className={`leading-relaxed mt-4 ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                Ils sont réputés pour leur culture spirituelle riche, leurs rituels d'initiation (Bwiti, Mwiri, etc.), leurs masques traditionnels et leur oralité poétique.
              </Text>
              <Text className={`leading-relaxed mt-4 ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                Leur langue, l'inzèbi, fait partie du groupe B.50 des langues bantoues, avec une grammaire complexe fondée sur les classes nominales et un système de tons.
              </Text>
              <Text className={`leading-relaxed mt-4 ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                Cependant, cette langue est aujourd'hui en danger, menacée par la prédominance du français dans l'enseignement, les médias et la vie sociale. C'est pourquoi cette application souhaite contribuer, à son échelle, à la préservation de ce patrimoine linguistique précieux.
              </Text>
            </View>

            <View className={`p-4 rounded-lg border ${
              theme === 'light' 
                ? 'bg-amber-50 border-amber-200' 
                : 'bg-amber-900/20 border-amber-800'
            }`}>
              <Text className={`font-medium ${
                theme === 'light' ? 'text-amber-800' : 'text-amber-200'
              }`}>
                En utilisant cette application, vous participez activement à la transmission de la langue inzèbi.
              </Text>
              <Text className={`mt-2 ${
                theme === 'light' ? 'text-amber-700' : 'text-amber-300'
              }`}>
                Merci de votre engagement et de votre curiosité.
              </Text>
              <Text className={`mt-4 ${
                theme === 'light' ? 'text-amber-700' : 'text-amber-300'
              }`}>
                Merci d'utiliser cette application et de soutenir la mission de Langue Inzèbi Officiel.
                En diffusant et en pratiquant la langue inzèbi, vous aidez à faire vivre un patrimoine culturel précieux.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}