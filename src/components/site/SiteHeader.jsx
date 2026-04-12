import { AnimatePresence, motion as Motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import Magnetic from './Magnetic';
import { MOTION_EASE } from './motion';

export default function SiteHeader({ theme, onToggleTheme, navigation, profile, onOpenResume }) {
  const [activeId, setActiveId] = useState(navigation[0]?.id ?? 'hero');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const sectionIds = useMemo(() => navigation.map(({ id }) => id), [navigation]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

    if (!elements.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (visibleEntry?.target?.id) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: '-28% 0px -42% 0px',
        threshold: [0.2, 0.4, 0.6],
      }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sectionIds]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const scrollToSection = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  }, []);

  return (
    <header className="sticky top-0 z-50 pt-3 sm:pt-6">
      <div className="section-shell">
        <Motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: scrolled ? 0.996 : 1,
            backdropFilter: scrolled ? 'blur(24px)' : 'blur(16px)',
          }}
          transition={{ duration: 0.38, ease: MOTION_EASE }}
          className={`nav-glass relative flex items-center justify-between gap-3 overflow-hidden rounded-[1.7rem] px-3 py-2.5 transition-all duration-300 sm:gap-4 sm:rounded-[2rem] sm:px-5 sm:py-3.5 ${
            scrolled ? 'shadow-[var(--theme-shadow-lg)] backdrop-blur-xl' : ''
          }`}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent" />
          <div className="pointer-events-none absolute -left-10 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full bg-accent/10 blur-2xl" />

          <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
            <a
              href="#hero"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection('hero');
              }}
              className="group flex min-w-0 items-center gap-3 rounded-[1.25rem] border border-border/60 bg-background/50 px-2.5 py-2 sm:gap-3.5 sm:px-3"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[1rem] bg-foreground text-sm font-bold tracking-[0.18em] text-background transition-transform duration-300 group-hover:scale-[1.02] sm:h-11 sm:w-11">
                {profile.initials}
              </span>
              <span className="min-w-0 max-[420px]:hidden">
                <span className="block truncate font-display text-sm font-bold uppercase tracking-[0.2em] text-foreground">
                  {profile.name}
                </span>
                <span className="hidden truncate text-[0.82rem] text-foreground-muted sm:block">
                  {profile.secondaryRole}
                </span>
              </span>
            </a>

            <nav className="hidden items-center gap-1 rounded-full border border-border/60 bg-background/42 p-1.5 lg:flex">
              {navigation.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection(item.id);
                  }}
                  aria-current={activeId === item.id ? 'page' : undefined}
                  className={`rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                    activeId === item.id
                      ? 'bg-accent text-accent-foreground shadow-[0_18px_40px_color-mix(in_srgb,var(--theme-accent)_22%,transparent)]'
                      : 'text-foreground-muted hover:bg-surface hover:text-foreground'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex min-w-0 items-center gap-2 rounded-full border border-border/60 bg-background/46 p-1.5 sm:gap-3">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />

            <Magnetic strength={8}>
              <button
                type="button"
                onClick={onOpenResume}
                className="button-secondary hidden border-transparent bg-accent text-accent-foreground shadow-[0_16px_32px_color-mix(in_srgb,var(--theme-accent)_22%,transparent)] sm:inline-flex"
              >
                Resume
              </button>
            </Magnetic>

            <Motion.button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              whileTap={{ scale: 0.96 }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/70 text-foreground sm:h-11 sm:w-11 lg:hidden"
              aria-expanded={menuOpen}
              aria-label="Toggle navigation"
              aria-controls="mobile-navigation"
            >
              <span className="flex flex-col gap-1.5">
                <span className={`h-0.5 w-5 rounded-full bg-current transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
                <span className={`h-0.5 w-5 rounded-full bg-current transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`h-0.5 w-5 rounded-full bg-current transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
              </span>
            </Motion.button>
          </div>
        </Motion.div>

        <AnimatePresence>
          {menuOpen ? (
            <Motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="nav-glass mt-2 overflow-hidden rounded-[1.6rem] p-3 sm:mt-3 sm:rounded-[2rem] sm:p-4 lg:hidden"
              id="mobile-navigation"
            >
              <div className="mb-3 flex items-center justify-between rounded-[1.2rem] border border-border/60 bg-background/46 px-4 py-3">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                    Navigation
                  </p>
                  <p className="mt-1 text-sm font-semibold text-foreground">{profile.name}</p>
                </div>
                <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_18px_var(--theme-accent)]" />
              </div>

              <nav className="flex flex-col gap-2">
                {navigation.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToSection(item.id);
                    }}
                    aria-current={activeId === item.id ? 'page' : undefined}
                    className={`rounded-[1.15rem] px-4 py-3 text-sm font-semibold transition-colors duration-300 ${
                      activeId === item.id
                        ? 'bg-accent text-accent-foreground'
                        : 'border border-border/60 bg-background/50 text-foreground'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}

                <Magnetic>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onOpenResume();
                    }}
                    className="button-primary mt-2"
                  >
                    View Resume
                  </button>
                </Magnetic>
              </nav>
            </Motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
