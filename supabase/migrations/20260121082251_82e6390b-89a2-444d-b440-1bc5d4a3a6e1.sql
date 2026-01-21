-- Add LinkedIn profile URL field to user_profiles (read-only after save)
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS linkedin_profile_url_locked BOOLEAN DEFAULT FALSE;

-- Create app_role enum for admin system
DO $$ BEGIN
    CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create user_roles table for admin panel
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles" 
ON public.user_roles 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert roles" 
ON public.user_roles 
FOR INSERT 
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update roles" 
ON public.user_roles 
FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles" 
ON public.user_roles 
FOR DELETE 
USING (public.has_role(auth.uid(), 'admin'));

-- Add subscription fields to user_profiles
ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS subscription_plan TEXT DEFAULT 'free',
ADD COLUMN IF NOT EXISTS subscription_expires_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS posts_created_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS posts_scheduled_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS posts_published_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_active_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
ADD COLUMN IF NOT EXISTS phone_number TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS country TEXT;

-- Create view for admin to see all user data (with security definer function)
CREATE OR REPLACE FUNCTION public.get_admin_users_data()
RETURNS TABLE (
    id UUID,
    user_id UUID,
    email TEXT,
    name TEXT,
    phone_number TEXT,
    linkedin_profile_url TEXT,
    city TEXT,
    country TEXT,
    role TEXT,
    company_name TEXT,
    industry TEXT,
    subscription_plan TEXT,
    subscription_expires_at TIMESTAMP WITH TIME ZONE,
    posts_created_count INTEGER,
    posts_scheduled_count INTEGER,
    posts_published_count INTEGER,
    followers_count INTEGER,
    created_at TIMESTAMP WITH TIME ZONE,
    last_active_at TIMESTAMP WITH TIME ZONE,
    onboarding_completed BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Only allow admins to call this function
    IF NOT public.has_role(auth.uid(), 'admin') THEN
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
    LEFT JOIN public.linkedin_analytics la ON la.user_id = up.user_id;
END;
$$;