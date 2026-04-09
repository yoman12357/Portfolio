import { useCallback, useEffect, useMemo, useState } from 'react';

const THEME_KEY = 'portfolio-theme';

function getStoredTheme() {
  if (typeof window === 'undefined') {
    return null;
  }

  const savedTheme = window.localStorage.getItem(THEME_KEY);
  return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : null;
}

function getPreferredTheme() {
  const storedTheme = getStoredTheme();
  if (storedTheme) {
    return storedTheme;
  }

  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.style.colorScheme = theme;
}

export function initializeTheme() {
  if (typeof document === 'undefined') {
    return;
  }

  applyTheme(getPreferredTheme());
}

export function useTheme() {
  const [theme, setTheme] = useState(getPreferredTheme);
  const [hasManualPreference, setHasManualPreference] = useState(() => getStoredTheme() !== null);

  useEffect(() => {
    applyTheme(theme);

    if (hasManualPreference) {
      window.localStorage.setItem(THEME_KEY, theme);
    } else {
      window.localStorage.removeItem(THEME_KEY);
    }
  }, [theme, hasManualPreference]);

  useEffect(() => {
    if (hasManualPreference || typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event) => {
      setTheme(event.matches ? 'dark' : 'light');
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [hasManualPreference]);

  const toggleTheme = useCallback(() => {
    setHasManualPreference(true);
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  }, []);

  return useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      toggleTheme,
    }),
    [theme, toggleTheme]
  );
}
