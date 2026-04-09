import { motion as Motion } from 'framer-motion';
import { MOTION_EASE } from './motion';

export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark';

  return (
    <Motion.button
      type="button"
      onClick={onToggle}
      whileHover={{ scale: 1.012 }}
      whileTap={{ scale: 0.975 }}
      className="relative inline-grid h-10 w-[6.85rem] grid-cols-2 items-center rounded-full border border-border bg-background/78 p-1 text-[0.65rem] font-semibold tracking-[0.16em] text-foreground shadow-[var(--theme-shadow)] backdrop-blur max-[360px]:w-[6.45rem] sm:h-11 sm:w-[8.75rem] sm:text-xs sm:tracking-[0.18em]"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-pressed={isDark}
    >
      <Motion.span
        className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-accent shadow-[0_12px_30px_color-mix(in_srgb,var(--theme-accent)_32%,transparent)]"
        animate={{ x: isDark ? '100%' : '0%' }}
        transition={{ duration: 0.34, ease: MOTION_EASE }}
      />
      <Motion.span
        className={`relative z-10 ${isDark ? 'text-foreground-muted' : 'text-accent-foreground'}`}
        animate={{ opacity: isDark ? 0.62 : 1 }}
        transition={{ duration: 0.24, ease: MOTION_EASE }}
      >
        Light
      </Motion.span>
      <Motion.span
        className={`relative z-10 ${isDark ? 'text-accent-foreground' : 'text-foreground-muted'}`}
        animate={{ opacity: isDark ? 1 : 0.62 }}
        transition={{ duration: 0.24, ease: MOTION_EASE }}
      >
        Dark
      </Motion.span>
    </Motion.button>
  );
}
