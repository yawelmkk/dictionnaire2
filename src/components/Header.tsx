import React from 'react';
import { Moon, Sun, Heart, History, BookOpen, MoreVertical } from 'lucide-react';
import { MenuDropdown } from './MenuDropdown';

interface HeaderProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  favoritesCount: number;
  onShowFavorites: () => void;
  onShowHistory: () => void;
}

export function Header({ theme, onThemeToggle, favoritesCount, onShowFavorites, onShowHistory }: HeaderProps) {
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Dictionnaire inzèbi
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onShowHistory}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              title="Historique de recherche"
            >
              <History className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>

            <button
              onClick={onShowFavorites}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 relative"
              title="Mes favoris"
            >
              <Heart className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                title="Menu"
              >
                <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              
              <MenuDropdown 
                isOpen={showMenu} 
                onClose={() => setShowMenu(false)} 
              />
            </div>

            <button
              onClick={onThemeToggle}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              title={theme === 'light' ? 'Mode sombre' : 'Mode clair'}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-600" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-500" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}