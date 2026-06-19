import { env, loadProjectEnv } from './_env.mjs';

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(body),
  };
}

/**
 * @param {string} apiKey
 * @param {object} plan
 * @param {{ role: string; content: string }[]} messages
 */
async function chatWithClaude(apiKey, plan, messages) {
  const model = env('ANTHROPIC_MODEL') || 'claude-sonnet-4-6';

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model,
      max_tokens: 2048,
      system: [
        'You are a warm, practical nutrition helper for Shreya on her private food plan page.',
        'You know her full meal plan JSON below. Help with menu picks, swaps, grocery questions, prep timing, and general wellness chat.',
        'Never rewrite or output the full plan JSON. Keep answers concise and actionable.',
        'Never use em dashes or en dashes.',
        `Food plan:\n${JSON.stringify(plan)}`,
      ].join(' '),
      messages: messages.map((m) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content,
      })),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Claude API HTTP ${res.status}: ${detail.slice(0, 240)}`);
  }

  const payload = await res.json();
  const text = payload?.content?.find((part) => part.type === 'text')?.text;
  if (!text) throw new Error('Claude returned no text');
  return text.trim();
}

export async function handler(event) {
  loadProjectEnv();

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const apiKey = env('ANTHROPIC_API_KEY');
  if (!apiKey) {
    return json(503, { error: 'missing_env', message: 'Set ANTHROPIC_API_KEY in .env or Netlify.' });
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const messages = Array.isArray(body.messages) ? body.messages : [];
    const plan = body.plan && typeof body.plan === 'object' ? body.plan : {};

    if (messages.length === 0 || !messages.some((m) => m.role === 'user' && m.content?.trim())) {
      return json(400, { error: 'bad_request', message: 'Send at least one user message.' });
    }

    const reply = await chatWithClaude(apiKey, plan, messages.slice(-12));
    return json(200, { reply });
  } catch (e) {
    const hint = e instanceof Error ? e.message : String(e);
    return json(502, { error: 'chat_error', message: hint });
  }
}
