import { useEffect, useState } from 'react';
import { useTheme, ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';
import { FaCircleHalfStroke } from 'react-icons/fa6';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange {...props}>
      {children}
    </NextThemesProvider>
  );
}

export const ThemeSwitch = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <FaCircleHalfStroke className="h-[14px] w-[14px] text-neutral-900" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === 'dark';
  return (
    <button
      type="button"
      aria-label={`${isDark ? 'dark' : 'light'} mode`}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex items-center justify-center transition-opacity duration-300 hover:opacity-90"
    >
      <FaCircleHalfStroke className={`h-[14px] w-[14px] ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`} />
    </button>
  );
};
