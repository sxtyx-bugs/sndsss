-- Create messages table for EphemeralShare
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  encrypted_data TEXT NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP WITH TIME ZONE,
  ip_address TEXT,
  user_agent TEXT
);

-- Create index for message lookups
CREATE INDEX IF NOT EXISTS idx_messages_id ON messages(id);
CREATE INDEX IF NOT EXISTS idx_messages_expires_at ON messages(expires_at);

-- Enable Row Level Security
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read any message (not authenticated)
CREATE POLICY "Allow reading messages" ON messages
  FOR SELECT USING (true);

-- Policy: Anyone can insert messages
CREATE POLICY "Allow inserting messages" ON messages
  FOR INSERT WITH CHECK (true);

-- Policy: Anyone can update messages (to mark as read)
CREATE POLICY "Allow updating messages" ON messages
  FOR UPDATE USING (true);

-- Policy: Anyone can delete messages
CREATE POLICY "Allow deleting messages" ON messages
  FOR DELETE USING (true);
