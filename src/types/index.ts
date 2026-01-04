export interface DictionaryEntry {
  id: string;
  nzebi_word: string;
  french_word: string;
  part_of_speech: string;
  example_nzebi: string;
  example_french: string;
  pronunciation_url: string;
  plural_form: string;
  synonyms: string;
  scientific_name: string;
  imperative: string;
}

export interface SearchFilters {
  category: string;
  sortBy: 'alphabetical' | 'relevance';
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  favorites: string[];
  recentSearches: string[];
}

export interface GameLevel {
  level: number;
  wordCount: number;
  words: DictionaryEntry[];
}

export interface GameProgress {
  id: string;
  user_id: string;
  game_type: string;
  current_level: number;
  best_level_completed: number;
  total_score: number;
  updated_at: string;
}

export interface LevelAttempt {
  id: string;
  user_id: string;
  game_type: string;
  level: number;
  score: number;
  completed: boolean;
  words_correct: number;
  words_total: number;
  created_at: string;
}