import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface ProfileData {
  username?: string;
  profileUrl?: string;
  followersCount?: number;
  connectionsCount?: number;
  fullName?: string;
  headline?: string;
  profilePhoto?: string;
  currentRole?: string;
  currentCompany?: string;
  location?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const { userId, profileData } = await req.json() as { userId: string; profileData: ProfileData };

    if (!userId) {
      return new Response(JSON.stringify({ error: 'userId required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!profileData || typeof profileData !== 'object') {
      return new Response(JSON.stringify({ error: 'profileData required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const now = new Date().toISOString();

    // Update user profile data with full LinkedIn profile info
    const { error: updateError } = await supabase
      .from('user_profiles')
      .update({
        linkedin_profile_data: profileData,
        profile_last_scraped: now,
      })
      .eq('user_id', userId);

    if (updateError) {
      console.error('Profile update error:', updateError);
      throw updateError;
    }

    // Also update linkedin_analytics if profile data contains follower info
    if (profileData.followersCount !== undefined || profileData.connectionsCount !== undefined) {
      const { error: analyticsError } = await supabase
        .from('linkedin_analytics')
        .upsert({
          user_id: userId,
          followers_count: profileData.followersCount || 0,
          connections_count: profileData.connectionsCount || 0,
          username: profileData.username || profileData.fullName,
          profile_url: profileData.profileUrl,
          last_synced: now,
        }, {
          onConflict: 'user_id',
        });

      if (analyticsError) {
        console.warn('Analytics upsert warning:', analyticsError);
        // Don't fail the whole request for analytics update
      }
    }

    console.log(`✅ Profile synced for user ${userId}`);

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Profile data synced successfully',
      syncedAt: now,
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Sync profile error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
