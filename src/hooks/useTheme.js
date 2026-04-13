import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

const THEME_KEY = 'portfolio-theme';
const THEME_TRANSITION_CLASS = 'theme-transitioning';
const THEME_TRANSITION_DURATION = 420;
let themeTransitionTimeoutId = null;

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

function beginThemeTransition() {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return;
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const root = document.documentElement;
  root.classList.add(THEME_TRANSITION_CLASS);
  root.getBoundingClientRect();

  if (themeTransitionTimeoutId) {
    window.clearTimeout(themeTransitionTimeoutId);
  }

  themeTransitionTimeoutId = window.setTimeout(() => {
    root.classList.remove(THEME_TRANSITION_CLASS);
    themeTransitionTimeoutId = null;
  }, THEME_TRANSITION_DURATION + 80);
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
  const hasMountedRef = useRef(false);
  const previousThemeRef = useRef(theme);

  useLayoutEffect(() => {
    const themeChanged = hasMountedRef.current && previousThemeRef.current !== theme;

    if (themeChanged) {
      beginThemeTransition();
    }

    applyTheme(theme);
    previousThemeRef.current = theme;
    hasMountedRef.current = true;

    if (hasManualPreference) {
      window.localStorage.setItem(THEME_KEY, theme);
    } else {
      window.localStorage.removeItem(THEME_KEY);
    }
  }, [theme, hasManualPreference]);

  useEffect(
    () => () => {
      if (themeTransitionTimeoutId && typeof window !== 'undefined') {
        window.clearTimeout(themeTransitionTimeoutId);
        themeTransitionTimeoutId = null;
      }
    },
    []
  );

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
