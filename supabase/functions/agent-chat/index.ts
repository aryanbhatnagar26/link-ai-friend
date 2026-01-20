import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function extractTopic(message: string): string {
  const lower = message.toLowerCase();

  // Prefer explicit "about X" pattern
  const aboutIdx = lower.indexOf("about");
  if (aboutIdx !== -1) {
    const after = message.slice(aboutIdx + "about".length).trim();
    if (after) return after.replace(/[.?!]$/, "").trim();
  }

  // Fallback: strip common verbs
  const cleaned = message
    .replace(/^(create|generate|write|make|draft|please|can you|could you|i want|i need)\s*/gi, "")
    .replace(/\s*(posts?|content|articles?|drafts?)\s*/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned || "professional development";
}

function isGreeting(lower: string): boolean {
  return lower === "hi" || lower === "hello" || lower === "hey" || lower === "hola";
}

function isPostRequest(lower: string): boolean {
  return (
    lower.includes("write") ||
    lower.includes("create") ||
    lower.includes("generate") ||
    lower.includes("draft") ||
    lower.includes("post about") ||
    /^(post|posts)\s+(about|on|regarding)\b/.test(lower)
  );
}

function isPostNowRequest(lower: string): boolean {
  return (
    lower.includes("post it") ||
    lower.includes("publish") ||
    lower.includes("post now") ||
    lower.includes("post this")
  );
}

function buildDraft(topic: string): string {
  return `The landscape of ${topic} is evolving rapidly.

As professionals, we need to stay ahead of the curve and embrace innovation while staying grounded in what actually works.

Here are three key insights I've been reflecting on:

1) Continuous learning is no longer optional—it's essential
2) Adaptation requires both courage and strategic thinking
3) Results come from balancing bold ideas with practical execution

What's your perspective on ${topic}? I'd love to hear your thoughts in the comments.

#Professional #Innovation #Growth`;
}

function nowIso(): string {
  return new Date().toISOString();
}

serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const message: string = String(body?.message ?? "");

    console.log("agent-chat received:", message);

    const lower = message.trim().toLowerCase();

    // Default response shape expected by the frontend hook:
    // { type, message, posts, topic }

    if (!message.trim()) {
      return new Response(
        JSON.stringify({
          type: "message",
          message: "Please type a message to continue.",
          posts: [],
          topic: null,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (isGreeting(lower)) {
      return new Response(
        JSON.stringify({
          type: "message",
          message:
            "Hello! I can help you draft LinkedIn posts.\n\nTry: 'Write a post about AI trends' or 'Create a post about leadership'.",
          posts: [],
          topic: null,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (isPostNowRequest(lower)) {
      return new Response(
        JSON.stringify({
          type: "message",
          message:
            "Please click the 'Post Now' button next to the post in the Generated Posts panel to publish it.",
          posts: [],
          topic: null,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (isPostRequest(lower)) {
      const topic = extractTopic(message);
      const draft = buildDraft(topic);
      const ts = nowIso();

      const post = {
        id: `post-${Date.now()}`,
        content: draft,
        suggestedTime: ts,
        reasoning: `Generated a draft about "${topic}"`,
        scheduledDateTime: ts,
        generateImage: false,
        imagePrompt: `Professional LinkedIn visual for: ${topic}`,
      };

      return new Response(
        JSON.stringify({
          type: "posts_generated",
          message:
            `I've created a draft about ${topic}.\n\nYou can see it in the Generated Posts panel. Click 'Post Now' when you're ready to publish.`,
          posts: [post],
          topic,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fallback
    return new Response(
      JSON.stringify({
        type: "message",
        message: `I understand you want to discuss: "${message}"\n\nIf you'd like, I can turn that into a LinkedIn post—just say “write a post about ${message}”.`,
        posts: [],
        topic: null,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("agent-chat error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    // IMPORTANT: return 200 so the frontend doesn't treat it as a function failure
    return new Response(
      JSON.stringify({
        type: "message",
        message: "Sorry, I encountered an error. Please try again.",
        posts: [],
        topic: null,
        error: errorMessage,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  }
});
