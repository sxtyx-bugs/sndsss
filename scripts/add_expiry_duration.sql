-- Add expiry_duration column to messages table
ALTER TABLE messages ADD COLUMN IF NOT EXISTS expiry_duration INTEGER DEFAULT 1440;
