import React from 'react';
import { X, Heart, Trash2 } from 'lucide-react';
import { WordCard } from './WordCard';
import type { DictionaryEntry } from '../types';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: DictionaryEntry[];
  onToggleFavorite: (id: string) => void;
  onClearAll: () => void;
}

export function FavoritesModal({ isOpen, onClose, favorites, onToggleFavorite, onClearAll }: FavoritesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
        
        <div className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-xl">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-red-500 fill-current" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Mes Favoris
              </h2>
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full">
                {favorites.length}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {favorites.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                  title="Vider tous les favoris"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6 max-h-96 overflow-y-auto">
            {favorites.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Aucun favori encore
                </h3>
                <p className="text-gray-500 dark:text-gray-500">
                  Cliquez sur le cœur des mots que vous souhaitez sauvegarder.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {favorites.map((entry) => (
                  <WordCard
                    key={entry.id}
                    entry={entry}
                    isFavorite={true}
                    onToggleFavorite={onToggleFavorite}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}