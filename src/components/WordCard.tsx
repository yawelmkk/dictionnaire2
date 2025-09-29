import React from 'react';
import { Heart, Volume2, Tag, FileText, MessageSquare, BookOpen, Beaker } from 'lucide-react';
import type { DictionaryEntry } from '../types';

interface WordCardProps {
  entry: DictionaryEntry;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export function WordCard({ entry, isFavorite, onToggleFavorite }: WordCardProps) {
  const handlePlayPronunciation = () => {
    // If pronunciation URL is available, play it
    if (entry.pronunciation_url && entry.pronunciation_url.trim()) {
      const audio = new Audio(entry.pronunciation_url);
      audio.play().catch(console.error);
    } else {
      // Fallback to speech synthesis
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(entry.nzebi_word);
        utterance.lang = 'fr'; // Closest approximation
        utterance.rate = 0.7;
        speechSynthesis.speak(utterance);
      }
    }
  };

  const getNatureBadgeColor = (nature: string) => {
    switch (nature.toLowerCase()) {
      case 'nom':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'verbe':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'adjectif':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      case 'adverbe':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 
                   shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-200">
                {entry.nzebi_word}
              </h3>
              <button
                onClick={handlePlayPronunciation}
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                title="Écouter la prononciation"
              >
                <Volume2 className="w-4 h-4 text-gray-500 hover:text-amber-600 dark:hover:text-amber-400" />
              </button>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
              {entry.french_word}
            </p>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getNatureBadgeColor(entry.part_of_speech)}`}>
                <Tag className="w-3 h-3 mr-1" />
                {entry.part_of_speech}
              </span>
            </div>
          </div>
          <button
            onClick={() => onToggleFavorite(entry.id)}
            className={`p-2 rounded-full transition-all duration-200 ${
              isFavorite
                ? 'text-red-500 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30'
                : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
            }`}
            title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Examples */}
        {(entry.example_nzebi || entry.example_french) && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Exemple</span>
            </div>
            <div className="pl-6 space-y-1">
              {entry.example_nzebi && (
                <p className="text-gray-700 dark:text-gray-300 italic">
                  {entry.example_nzebi}
                </p>
              )}
              {entry.example_french && (
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {entry.example_french}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Additional Information */}
        <div className="space-y-3">
          {/* Plural Form */}
          {entry.plural_form && (
            <div className="flex items-start gap-2">
              <BookOpen className="w-4 h-4 text-gray-500 mt-0.5" />
              <div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Forme plurielle : </span>
                <span className="text-gray-700 dark:text-gray-300">{entry.plural_form}</span>
              </div>
            </div>
          )}

          {/* Imperative */}
          {entry.imperative && (
            <div className="flex items-start gap-2">
              <Tag className="w-4 h-4 text-gray-500 mt-0.5" />
              <div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Impératif : </span>
                <span className="text-gray-700 dark:text-gray-300">{entry.imperative}</span>
              </div>
            </div>
          )}

          {/* Synonyms */}
          {entry.synonyms && (
            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 text-gray-500 mt-0.5" />
              <div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Synonymes : </span>
                <span className="text-gray-700 dark:text-gray-300">{entry.synonyms}</span>
              </div>
            </div>
          )}

          {/* Scientific Name */}
          {entry.scientific_name && (
            <div className="flex items-start gap-2">
              <Beaker className="w-4 h-4 text-gray-500 mt-0.5" />
              <div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Nom scientifique : </span>
                <span className="text-gray-700 dark:text-gray-300 italic">{entry.scientific_name}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}