/** Rotating “Sherrii” faces for the nudge bubble — playful, never crude */
export const sherriiAvatars = [
  '👩',
  '😏',
  '🙄',
  '😼',
  '🤓',
  '🧙‍♀️',
  '💅',
  '🎭',
  '🦋',
  '✨',
  '🎯',
  '📊',
  '🤖',
  '👻',
  '🥸',
  '💭',
  '😌',
  '🧠',
  '👁️',
  '🔮',
] as const;

export type SherriiAvatar = (typeof sherriiAvatars)[number];

export function pickSherriiAvatar(): SherriiAvatar {
  return sherriiAvatars[Math.floor(Math.random() * sherriiAvatars.length)];
}
