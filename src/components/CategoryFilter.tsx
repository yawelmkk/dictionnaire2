import React from 'react';
import { X } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'all', label: 'Tous les mots', group: 'default' },
  { id: 'verbe', label: 'Verbe', group: 'root' },
  { id: 'nom commun', label: 'Nom Commun', group: 'root' },
  { id: 'nom propre', label: 'Nom Propre', group: 'root' },
  { id: 'adverbe', label: 'Adverbe', group: 'adverbe' },
  { id: 'adverbe demonstratif', label: 'Adverbe Démonstratif', group: 'adverbe' },
  { id: 'adverbe interrogatif', label: 'Adverbe Interrogatif', group: 'adverbe' },
  { id: 'adjectif', label: 'Adjectif', group: 'adjectif' },
  { id: 'adjectif possessif', label: 'Adjectif Possessif', group: 'adjectif' },
  { id: 'adjectif demonstratif', label: 'Adjectif Démonstratif', group: 'adjectif' },
  { id: 'adjectif qualificatif', label: 'Adjectif Qualificatif', group: 'adjectif' },
  { id: 'pronom', label: 'Pronom', group: 'pronom' },
  { id: 'pronom personnel', label: 'Pronom Personnel', group: 'pronom' },
  { id: 'pronom possessif', label: 'Pronom Possessif', group: 'pronom' },
  { id: 'pronom demonstratif', label: 'Pronom Démonstratif', group: 'pronom' },
  { id: 'pronom relatif', label: 'Pronom Relatif', group: 'pronom' },
  { id: 'preposition', label: 'Préposition', group: 'root' },
  { id: 'article', label: 'Article', group: 'root' },
  { id: 'conjonction', label: 'Conjonction', group: 'root' },
  { id: 'interjection', label: 'Interjection', group: 'root' },
];

const groupLabels: Record<string, string> = {
  default: '',
  root: 'Catégories principales',
  adverbe: 'Adverbes',
  adjectif: 'Adjectifs',
  pronom: 'Pronoms',
};

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const groups = ['default', 'root', 'adverbe', 'adjectif', 'pronom'];

  return (
    <div className="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="space-y-3">
          {groups.map(group => {
            const groupCategories = categories.filter(cat => cat.group === group);
            if (groupCategories.length === 0) return null;

            return (
              <div key={group}>
                {groupLabels[group] && (
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2 pl-1">
                    {groupLabels[group]}
                  </label>
                )}
                <div className="flex flex-wrap gap-2">
                  {groupCategories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => onCategoryChange(category.id)}
                      className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                        selectedCategory === category.id
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md hover:shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {category.label}
                      {selectedCategory === category.id && category.id !== 'all' && (
                        <X className="inline-block w-3 h-3 ml-2" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
