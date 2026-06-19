import { useCallback, useRef, useState } from 'react';
import type { FoodPlan } from '../types/foodPlan';
import { sendFoodPlanChat, type ChatMessage } from '../lib/foodPlan';

const WELCOME =
  'Ask me anything about your menu, swaps, grocery run, or prep. I will not change your saved plan.';

export function useFoodPlanChat(plan: FoodPlan) {
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: 'assistant', content: WELCOME }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  const scrollDown = () => {
    requestAnimationFrame(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }));
  };

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = { role: 'user', content: text };
    const history = messages.filter((m) => m.content !== WELCOME);
    const payload = [...history, userMsg];

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setError('');

    const result = await sendFoodPlanChat(payload, plan);
    setLoading(false);

    if (!result.ok) {
      setError(result.message);
      scrollDown();
      return;
    }

    setMessages((prev) => [...prev, { role: 'assistant', content: result.data.reply }]);
    scrollDown();
  }, [input, loading, messages, plan]);

  return { messages, input, setInput, loading, error, send, endRef };
}
