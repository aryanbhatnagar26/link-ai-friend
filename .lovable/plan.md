

# Plan: Simplify Website → Extension Communication for v4.0

## Summary
Remove all `user_id`, Supabase auth sync, and ownership verification logic from the website. Update message formats to match the new extension v4.0 requirements, enabling posting to work without any authentication coupling.

---

## Current Problem Analysis

### What's Breaking Posting:
1. **`useExtensionAuth.ts`** - Syncs Supabase session/tokens to extension (extension v4.0 doesn't need this)
2. **`useLinkedBotExtension.ts`** - Sends `user_id`, `userId`, `accessToken` in post payloads
3. **`extension-bridge.js`** - Forwards `userId` to extension for ownership verification
4. **`AgentChat.tsx`** - Blocks scheduling if user not authenticated
5. **`usePostsClean.ts`** - Requires `user_id` to save posts

### What Extension v4.0 Expects:
```text
POST_NOW:
  { id, content, imageUrl }  ← No user_id

SCHEDULE_POSTS:
  [{ id, content, imageUrl, scheduleTime }]  ← Renamed fields, no user_id
```

---

## Architecture Diagram

```text
BEFORE (v3.x - Broken):
┌─────────────────────────────────────────────────────────────┐
│ Website                                                      │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────┐   ┌─────────────────┐                   │
│ │ useExtensionAuth│──→│ SUPABASE_SESSION │──→ Extension     │
│ │ (sync tokens)   │   │ SET_AUTH         │   (blocks if     │
│ └─────────────────┘   │ user_id          │   auth missing)  │
│                       └─────────────────┘                   │
│ ┌─────────────────┐   ┌─────────────────┐                   │
│ │ AgentChat       │──→│ POST_NOW with   │──→ Extension      │
│ │ (check user_id) │   │ user_id, token  │   (validates      │
│ └─────────────────┘   └─────────────────┘   ownership)      │
└─────────────────────────────────────────────────────────────┘

AFTER (v4.0 - Simple):
┌─────────────────────────────────────────────────────────────┐
│ Website                                                      │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────┐   ┌─────────────────┐                   │
│ │ useExtension    │──→│ CONNECT_EXTENSION│──→ Extension     │
│ │ (connection     │   │ (simple ping)    │   (responds      │
│ │  only)          │   └─────────────────┘   CONNECTED)      │
│ └─────────────────┘                                         │
│ ┌─────────────────┐   ┌─────────────────┐                   │
│ │ AgentChat       │──→│ POST_NOW with   │──→ Extension      │
│ │ (no auth check) │   │ id, content,    │   (posts          │
│ └─────────────────┘   │ imageUrl only   │   immediately)    │
│                       └─────────────────┘                   │
└─────────────────────────────────────────────────────────────┘
```

---

## Files to Modify

### 1. DELETE: `src/hooks/useExtensionAuth.ts`
**Why:** Extension v4.0 doesn't need Supabase session, tokens, or user IDs

**Action:** Remove the entire file

---

### 2. SIMPLIFY: `src/hooks/useLinkedBotExtension.ts`
**Changes:**
- Remove `user_id` from `PostData` interface
- Remove `userId` parameter from `sendPendingPosts()`
- Update `postNow()` to send: `{ id, content, imageUrl }`
- Update `sendPendingPosts()` to send: `{ id, content, imageUrl, scheduleTime }`
- Remove `setCurrentUser()` and `clearUserSession()` methods
- Keep only connection logic

**Before:**
```typescript
window.postMessage({
  type: 'POST_NOW',
  post: {
    id: post.id,
    user_id: post.user_id,  // ❌ REMOVE
    content: post.content,
    photo_url: post.photo_url,
    scheduled_for: post.scheduled_time,
  },
}, '*');
```

**After:**
```typescript
window.postMessage({
  type: 'POST_NOW',
  post: {
    id: post.id,
    content: post.content,
    imageUrl: post.photo_url,  // ✅ Renamed
  },
}, '*');
```

---

### 3. SIMPLIFY: `public/extension-bridge.js`
**Changes:**
- Remove all `userId` references from message handlers
- Remove `window.LinkedBotAuth` object
- Remove `SUPABASE_SESSION`, `SET_AUTH`, `SET_USER_ID` handlers
- Remove `SET_CURRENT_USER`, `CLEAR_USER_SESSION`, `LOGOUT_USER` handlers
- Keep only `POST_NOW`, `SCHEDULE_POSTS`, and result handlers
- Update `SCHEDULE_POSTS` to not add `userId` to posts

---

### 4. SIMPLIFY: `src/pages/AgentChat.tsx`
**Changes:**
- Remove the authentication check before scheduling
- Remove `supabase.auth.getUser()` call before sending to extension
- Remove `currentUserId` variable and checks
- Send posts directly without user verification

**Remove this block (lines 274-282):**
```typescript
const { data: { user } } = await supabase.auth.getUser();
const currentUserId = user?.id;

if (!currentUserId) {
  console.error("❌ No authenticated user found");
  addActivityEntry("failed", "User not authenticated", savedPost.id);
  toast.error("Please log in again to schedule posts");
  return;
}
```

**Update post payload (lines 284-294):**
```typescript
const postForExtension = {
  id: savedPost.dbId || savedPost.id,
  content: savedPost.content,
  imageUrl: savedPost.imageUrl || undefined,
  scheduleTime: validScheduledTime,  // ✅ Renamed from scheduled_time
};
```

---

### 5. SIMPLIFY: `src/hooks/useAgentChat.ts`
**Changes:**
- Keep `savePostToDatabase()` for database persistence (still needs user_id for DB)
- But remove sending user_id to extension
- Database user_id is separate from extension communication

---

### 6. SIMPLIFY: `src/components/extension/ExtensionConnectionPanel.tsx`
**Changes:**
- Remove `userId` prop from `SchedulePostsButton`
- Update `PostNowButton` to use simplified post format

---

### 7. UPDATE: `src/types/extension.ts`
**Changes:**
- Remove `userId` and `user_id` from `PostSchedulePayload`
- Rename `scheduled_for` to `scheduleTime`
- Rename `photo_url` to `imageUrl`

---

### 8. REMOVE FROM: `src/App.tsx` or wherever `useExtensionAuth` is imported
**Changes:**
- Remove the `useExtensionAuth()` hook call
- Remove any related imports

---

## Database Considerations

**Keep in place:**
- `user_id` in the `posts` table is still needed for:
  - RLS policies (user can only see their own posts)
  - Dashboard post filtering
  - Analytics per user

**This is separate from extension communication:**
- Website saves post to DB with `user_id` (for persistence)
- Website sends post to extension WITHOUT `user_id` (for posting)
- Extension doesn't care who owns the post - it just posts it

---

## What Will Still Work

| Feature | Status |
|---------|--------|
| Login/Signup | Works (for dashboard access) |
| Create posts in DB | Works (user_id for ownership) |
| View my posts | Works (RLS filters by user) |
| Post to LinkedIn | Works (no auth check) |
| Schedule posts | Works (no auth check) |
| Supabase Realtime | Works (status updates from extension) |

---

## What Gets Removed

| Feature | Reason |
|---------|--------|
| Session sync to extension | v4.0 doesn't need it |
| Access token sharing | v4.0 doesn't need it |
| Extension auth validation | Blocking posting unnecessarily |
| User ID in post payloads | Extension ignores it |
| Ownership verification | Extension doesn't do this |

---

## Testing After Implementation

1. **Test 1: Extension Connection**
   - Open dashboard
   - Should show "Connected" if extension installed
   - No auth errors in console

2. **Test 2: Immediate Post**
   - Create a post with AI agent
   - Say "post now"
   - Should post to LinkedIn without any "not authenticated" errors

3. **Test 3: Scheduled Post**
   - Schedule a post for 2 minutes from now
   - Wait 2 minutes
   - Post should appear on LinkedIn

4. **Test 4: Without Login**
   - Log out of website
   - Try to access AgentChat
   - Should redirect to login (website auth still required for dashboard)
   - But if somehow bypassed, posting would still work with extension

---

## Re-adding Auth Later (Optional)

If you need per-user isolation in the extension later:

1. Add optional `userId` field to payloads (extension ignores if present)
2. Extension can filter posts by userId in Chrome storage
3. This is additive, not breaking

The key principle: **Auth should enhance, not block**

---

## Summary of Changes

| File | Action | Lines Changed |
|------|--------|---------------|
| `src/hooks/useExtensionAuth.ts` | DELETE | ~136 lines removed |
| `src/hooks/useLinkedBotExtension.ts` | SIMPLIFY | ~100 lines modified |
| `public/extension-bridge.js` | SIMPLIFY | ~200 lines removed |
| `src/pages/AgentChat.tsx` | SIMPLIFY | ~30 lines removed |
| `src/types/extension.ts` | UPDATE | ~10 lines modified |
| `src/components/extension/ExtensionConnectionPanel.tsx` | UPDATE | ~5 lines modified |

**Total: ~480 lines removed/simplified**

