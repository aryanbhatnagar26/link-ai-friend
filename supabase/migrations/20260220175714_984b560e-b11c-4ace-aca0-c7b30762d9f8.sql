
-- Add LinkedIn API token columns to user_profiles
ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS linkedin_access_token TEXT,
  ADD COLUMN IF NOT EXISTS linkedin_refresh_token TEXT,
  ADD COLUMN IF NOT EXISTS linkedin_token_expires_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS linkedin_id TEXT;

-- Create index for linkedin_id lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_linkedin_id ON public.user_profiles(linkedin_id);
