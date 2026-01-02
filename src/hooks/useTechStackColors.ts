import { useState, useEffect } from 'react';
import { generateTechStackColors } from '../utils';

export const useTechStackColors = <T extends { roles?: Array<{ techStack: string[] }>; techStack?: string[] }>(
  items: T[]
): { colors: Record<string, string>; isClient: boolean } => {
  const [colors, setColors] = useState<Record<string, string>>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const newColors = generateTechStackColors(items);
    setColors(newColors);
  }, [items]);

  return { colors, isClient };
};

