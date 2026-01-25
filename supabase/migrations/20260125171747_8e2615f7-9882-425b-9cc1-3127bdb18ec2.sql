-- Update get_admin_users_data to exclude users with admin roles
CREATE OR REPLACE FUNCTION public.get_admin_users_data()
RETURNS TABLE(
    id uuid, 
    user_id uuid, 
    email text, 
    name text, 
    phone_number text, 
    linkedin_profile_url text, 
    city text, 
    country text, 
    role text, 
    company_name text, 
    industry text, 
    subscription_plan text, 
    subscription_expires_at timestamp with time zone, 
    posts_created_count integer, 
    posts_scheduled_count integer, 
    posts_published_count integer, 
    followers_count integer, 
    created_at timestamp with time zone, 
    last_active_at timestamp with time zone, 
    onboarding_completed boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
    -- Only allow admins to call this function (includes super_admin)
    IF NOT public.is_admin(auth.uid()) THEN
        RAISE EXCEPTION 'Access denied: Admin role required';
    END IF;
    
    RETURN QUERY
    SELECT 
        up.id,
        up.user_id,
        up.email,
        up.name,
        up.phone_number,
        up.linkedin_profile_url,
        up.city,
        up.country,
        up.role,
        up.company_name,
        up.industry,
        up.subscription_plan,
        up.subscription_expires_at,
        up.posts_created_count,
        up.posts_scheduled_count,
        up.posts_published_count,
        COALESCE(la.followers_count, 0) as followers_count,
        up.created_at,
        up.last_active_at,
        up.onboarding_completed
    FROM public.user_profiles up
    LEFT JOIN public.linkedin_analytics la ON la.user_id = up.user_id
    -- Exclude users who have admin or super_admin roles
    WHERE NOT EXISTS (
        SELECT 1 FROM public.user_roles ur 
        WHERE ur.user_id = up.user_id 
        AND ur.role IN ('admin'::app_role, 'super_admin'::app_role)
    );
END;
$function$;