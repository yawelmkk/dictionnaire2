import React, { useState, useEffect, useMemo } from 'react';
import { RotateCcw, ChevronLeft, Volume2 } from 'lucide-react';
import type { DictionaryEntry } from '../types';

interface MatchingGameProps {
  level: number;
  words: DictionaryEntry[];
  onComplete: (wordsCorrect: number) => void;
  onBack: () => void;
}

interface Card {
  id: string;
  type: 'nzebi' | 'french';
  content: string;
  pairId: string;
}

export function MatchingGame({ level, words, onComplete, onBack }: MatchingGameProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  // Initialize and shuffle cards
  useEffect(() => {
    const newCards: Card[] = [];

    words.forEach((word) => {
      const pairId = word.id;
      newCards.push({
        id: `nzebi-${word.id}`,
        type: 'nzebi',
        content: word.nzebi_word,
        pairId
      });
      newCards.push({
        id: `french-${word.id}`,
        type: 'french',
        content: word.french_word,
        pairId
      });
    });

    // Shuffle cards
    const shuffled = newCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setMatched(new Set());
    setSelected(null);
    setAttempts(0);
    setGameWon(false);
  }, [words, level]);

  // Check if all cards are matched
  useEffect(() => {
    if (matched.size > 0 && matched.size === cards.length) {
      setGameWon(true);
    }
  }, [matched, cards.length]);

  const handleCardClick = (cardId: string) => {
    if (matched.has(cardId) || gameWon) return;

    if (!selected) {
      setSelected(cardId);
      return;
    }

    if (selected === cardId) {
      setSelected(null);
      return;
    }

    const selectedCard = cards.find((c) => c.id === selected);
    const clickedCard = cards.find((c) => c.id === cardId);

    if (!selectedCard || !clickedCard) return;

    setAttempts((prev) => prev + 1);

    if (selectedCard.pairId === clickedCard.pairId) {
      setMatched((prev) => new Set([...prev, selected, cardId]));
      setSelected(null);
    } else {
      setTimeout(() => {
        setSelected(null);
      }, 500);
    }
  };

  const handleReset = () => {
    const newCards = [...cards].sort(() => Math.random() - 0.5);
    setCards(newCards);
    setMatched(new Set());
    setSelected(null);
    setAttempts(0);
    setGameWon(false);
  };

  if (cards.length === 0) {
    return <div className="text-center py-8">Chargement du jeu...</div>;
  }

  const correctPairs = Math.floor(matched.size / 2);
  const totalPairs = words.length;
  const accuracy =
    attempts > 0 ? Math.round((correctPairs / (correctPairs + (attempts - correctPairs))) * 100) : 0;

  return (
    <div className="w-full max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Retour
        </button>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Niveau {level}</h2>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          Réinitialiser
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400">Paires Trouvées</div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {correctPairs}/{totalPairs}
          </div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400">Tentatives</div>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{attempts}</div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400">Précision</div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{accuracy}%</div>
        </div>
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-2 gap-3 mb-6 sm:grid-cols-3 md:grid-cols-4">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square p-3 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center text-center ${
              matched.has(card.id)
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 scale-95 opacity-75'
                : selected === card.id
                  ? 'bg-orange-400 dark:bg-orange-500 text-white scale-105 shadow-lg'
                  : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:shadow-md active:scale-95'
            } ${matched.has(card.id) ? 'cursor-default' : 'cursor-pointer'}`}
            disabled={matched.has(card.id)}
          >
            <span className="text-xs md:text-sm break-words">{card.content}</span>
          </button>
        ))}
      </div>

      {/* Completion Message */}
      {gameWon && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700 rounded-lg p-6 text-center mb-6">
          <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">Félicitations!</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Vous avez complété le niveau {level} en {attempts} tentatives!
          </p>
          <button
            onClick={() => onComplete(correctPairs)}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-2 px-6 rounded-lg transition-all"
          >
            Continuer au niveau suivant
          </button>
        </div>
      )}
    </div>
  );
}
