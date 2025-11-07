import React from 'react';
import { X, Link as LinkIcon, Facebook, Youtube, Music } from 'lucide-react';

interface UsefulLinksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UsefulLinksModal({ isOpen, onClose }: UsefulLinksModalProps) {
  if (!isOpen) return null;

  const links = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/languenzebiofficiel',
      icon: Facebook,
      color: 'hover:text-blue-600',
      bgColor: 'hover:bg-blue-50 dark:hover:bg-blue-900/20'
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@langue-nzebi-officiel',
      icon: Youtube,
      color: 'hover:text-red-600',
      bgColor: 'hover:bg-red-50 dark:hover:bg-red-900/20'
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@langue.nzbi.offic',
      icon: Music,
      color: 'hover:text-gray-900 dark:hover:text-gray-100',
      bgColor: 'hover:bg-gray-100 dark:hover:bg-gray-700'
    }
  ];

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

        <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <LinkIcon className="w-6 h-6 text-amber-500" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Liens Utiles</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          <div className="p-6 space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Retrouvez-nous sur les réseaux sociaux pour les dernières actualités
            </p>

            {links.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.url)}
                  className={`w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-200 flex items-center gap-3 text-left ${link.bgColor}`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${link.color}`} />
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {link.name}
                  </span>
                  <span className="ml-auto">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
