
# Fix: Posts Mixing Between User Accounts

## Problem Summary

New users are seeing posts from other accounts. After investigation, I found that **the website frontend correctly isolates user data** through RLS policies and user-filtered queries. However, there are two backend security vulnerabilities that could cause data mixing:

## Root Causes

### 1. `sync-post` Edge Function - Missing User Ownership Verification
The function updates posts by matching `postId` or `trackingId` without verifying the `userId` actually owns that post.

**Current Code (Vulnerable):**
```typescript
// Finds post by ID only - no user verification!
.eq('id', postId)
.maybeSingle();
```

**Required Fix:**
```typescript
// Must also verify user owns the post
.eq('id', postId)
.eq('user_id', userId)  // Add ownership check
.maybeSingle();
```

### 2. `post-success` Edge Function - Same Issue
This function has similar vulnerability where it matches by `postId`/`trackingId` without strict user verification.

### 3. Extension State Management (User-Side)
The Chrome extension may cache post data from previous user sessions. When a new user logs in on the same browser, the extension could reference stale post IDs.

---

## Implementation Plan

### Step 1: Fix `sync-post` Edge Function (Critical Security Fix)
Add mandatory `userId` parameter validation and ownership verification:

1. Make `userId` required in payload validation
2. Add `.eq('user_id', userId)` to post lookup queries
3. Reject requests where userId doesn't match post owner
4. Return 403 Forbidden for ownership mismatches

### Step 2: Fix `post-success` Edge Function
Similar ownership verification:

1. Require `userId` in payload
2. Verify ownership before updating
3. Return clear error if mismatch detected

### Step 3: Update Extension Bridge (Ensure userId is Always Sent)
The bridge already passes `userId`, but we should:

1. Ensure `userId` is REQUIRED (not optional) in all calls
2. Add validation that rejects calls without valid `userId`

### Step 4: Add Extension State Isolation (User-Side Fix)
**This requires changes to the extension itself:**

1. Clear cached posts when user changes
2. Store posts keyed by userId, not globally
3. On webapp login, notify extension of new user session

---

## Technical Changes

### File: `supabase/functions/sync-post/index.ts`

**Changes:**
- Add `userId` as required parameter (return 400 if missing)
- Modify post lookup to include `user_id` filter
- Add ownership verification after finding post
- Return 403 if userId doesn't match post.user_id

### File: `supabase/functions/post-success/index.ts`

**Changes:**
- Already has `userId` validation, but uses `eq('user_id', userId)` on UPDATE only
- Need to also verify on the initial lookup
- Move ownership check earlier in the flow

### File: `public/extension-bridge.js`

**Changes:**
- Add validation that throws error if `userId` is missing in payload
- Log warnings when userId is undefined

---

## For Extension (User Must Fix)

The extension needs these changes (not in webapp scope):

1. **Clear queue when user changes**
   - Listen for `linkedbot:user-changed` event
   - Clear all cached posts and scheduled items

2. **Store posts by userId**
   - Key structure: `posts_${userId}` instead of just `posts`
   - Prevents cross-user data leakage

3. **Validate userId before sync**
   - Don't send API requests without valid userId

---

## Security Impact

| Issue | Severity | Status |
|-------|----------|--------|
| Post update without ownership check | HIGH | Will be fixed |
| Cross-user data in extension cache | MEDIUM | Extension-side fix |
| Missing userId validation in edge functions | HIGH | Will be fixed |

---

## Testing After Fix

1. Create two test accounts (User A and User B)
2. Log in as User A, create and schedule posts
3. Log out, log in as User B
4. Verify User B sees ONLY their own posts
5. Schedule a post as User B
6. Verify extension sync only updates User B's posts
7. Check database to confirm user_id isolation
