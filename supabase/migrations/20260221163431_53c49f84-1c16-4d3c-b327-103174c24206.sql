
-- Fix 1: Create a safe view for user_profiles that excludes OAuth tokens
CREATE OR REPLACE VIEW public.user_profiles_safe
WITH (security_invoker = on) AS
SELECT 
  id, user_id, name, email, user_type, company_name, industry,
  company_description, target_audience, location, default_topics,
  role, background, posting_goals, linkedin_profile_url,
  linkedin_profile_url_locked, linkedin_profile_edit_count,
  linkedin_profile_confirmed, linkedin_username, linkedin_public_id,
  linkedin_verified, linkedin_verified_at, preferred_tone,
  post_frequency, onboarding_completed, phone_number, city, country,
  subscription_plan, subscription_expires_at, posts_created_count,
  posts_scheduled_count, posts_published_count, last_active_at,
  created_at, updated_at, linkedin_profile_data, profile_last_scraped,
  linkedin_id, daily_post_count, last_post_date
  -- Explicitly EXCLUDES: linkedin_access_token, linkedin_refresh_token, linkedin_token_expires_at
FROM public.user_profiles;

-- Fix 2: Replace get_admin_scheduled_posts with admin authorization check
CREATE OR REPLACE FUNCTION public.get_admin_scheduled_posts()
RETURNS TABLE(
  post_id uuid,
  user_id uuid,
  user_name text,
  user_email text,
  content text,
  photo_url text,
  scheduled_time timestamp with time zone,
  status text,
  created_at timestamp with time zone,
  tracking_id text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Verify caller is an admin
  IF NOT public.is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Access denied: Admin role required';
  END IF;

  RETURN QUERY
  SELECT
    p.id as post_id,
    p.user_id,
    up.name as user_name,
    up.email as user_email,
    p.content,
    p.photo_url,
    p.scheduled_time,
    p.status,
    p.created_at,
    p.tracking_id
  FROM posts p
  LEFT JOIN user_profiles up ON up.user_id = p.user_id
  WHERE p.status IN ('pending', 'posting')
  ORDER BY p.scheduled_time ASC;
END;
$$;
