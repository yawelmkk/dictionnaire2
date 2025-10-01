import React, { useEffect, useRef } from 'react';
import { Info, Shield, Mail } from 'lucide-react';
import { AboutModal } from './AboutModal';
import { PrivacyModal } from './PrivacyModal';

interface MenuDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MenuDropdown({ isOpen, onClose }: MenuDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showAbout, setShowAbout] = React.useState(false);
  const [showPrivacy, setShowPrivacy] = React.useState(false);

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
    setShowAbout(true);
    onClose();
  };

  const handlePrivacy = () => {
    setShowPrivacy(true);
    onClose();
  };

  const handleContact = () => {
    window.location.href = 'mailto:languenzebiofficiel@gmail.com?subject=Contact%20-%20Dictionnaire%20Nzébi&body=Bonjour,%0D%0A%0D%0AJe%20vous%20contacte%20concernant%20le%20dictionnaire%20Nzébi.%0D%0A%0D%0ACordialement,';
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
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

      <AboutModal
        isOpen={showAbout}
        onClose={() => setShowAbout(false)}
      />

      <PrivacyModal
        isOpen={showPrivacy}
        onClose={() => setShowPrivacy(false)}
      />
    </>
  );
}