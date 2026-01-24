import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface SyncPostPayload {
  trackingId?: string;
  postId?: string;
  userId?: string;
  linkedinUrl?: string;
  status?: 'posted' | 'failed' | 'scheduled';
  postedAt?: string;
  lastError?: string;
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
    const payload: SyncPostPayload = await req.json();
    const { trackingId, postId, userId, linkedinUrl, status, postedAt, lastError } = payload;

    if (!trackingId && !postId) {
      return new Response(JSON.stringify({ error: 'trackingId or postId required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Build update data based on status
    const updateData: Record<string, unknown> = {
      status: status || 'posted',
      updated_at: new Date().toISOString(),
    };

    if (status === 'posted' || !status) {
      updateData.linkedin_post_url = linkedinUrl || null;
      updateData.posted_at = postedAt || new Date().toISOString();
    }

    if (status === 'failed') {
      updateData.last_error = lastError || 'Unknown error';
      updateData.retry_count = 1; // Will be incremented by retry logic
    }

    // Build query - match by postId (preferred) or trackingId
    let query = supabase.from('posts').update(updateData);

    if (postId) {
      query = query.eq('id', postId);
    } else if (trackingId) {
      query = query.eq('tracking_id', trackingId);
    }

    // Optionally filter by userId for security
    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { error: postError } = await query;

    if (postError) {
      console.error('Post update error:', postError);
      throw postError;
    }

    // Only increment counts and create notification for successful posts
    if (userId && (status === 'posted' || !status)) {
      // Increment daily post count
      const { error: rpcError } = await supabase.rpc('increment_daily_post_count', { 
        p_user_id: userId 
      });
      if (rpcError) {
        console.error('RPC error:', rpcError);
      }

      // Create success notification
      await supabase.from('notifications').insert({
        user_id: userId,
        title: 'Post Published 🎉',
        message: 'Your LinkedIn post has been published successfully.',
        type: 'post',
      });

      // Update user profile posts_published_count
      const { data: currentProfile } = await supabase
        .from('user_profiles')
        .select('posts_published_count')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (currentProfile) {
        await supabase
          .from('user_profiles')
          .update({ posts_published_count: (currentProfile.posts_published_count || 0) + 1 })
          .eq('user_id', userId);
      }
    }

    // Create failure notification
    if (userId && status === 'failed') {
      await supabase.from('notifications').insert({
        user_id: userId,
        title: 'Post Failed ❌',
        message: lastError || 'Failed to publish your post. Please try again.',
        type: 'post',
      });
    }

    console.log(`Post ${postId || trackingId} status updated to: ${status || 'posted'}`);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Sync post error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
