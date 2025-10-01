import React from 'react';
import { X, Shield } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto" style={{ zIndex: 9999 }}>
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
        
        <div className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-xl max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-green-500" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Politique de Confidentialité
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
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  1. Introduction
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  L'application Dictionnaire Inzèbi (« nous », « notre », « nos ») est une application mobile conçue pour fournir une ressource linguistique sur la langue inzèbi. Votre vie privée est de la plus haute importance.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  La présente politique de confidentialité vise à vous informer de la manière dont nous traitons vos données.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  2. Absence de Collecte de Données Personnelles
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Le Dictionnaire Inzèbi est conçu pour fonctionner sans collecter, stocker, transmettre ou traiter aucune donnée personnelle de ses utilisateurs.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  Nous ne demandons ni n'enregistrons votre nom, votre adresse e-mail, votre localisation, vos identifiants d'appareil ou toute autre information permettant de vous identifier.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  L'application ne nécessite pas de connexion à un compte utilisateur.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  Toutes les recherches de mots et les fonctionnalités (comme les favoris ou l'historique) sont stockées localement sur votre propre appareil et ne sont jamais transmises à nos serveurs ou à des tiers.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  3. Données Non-Personnelles
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Nous n'utilisons aucun outil d'analyse tiers ni aucun service de suivi qui pourrait collecter des informations sur la manière dont vous utilisez l'application.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  Si, à l'avenir, nous décidions d'intégrer des outils d'analyse pour améliorer l'application (par exemple, pour savoir quelles fonctionnalités sont les plus utilisées), nous veillerons à ce que ces données soient :
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 space-y-1">
                  <li>Anonymes et agrégées (ne permettant pas d'identifier un utilisateur individuel).</li>
                  <li>Et nous mettrons à jour cette politique en conséquence.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  4. Services Tiers
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  L'application est autonome et ne partage pas vos données avec des services tiers, des annonceurs ou des partenaires.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  Si l'application est disponible via une boutique (comme l'App Store d'Apple ou le Google Play Store), leurs politiques de confidentialité respectives régissent les données qu'ils pourraient collecter au moment du téléchargement.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  5. Sécurité
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Puisque nous ne collectons aucune donnée personnelle, le risque de fuite de données personnelles est nul. La sécurité de vos données est assurée par le fait même qu'elles ne quittent jamais votre appareil.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  6. Contact
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Si vous avez des questions concernant cette politique de confidentialité, vous pouvez nous contacter à l'adresse suivante :
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mt-4">
                  <p className="text-blue-800 dark:text-blue-200 font-mono">
                    languenzebiofficiel@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}