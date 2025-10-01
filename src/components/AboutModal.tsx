import React from 'react';
import { X, Info } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99]" onClick={onClose}></div>
        
        <div className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-xl max-h-[90vh] overflow-hidden z-[100]">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-[100]">
            <div className="flex items-center gap-3">
              <Info className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                À propos du Dictionnaire Inzèbi
              </h2>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
            <div className="prose dark:prose-invert max-w-none space-y-6">
              <div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Le dictionnaire Inzèbi-français est une application conçue pour préserver, valoriser et transmettre la langue et le patrimoine culturel de l'ethnie Inzèbi du Gabon et du Congo.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  Elle permet à tout utilisateur de découvrir des mots en langue inzèbi, leur traduction en français, et dans certains cas, leur prononciation audio, afin d'en faciliter l'apprentissage et la mémorisation.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  Ce projet s'inscrit dans une démarche de sauvegarde des langues gabonaises minoritaires, souvent menacées de disparition à cause de l'exode rural, de la domination du français, et du vieillissement des locuteurs natifs.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Origine des données linguistiques
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Les données de ce dictionnaire proviennent d'un travail existant, réalisé par: Luc de NADAILLAC, sous la forme d'un PDF librement accessible en ligne.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  Ce dictionnaire numérique ne prétend en aucun cas s'approprier ce travail. Au contraire, il vise à le valoriser, le diffuser et le rendre plus accessible, notamment aux jeunes générations.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  Nous reconnaissons et respectons la propriété intellectuelle de l'auteur initial, et l'application ne saurait exister sans sa contribution précieuse.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Qui sont les Inzèbi ?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Les Inzèbi (ou Ndzébi, parfois écrit Njebi) sont un peuple bantou du Gabon et du Congo-Brazzaville. Au Gabon, ils sont principalement présents dans le sud-est du pays.
                </p>
              </div>

              <div>
                <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-2">
                  Localisation
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Ils sont installés dans la province du Haut-Ogooué (notamment autour de Franceville, Moanda, Bongoville) et aussi dans le sud de la Ngounié (Mbigou, Mandji, Lébamba, inounoushyabola, makongonio, Mouila).
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  Le territoire inzèbi se situe entre forêts équatoriales, plateaux sablonneux et zones minières, en bordure du fleuve Ogooué et de ses affluents.
                </p>
              </div>

              <div>
                <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-2">
                  Population
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Leur population est estimée entre 50 000 et 70 000 personnes au Gabon, bien que beaucoup aient migré vers les villes comme Libreville ou Port-Gentil. Certains groupes Inzèbi sont également présents au Congo-Brazzaville.
                </p>
              </div>

              <div>
                <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-2">
                  Histoire, culture et langue
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Les Inzèbi descendent de peuples bantous migrants, venus des rives du fleuve Congo.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  Ils sont réputés pour leur culture spirituelle riche, leurs rituels d'initiation (Bwiti, Mwiri, etc.), leurs masques traditionnels et leur oralité poétique.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  Leur langue, l'inzèbi, fait partie du groupe B.50 des langues bantoues, avec une grammaire complexe fondée sur les classes nominales et un système de tons.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  Cependant, cette langue est aujourd'hui en danger, menacée par la prédominance du français dans l'enseignement, les médias et la vie sociale. C'est pourquoi cette application souhaite contribuer, à son échelle, à la préservation de ce patrimoine linguistique précieux.
                </p>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                <p className="text-amber-800 dark:text-amber-200 font-medium">
                  En utilisant cette application, vous participez activement à la transmission de la langue inzèbi.
                </p>
                <p className="text-amber-700 dark:text-amber-300 mt-2">
                  Merci de votre engagement et de votre curiosité.
                </p>
                <p className="text-amber-700 dark:text-amber-300 mt-4">
                  Merci d'utiliser cette application et de soutenir la mission de Langue Inzèbi Officiel.
                  En diffusant et en pratiquant la langue inzèbi, vous aidez à faire vivre un patrimoine culturel précieux.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}