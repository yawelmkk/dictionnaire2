import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'all', label: 'Tous les mots' },
  { id: 'verbe', label: 'Verbe' },
  { id: 'nom commun', label: 'Nom Commun' },
  { id: 'nom propre', label: 'Nom Propre' },
  { id: 'adverbe', label: 'Adverbe' },
  { id: 'adverbe demonstratif', label: 'Adverbe Démonstratif' },
  { id: 'adverbe interrogatif', label: 'Adverbe Interrogatif' },
  { id: 'adjectif', label: 'Adjectif' },
  { id: 'adjectif possessif', label: 'Adjectif Possessif' },
  { id: 'adjectif demonstratif', label: 'Adjectif Démonstratif' },
  { id: 'adjectif qualificatif', label: 'Adjectif Qualificatif' },
  { id: 'pronom', label: 'Pronom' },
  { id: 'pronom personnel', label: 'Pronom Personnel' },
  { id: 'pronom possessif', label: 'Pronom Possessif' },
  { id: 'pronom demonstratif', label: 'Pronom Démonstratif' },
  { id: 'pronom relatif', label: 'Pronom Relatif' },
  { id: 'preposition', label: 'Préposition' },
  { id: 'article', label: 'Article' },
  { id: 'conjonction', label: 'Conjonction' },
  { id: 'interjection', label: 'Interjection' },
];

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = React.useState(false);
  const [showRightArrow, setShowRightArrow] = React.useState(true);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 300;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  React.useEffect(() => {
    handleScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
    }
  }, []);

  return (
    <div className="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="relative">
        {/* Left Gradient & Arrow */}
        {showLeftArrow && (
          <>
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white dark:from-gray-800 to-transparent z-10 pointer-events-none" />
            <button
              onClick={() => scroll('left')}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-1 rounded-full bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 shadow-md transition-all duration-200"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
          </>
        )}

        {/* Right Gradient & Arrow */}
        {showRightArrow && (
          <>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-gray-800 to-transparent z-10 pointer-events-none" />
            <button
              onClick={() => scroll('right')}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-1 rounded-full bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 shadow-md transition-all duration-200"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
          </>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide py-4 scroll-smooth px-4 w-full"
          style={{ scrollBehavior: 'smooth' }}
        >
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
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
    </div>
  );
}
