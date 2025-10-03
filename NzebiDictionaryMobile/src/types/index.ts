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