/*
  # Create game progress tracking tables

  1. New Tables
    - `game_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `game_type` (text) - type of game (e.g., 'matching')
      - `current_level` (integer) - current level (1-30)
      - `best_level_completed` (integer) - highest level completed
      - `total_score` (integer) - total score accumulated
      - `updated_at` (timestamp)
      
    - `level_attempts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `game_type` (text)
      - `level` (integer)
      - `score` (integer)
      - `completed` (boolean)
      - `words_correct` (integer)
      - `words_total` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Users can only access their own data
    - Anonymous users can insert/update their own records
*/

CREATE TABLE IF NOT EXISTS game_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  game_type text NOT NULL,
  current_level integer DEFAULT 1 CHECK (current_level >= 1 AND current_level <= 30),
  best_level_completed integer DEFAULT 0 CHECK (best_level_completed >= 0 AND best_level_completed <= 30),
  total_score integer DEFAULT 0,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, game_type)
);

CREATE TABLE IF NOT EXISTS level_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  game_type text NOT NULL,
  level integer NOT NULL CHECK (level >= 1 AND level <= 30),
  score integer DEFAULT 0,
  completed boolean DEFAULT false,
  words_correct integer DEFAULT 0,
  words_total integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE game_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE level_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own game progress"
  ON game_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own game progress"
  ON game_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own game progress"
  ON game_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own level attempts"
  ON level_attempts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own level attempts"
  ON level_attempts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_game_progress_user ON game_progress(user_id);
CREATE INDEX idx_level_attempts_user ON level_attempts(user_id);
CREATE INDEX idx_level_attempts_level ON level_attempts(level);
