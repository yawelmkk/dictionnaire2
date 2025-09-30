import React, { useEffect, useRef } from 'react';
import { Info, Shield, Mail } from 'lucide-react';

interface MenuDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MenuDropdown({ isOpen, onClose }: MenuDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleAbout = () => {
    alert('À propos du Dictionnaire Nzébi\n\nCette application vise à préserver et promouvoir le patrimoine linguistique de la langue Nzébi. Elle permet aux locuteurs natifs, apprenants et chercheurs d\'explorer et d\'apprendre cette riche langue africaine.\n\nVersion 1.0');
    onClose();
  };

  const handlePrivacy = () => {
    alert('Politique de Confidentialité\n\nVos données personnelles sont stockées localement sur votre appareil. Nous ne collectons aucune information personnelle. Vos favoris et historique de recherche restent privés et ne sont pas partagés.');
    onClose();
  };

  const handleContact = () => {
    alert('Contactez-nous\n\nPour toute question, suggestion ou contribution au dictionnaire :\n\nEmail : contact@dictionnaire-nzebi.org\n\nNous serions ravis de recevoir vos commentaires pour améliorer cette ressource linguistique.');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
    >
      <button
        onClick={handleAbout}
        className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center gap-3"
      >
        <Info className="w-4 h-4" />
        À propos de
      </button>
      
      <button
        onClick={handlePrivacy}
        className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center gap-3"
      >
        <Shield className="w-4 h-4" />
        Confidentialité
      </button>
      
      <button
        onClick={handleContact}
        className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center gap-3"
      >
        <Mail className="w-4 h-4" />
        Contactez-nous
      </button>
    </div>
  );
}