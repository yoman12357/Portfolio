import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import Magnetic from './Magnetic';
import { MOTION_EASE } from './motion';

const LOGO_MAGNET_RADIUS = 100;
const LOGO_MAGNET_STRENGTH = 18;

export default function SiteHeader({
  theme,
  onToggleTheme,
  navigation,
  profile,
  onOpenResume,
  activeId = 'hero',
  onNavigate,
}) {
  const [hoveredId, setHoveredId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const logoCircleRef = useRef(null);
  const lastScrollYRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();
  const highlightedId = hoveredId ?? activeId;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const previousScrollY = lastScrollYRef.current;
      const scrollDelta = currentScrollY - previousScrollY;
      const isNearTop = currentScrollY <= 24;

      setScrolled(!isNearTop);

      if (isNearTop) {
        setHeaderHidden(false);
      } else if (scrollDelta > 8) {
        setHeaderHidden(true);
      } else if (scrollDelta < -8) {
        setHeaderHidden(false);
      }

      lastScrollYRef.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      setHeaderHidden(false);
    }
  }, [menuOpen]);

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

  useEffect(() => {
    if (typeof window === 'undefined' || !logoCircleRef.current || prefersReducedMotion) {
      return undefined;
    }

    const logoNode = logoCircleRef.current;
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    let isCancelled = false;
    let gsapModule;

    const resetLogo = () => {
      if (!gsapModule) {
        return;
      }

      gsapModule.to(logoNode, {
        x: 0,
        y: 0,
        duration: 0.95,
        ease: 'elastic.out(1, 0.45)',
        overwrite: 'auto',
      });
    };

    const handlePointerMove = (event) => {
      if (!mediaQuery.matches || !gsapModule) {
        resetLogo();
        return;
      }

      const bounds = logoNode.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance > LOGO_MAGNET_RADIUS) {
        resetLogo();
        return;
      }

      const falloff = 1 - distance / LOGO_MAGNET_RADIUS;
      const targetX = Math.max(
        -LOGO_MAGNET_STRENGTH,
        Math.min(LOGO_MAGNET_STRENGTH, (deltaX / LOGO_MAGNET_RADIUS) * LOGO_MAGNET_STRENGTH * (0.72 + falloff))
      );
      const targetY = Math.max(
        -LOGO_MAGNET_STRENGTH,
        Math.min(LOGO_MAGNET_STRENGTH, (deltaY / LOGO_MAGNET_RADIUS) * LOGO_MAGNET_STRENGTH * (0.72 + falloff))
      );

      gsapModule.to(logoNode, {
        x: targetX,
        y: targetY,
        duration: 0.32,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    };

    const handleMediaChange = () => {
      if (!mediaQuery.matches) {
        resetLogo();
      }
    };

    const enableMagnet = async () => {
      const { default: gsap } = await import('gsap');

      if (isCancelled) {
        return;
      }

      gsapModule = gsap;
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
      window.addEventListener('blur', resetLogo);
      document.documentElement.addEventListener('mouseleave', resetLogo);

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleMediaChange);
      } else {
        mediaQuery.addListener(handleMediaChange);
      }
    };

    void enableMagnet();

    return () => {
      isCancelled = true;
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('blur', resetLogo);
      document.documentElement.removeEventListener('mouseleave', resetLogo);
      if (mediaQuery.addEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange);
      } else {
        mediaQuery.removeListener(handleMediaChange);
      }
      gsapModule?.killTweensOf(logoNode);
      gsapModule?.set(logoNode, { x: 0, y: 0 });
    };
  }, [prefersReducedMotion]);

  const handleNavigate = useCallback((id) => {
    onNavigate?.(id);
    setHoveredId(null);
    setMenuOpen(false);
  }, [onNavigate]);

  return (
    <Motion.header
      className="sticky top-0 z-50 pt-2.5 sm:pt-5"
      animate={{
        y: headerHidden && !menuOpen ? '-115%' : '0%',
      }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.34, ease: [0.22, 1, 0.36, 1] }
      }
    >
      <div className="section-shell relative">
        <Motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: scrolled ? 0.996 : 1,
            backdropFilter: scrolled ? 'blur(24px)' : 'blur(16px)',
          }}
          transition={{ duration: 0.38, ease: MOTION_EASE }}
          className={`nav-glass relative flex items-center justify-between gap-2.5 overflow-hidden rounded-[1.55rem] px-2.5 py-2.5 transition-all duration-300 sm:gap-4 sm:rounded-[2rem] sm:px-5 sm:py-3.5 ${
            scrolled ? 'shadow-[var(--theme-shadow-lg)] backdrop-blur-xl' : ''
          }`}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent" />
          <div className="pointer-events-none absolute -left-10 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full bg-accent/10 blur-2xl" />

          <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-4">
            <a
              href="#hero"
              onClick={(event) => {
                event.preventDefault();
                handleNavigate('hero');
              }}
              className="group flex min-w-0 items-center gap-2.5 rounded-[1.15rem] border border-border/60 bg-background/50 px-2.5 py-2 sm:gap-3.5 sm:px-3"
            >
              <span
                ref={logoCircleRef}
                className="logo-circle flex h-10 w-10 shrink-0 items-center justify-center rounded-[1rem] bg-foreground text-sm font-bold tracking-[0.18em] text-background transition-transform duration-300 group-hover:scale-[1.02] sm:h-11 sm:w-11"
              >
                {profile.initials}
              </span>
              <span className="min-w-0 max-[420px]:hidden">
                <span className="block truncate font-display text-sm font-bold uppercase tracking-[0.2em] text-foreground">
                  {profile.name}
                </span>
                <span className="hidden truncate text-[0.82rem] text-foreground-muted 2xl:block">
                  {profile.secondaryRole}
                </span>
              </span>
            </a>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-border/60 bg-background/46 p-1.5 sm:gap-3">
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
              className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-background/70 px-3 text-foreground sm:h-11 sm:px-4"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              aria-controls="site-navigation-panel"
            >
              <span className="hidden text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-foreground-muted sm:inline">
                {menuOpen ? 'Close' : 'Menu'}
              </span>
              <span className="flex flex-col items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
              </span>
            </Motion.button>
          </div>
        </Motion.div>

        <AnimatePresence initial={false}>
          {menuOpen ? (
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.22, ease: [0.22, 1, 0.36, 1] }
              }
              className="fixed inset-0 z-[60] flex items-center justify-center bg-[color:color-mix(in_srgb,var(--theme-accent)_22%,rgba(7,16,48,0.18))] px-4 py-6 backdrop-blur-[18px] sm:px-6"
              onClick={() => {
                setHoveredId(null);
                setMenuOpen(false);
              }}
            >
              <Motion.div
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 26, scale: 0.94 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 18, scale: 0.97 }
                }
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
                }
                className="nav-glass w-full max-w-[42rem] max-h-[min(82svh,44rem)] overflow-y-auto rounded-[1.8rem] p-3 shadow-[var(--theme-shadow-lg)] sm:rounded-[2.2rem] sm:p-4 lg:p-5"
                id="site-navigation-panel"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="mb-3 flex items-center justify-between rounded-[1.2rem] border border-border/60 bg-background/46 px-4 py-3">
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                      Navigation
                    </p>
                    <p className="mt-1 text-sm font-semibold text-foreground">{profile.name}</p>
                  </div>

                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => {
                        setHoveredId(null);
                        setMenuOpen(false);
                      }}
                      className="inline-flex items-center justify-center rounded-full border border-border bg-background/72 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-foreground transition-colors duration-300 hover:border-accent/28 hover:text-accent"
                    >
                      Close
                    </button>
                  </div>
                </div>

                <nav
                  className="grid gap-2 sm:grid-cols-2"
                  onPointerLeave={() => setHoveredId(null)}
                >
                  {navigation.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(event) => {
                        event.preventDefault();
                        handleNavigate(item.id);
                      }}
                      onPointerEnter={() => setHoveredId(item.id)}
                      onFocus={() => setHoveredId(item.id)}
                      onBlur={() => setHoveredId(null)}
                      aria-current={activeId === item.id ? 'page' : undefined}
                      className={`relative isolate rounded-[1.15rem] px-4 py-3 text-sm font-semibold transition-colors duration-300 ${
                        highlightedId === item.id
                          ? 'text-accent-foreground'
                          : 'border border-border/60 bg-background/50 text-foreground'
                      }`}
                    >
                      {highlightedId === item.id ? (
                        <Motion.div
                          layoutId="mobile-nav-highlight"
                          className="absolute inset-0 -z-10 rounded-[1.15rem] border border-accent/26 bg-accent"
                          transition={{
                            type: 'spring',
                            stiffness: 420,
                            damping: 34,
                            mass: 0.5,
                          }}
                        >
                          <span className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                        </Motion.div>
                      ) : null}

                      <span className="relative z-10">{item.label}</span>
                    </a>
                  ))}

                  <Magnetic>
                    <button
                      type="button"
                      onClick={() => {
                        setHoveredId(null);
                        setMenuOpen(false);
                        onOpenResume();
                      }}
                      className="button-primary mt-2 sm:col-span-2"
                    >
                      View Resume
                    </button>
                  </Magnetic>
                </nav>
              </Motion.div>
            </Motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </Motion.header>
  );
}
