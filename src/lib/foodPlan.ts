import type { FoodPlan } from '../types/foodPlan';
import defaultPlan from '../../netlify/functions/food-plan-default.json';

export const foodPlanFallback = defaultPlan as FoodPlan;

export type ChatMessage = { role: 'user' | 'assistant'; content: string };

type Result<T> = { ok: true; data: T } | { ok: false; message: string };

async function call<T>(target: string, init?: RequestInit): Promise<Result<T>> {
  try {
    const res = await fetch(target, { cache: 'no-store', ...init });
    const ct = res.headers.get('content-type') || '';
    if (res.ok && !ct.includes('application/json')) {
      return { ok: false, message: 'API returned HTML. Run netlify dev locally.' };
    }

    const body = (await res.json().catch(() => ({}))) as Record<string, unknown> & {
      error?: string;
      message?: string;
    };

    if (!res.ok || body.error) {
      const detail = (body.message as string) || (body.error as string) || res.statusText;
      return { ok: false, message: detail || `HTTP ${res.status}` };
    }

    return { ok: true, data: body as T };
  } catch (e) {
    return { ok: false, message: e instanceof Error ? e.message : String(e) };
  }
}

export function sendFoodPlanChat(messages: ChatMessage[], plan: FoodPlan) {
  return call<{ reply: string }>('/api/food-plan-chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, plan }),
  });
}
