import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { ASSISTANT_SYSTEM_PROMPT, scriptedReply } from '@/lib/assistant';

export const dynamic = 'force-dynamic';

/**
 * Sales assistant endpoint.
 *
 * With ANTHROPIC_API_KEY set, conversations run on Claude, grounded in the
 * product knowledge base. Without it, the scripted engine answers at zero
 * cost — so the widget works (and sells) either way, and enabling the LLM
 * is just an env var.
 */

let anthropic: Anthropic | null = null;
function getAnthropic(): Anthropic | null {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  if (!anthropic) anthropic = new Anthropic();
  return anthropic;
}

type ChatMessage = { role: 'user' | 'assistant'; content: string };

const MAX_MESSAGES = 16;
const MAX_MESSAGE_LENGTH = 2000;

export async function POST(req: Request) {
  let messages: ChatMessage[];
  try {
    const body = (await req.json()) as { messages?: ChatMessage[] };
    messages = (body.messages ?? [])
      .filter(
        (m): m is ChatMessage =>
          !!m &&
          (m.role === 'user' || m.role === 'assistant') &&
          typeof m.content === 'string' &&
          m.content.trim().length > 0
      )
      .slice(-MAX_MESSAGES)
      .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LENGTH) }));
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const lastUser = [...messages].reverse().find((m) => m.role === 'user');
  if (!lastUser) {
    return NextResponse.json({ error: 'No user message provided.' }, { status: 400 });
  }

  const client = getAnthropic();
  if (client) {
    try {
      const response = await client.messages.create({
        model: 'claude-opus-4-8',
        max_tokens: 512,
        system: ASSISTANT_SYSTEM_PROMPT,
        messages,
      });
      const text = response.content
        .filter((b): b is Anthropic.TextBlock => b.type === 'text')
        .map((b) => b.text)
        .join('');
      if (text.trim()) {
        return NextResponse.json({
          reply: text.trim(),
          suggestions: scriptedReply(lastUser.content).suggestions,
          engine: 'claude',
        });
      }
      // Empty response (e.g. refusal) — fall through to the scripted engine.
    } catch (e) {
      // API failure must never break the sales flow — fall back to scripted.
      console.error('[assistant] Claude request failed, using scripted fallback:', e);
    }
  }

  const fallback = scriptedReply(lastUser.content);
  return NextResponse.json({ ...fallback, engine: 'scripted' });
}
