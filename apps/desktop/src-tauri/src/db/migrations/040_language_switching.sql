-- Add secondary language and language switching preference columns
ALTER TABLE user_preferences ADD COLUMN secondary_language TEXT DEFAULT NULL;
ALTER TABLE user_preferences ADD COLUMN language_switching_enabled INTEGER DEFAULT 0;
