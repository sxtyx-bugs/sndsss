-- Add automatic deletion of expired shares from recent_shares table
-- This function will delete recent_shares entries when their corresponding messages expire

-- Function to delete expired shares
CREATE OR REPLACE FUNCTION delete_expired_recent_shares()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  DELETE FROM recent_shares
  WHERE message_id IN (
    SELECT id FROM messages
    WHERE expires_at < NOW()
  );
END;
$$;

-- Trigger to automatically delete recent_shares when messages expire
CREATE OR REPLACE FUNCTION cleanup_expired_share()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- When a message is deleted or expires, remove it from recent_shares
  DELETE FROM recent_shares WHERE message_id = OLD.id;
  RETURN OLD;
END;
$$;

-- Create trigger on messages table
DROP TRIGGER IF EXISTS cleanup_expired_share_trigger ON messages;
CREATE TRIGGER cleanup_expired_share_trigger
  BEFORE DELETE ON messages
  FOR EACH ROW
  EXECUTE FUNCTION cleanup_expired_share();

-- Add an index for faster lookups
CREATE INDEX IF NOT EXISTS idx_recent_shares_message_id ON recent_shares(message_id);
