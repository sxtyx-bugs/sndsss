-- Create the recent_shares table for global share tracking
CREATE TABLE IF NOT EXISTS recent_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_recent_shares_created_at ON recent_shares(created_at DESC);

-- Enable Row Level Security
ALTER TABLE recent_shares ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read recent shares
CREATE POLICY "Allow reading recent shares" ON recent_shares
  FOR SELECT USING (true);

-- Allow anyone to insert recent shares
CREATE POLICY "Allow inserting recent shares" ON recent_shares
  FOR INSERT WITH CHECK (true);
