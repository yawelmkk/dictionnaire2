import React, { useState, useEffect } from 'react';
import { ChevronLeft, Lock, Trophy, Zap } from 'lucide-react';
import type { DictionaryEntry, GameLevel } from '../types';
import { MatchingGame } from './MatchingGame';
import { useGameLevels } from '../hooks/useGameLevels';

interface ActivitiesSectionProps {
  entries: DictionaryEntry[];
  onClose: () => void;
}

type GameType = 'matching' | null;

export function ActivitiesSection({ entries, onClose }: ActivitiesSectionProps) {
  const [selectedGame, setSelectedGame] = useState<GameType>(null);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [bestLevelCompleted, setBestLevelCompleted] = useState(0);
  const levels = useGameLevels(entries);

  const handleLevelSelect = (level: number) => {
    if (level <= bestLevelCompleted + 1) {
      setSelectedLevel(level);
    }
  };

  const handleGameComplete = (wordsCorrect: number) => {
    setBestLevelCompleted((prev) => Math.max(prev, selectedLevel || 0));
    if (selectedLevel && selectedLevel < 30) {
      setSelectedLevel(selectedLevel + 1);
    } else {
      setSelectedLevel(null);
    }
  };

  if (selectedGame === 'matching' && selectedLevel) {
    const levelData = levels[selectedLevel - 1];
    return (
      <MatchingGame
        level={selectedLevel}
        words={levelData.words}
        onComplete={handleGameComplete}
        onBack={() => setSelectedLevel(null)}
      />
    );
  }

  if (selectedGame === 'matching') {
    return (
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setSelectedGame(null)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Retour
          </button>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Appairage de mots</h2>
          <div className="w-24" />
        </div>

        {/* Level Selection Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {levels.map((level) => {
            const isUnlocked = level.level <= bestLevelCompleted + 1;
            const isCompleted = level.level <= bestLevelCompleted;

            return (
              <button
                key={level.level}
                onClick={() => handleLevelSelect(level.level)}
                disabled={!isUnlocked}
                className={`aspect-square rounded-lg font-bold text-lg flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                  isCompleted
                    ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-lg'
                    : isUnlocked
                      ? 'bg-gradient-to-br from-orange-400 to-amber-500 text-white hover:shadow-lg active:scale-95'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                <span>{level.level}</span>
                {isCompleted && <Trophy className="w-4 h-4" />}
                {!isUnlocked && <Lock className="w-4 h-4" />}
                <span className="text-xs font-normal opacity-75">{level.wordCount} mots</span>
              </button>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-900 dark:text-blue-300 mb-3">Comment jouer?</h3>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li className="flex items-start gap-2">
              <span className="font-bold">1.</span>
              <span>Cliquez sur une carte pour la retourner</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">2.</span>
              <span>Trouvez les paires correspondantes (mot nzébi avec sa traduction français)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">3.</span>
              <span>Complétez le niveau en trouvant toutes les paires</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">4.</span>
              <span>Chaque niveau suivant a plus de mots à appairier</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Retour
        </button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Activités</h1>
        <div className="w-24" />
      </div>

      {/* Games Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Matching Game Card */}
        <button
          onClick={() => setSelectedGame('matching')}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all duration-200 text-left active:scale-95"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-gradient-to-br from-orange-400 to-amber-500 p-3 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Appairage de mots</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Matching game</p>
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
            Trouvez les paires correspondantes en appairant chaque mot nzébi avec sa traduction
            français. 30 niveaux progressifs vous attendent!
          </p>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span>30 niveaux</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Zap className="w-4 h-4 text-orange-500" />
              <span>Difficulté progressive</span>
            </div>
          </div>

          <div className="mt-4 inline-block bg-gradient-to-r from-orange-400 to-amber-500 text-white px-4 py-2 rounded-lg font-medium text-sm">
            Jouer →
          </div>
        </button>

        {/* Coming Soon Card */}
        <div className="bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-6 opacity-50">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-gray-300 dark:bg-gray-600 p-3 rounded-lg">
              <Lock className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300">
                Quiz Interactif
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Bientôt disponible</p>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            Testez vos connaissances avec des questions à choix multiples sur le vocabulaire nzébi.
          </p>

          <div className="mt-4 inline-block bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 px-4 py-2 rounded-lg font-medium text-sm">
            Bientôt →
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Vos statistiques</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {bestLevelCompleted}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Niveau complété</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {bestLevelCompleted < 30 ? bestLevelCompleted + 1 : 30}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Niveau actuel</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {bestLevelCompleted}/{30}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Progression</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {Math.round((bestLevelCompleted / 30) * 100)}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Complété</div>
          </div>
        </div>
      </div>
    </div>
  );
}
