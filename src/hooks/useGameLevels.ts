import { useMemo } from 'react';
import type { DictionaryEntry, GameLevel } from '../types';

export function useGameLevels(allWords: DictionaryEntry[]) {
  const levels = useMemo(() => {
    const generateLevels = (): GameLevel[] => {
      const gameLevels: GameLevel[] = [];

      // Progressive word count for each level (1-30)
      // Level 1: 3 words, Level 2: 4 words, Level 3: 5 words, etc.
      // Maximum: 32 words at level 30
      for (let i = 1; i <= 30; i++) {
        const wordCount = Math.min(2 + i, 32);

        // Shuffle and select words for this level
        const shuffled = [...allWords].sort(() => Math.random() - 0.5);
        const wordsForLevel = shuffled.slice(0, wordCount);

        gameLevels.push({
          level: i,
          wordCount,
          words: wordsForLevel
        });
      }

      return gameLevels;
    };

    return generateLevels();
  }, [allWords]);

  return levels;
}
