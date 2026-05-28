import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { motion as Motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';
import Magnetic from './Magnetic';
import { createStaggerContainer, createStaggerItem, MOTION_EASE } from './motion';

const heroIntroContainer = createStaggerContainer(0.09, 0.06);
const heroLeadItem = createStaggerItem(28, 0.62);
const heroSupportContainer = createStaggerContainer(0.08, 0.02);
const heroSupportItem = createStaggerItem(24, 0.58);
const heroPreviewContainer = createStaggerContainer(0.08, 0.22);
const heroPreviewItem = createStaggerItem(24, 0.6);
const SCRAMBLE_CHARS = ['0', '1', '@', '#', '$', '%', '*'];
const HERO_PIN_TOP_OFFSET = 112;
const HERO_EFFECTS_QUERY = '(min-width: 1100px) and (min-height: 760px)';

function createSeedLine(target, seed) {
  return Array.from({ length: target.length }, (_, index) => seed[index % seed.length]).join('');
}

function getScrambleChar(index, frame) {
  return SCRAMBLE_CHARS[(frame + index * 3) % SCRAMBLE_CHARS.length];
}

function buildScrambleLine(target, progress) {
  const effectiveLength = target.replace(/\s/g, '').length || 1;
  const frame = Math.floor(progress * 72);
  let revealedCount = 0;

  return target
    .split('')
    .map((character, index) => {
      if (character === ' ') {
        return ' ';
      }

      const revealThreshold = revealedCount / effectiveLength;
      const localProgress = Math.max(0, Math.min(1, (progress - revealThreshold) * effectiveLength * 1.14));
      revealedCount += 1;

      if (localProgress >= 1) {
        return character;
      }

      if (localProgress > 0.72) {
        return frame % 3 === 0 ? character : getScrambleChar(index, frame);
      }

      return getScrambleChar(index, frame);
    })
    .join('');
}

function setLineText(node, value) {
  if (node) {
    node.textContent = value;
  }
}

function HeroSection({ profile, hero, keyHighlights, onOpenResume, enableEnhancedEffects = true }) {
  const sectionRef = useRef(null);
  const lineRefs = useRef([]);
  const reduceMotion = useReducedMotion();
  const [enableScrollEffects, setEnableScrollEffects] = useState(false);
  const visibleBadges = useMemo(() => hero.badges.slice(0, 3), [hero.badges]);
  const visibleCallouts = useMemo(() => hero.callouts.slice(0, 3), [hero.callouts]);
  const heroMetrics = useMemo(() => keyHighlights?.items?.slice(0, 3) ?? [], [keyHighlights]);
  const showFloatingMetrics = heroMetrics.length >= 2;
  const heroLines = useMemo(() => {
    const [firstName, ...remainingNames] = profile.name.split(' ');
    return [firstName, remainingNames.join(' ')];
  }, [profile.name]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const effectsQuery = window.matchMedia(HERO_EFFECTS_QUERY);
    const updateEnabled = () => {
      setEnableScrollEffects(effectsQuery.matches && !reduceMotion && enableEnhancedEffects);
    };

    updateEnabled();

    if (effectsQuery.addEventListener) {
      effectsQuery.addEventListener('change', updateEnabled);
      return () => effectsQuery.removeEventListener('change', updateEnabled);
    }

    effectsQuery.addListener(updateEnabled);
    return () => effectsQuery.removeListener(updateEnabled);
  }, [enableEnhancedEffects, reduceMotion]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const previewY = useTransform(scrollYProgress, [0, 1], [0, -36]);
  const previewScale = useTransform(scrollYProgress, [0, 1], [1, 0.985]);

  useEffect(() => {
    const [lineOneNode, lineTwoNode] = lineRefs.current;

    if (!sectionRef.current || !lineOneNode || !lineTwoNode) {
      return undefined;
    }

    const finalLines = heroLines;
    setLineText(lineOneNode, finalLines[0]);
    setLineText(lineTwoNode, finalLines[1]);

    if (!enableScrollEffects) {
      return undefined;
    }

    const seedLines = [createSeedLine(finalLines[0], 'DEV01'), createSeedLine(finalLines[1], 'CYB#01$')];
    const lineStates = [{ progress: 0 }, { progress: 0 }];
    const renderLine = (node, target, progress) => {
      setLineText(node, buildScrambleLine(target, progress));
    };

    let isCancelled = false;
    let context;

    const loadHeroTimeline = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);

      if (isCancelled) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      setLineText(lineOneNode, seedLines[0]);
      setLineText(lineTwoNode, seedLines[1]);

      context = gsap.context(() => {
        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `top top+=${HERO_PIN_TOP_OFFSET}`,
            end: '+=300',
            scrub: 0.6,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(
            lineStates[0],
            {
              progress: 1,
              duration: 0.5,
              onUpdate: () => renderLine(lineOneNode, finalLines[0], lineStates[0].progress),
            },
            0
          )
          .to(
            lineStates[1],
            {
              progress: 1,
              duration: 0.58,
              onUpdate: () => renderLine(lineTwoNode, finalLines[1], lineStates[1].progress),
            },
            0.18
          );
      }, sectionRef);
    };

    void loadHeroTimeline();

    return () => {
      isCancelled = true;
      context?.revert();
    };
  }, [enableScrollEffects, heroLines]);

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-[100svh] overflow-x-hidden pt-2 sm:pt-4">
      <div className="section-shell flex min-h-[calc(100svh-1rem)] items-center pt-8 pb-20 sm:pt-10 sm:pb-24 lg:min-h-[calc(100svh-2.5rem)] lg:pt-12">
        <Motion.div
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 0.78, scale: 1 }}
          transition={{ duration: 0.66, ease: MOTION_EASE }}
          style={enableScrollEffects ? { y: glowY } : { y: 0 }}
          className="hero-grid-glow hero-grid-glow--animated pointer-events-none absolute inset-x-0 top-6 h-[24rem] sm:top-10 sm:h-[32rem]"
        />

        <div className="relative grid w-full items-start gap-8 sm:gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          <Motion.div
            initial="hidden"
            animate="show"
            variants={heroIntroContainer}
            className="min-w-0 max-w-[42rem]"
          >
            <Motion.div variants={heroLeadItem}>
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <span className="eyebrow">{hero.eyebrow}</span>
                <span className="hero-chip hero-chip--muted">
                  {profile.secondaryRole}
                </span>
              </div>
            </Motion.div>

            <Motion.div variants={heroLeadItem}>
              <h1
                aria-label={profile.name}
                className="mt-6 text-[clamp(3.35rem,18vw,9.35rem)] font-bold leading-[0.9] tracking-[-0.065em] text-foreground sm:mt-8"
              >
                <span className="sr-only">{profile.name}</span>
                {heroLines.map((line, index) => (
                  <span
                    key={line}
                    className={`hero-scramble-line relative block overflow-hidden pb-[0.08em] ${
                      index === 1
                        ? 'text-accent drop-shadow-[0_0_28px_color-mix(in_srgb,var(--theme-accent)_18%,transparent)]'
                        : 'text-foreground'
                    }`}
                    aria-hidden="true"
                  >
                    <span className="hero-scramble-sizer block select-none opacity-0">{line}</span>
                    <span
                      ref={(node) => {
                        lineRefs.current[index] = node;
                      }}
                      className="hero-scramble-overlay absolute inset-0 block whitespace-nowrap"
                    >
                      {line}
                    </span>
                  </span>
                ))}
              </h1>
            </Motion.div>

            <Motion.div variants={heroLeadItem} className="mt-8 sm:mt-10">
              <Motion.div variants={heroSupportContainer} initial="hidden" animate="show">
                <Motion.p variants={heroSupportItem} className="max-w-[38rem] text-[clamp(1.3rem,6vw,2.55rem)] font-semibold leading-[1.14] text-foreground">
                  {hero.subtitle}
                </Motion.p>

                <Motion.p variants={heroSupportItem} className="mt-6 max-w-[32rem] text-[0.98rem] leading-[1.76] text-foreground-muted sm:mt-7 sm:text-[1.05rem]">
                  {hero.description}
                </Motion.p>

                <Motion.div variants={heroSupportItem} className="mt-8">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between xl:gap-5">
                    <div className="surface-panel flex w-full max-w-[34rem] flex-wrap items-center gap-2.5 rounded-[1.2rem] px-4 py-3 sm:gap-3 sm:rounded-[1.35rem] sm:px-5 sm:py-3.5">
                      <span className="eyebrow !mb-0">
                        Why me
                      </span>
                      <p className="text-sm font-medium leading-6 text-foreground sm:text-[0.95rem]">
                        {hero.whyMe}
                      </p>
                    </div>

                    <div className="flex w-full flex-col gap-3.5 xl:w-auto xl:items-end">
                      {visibleBadges.length ? (
                        <div className="flex flex-wrap gap-2.5 sm:gap-3 xl:justify-end">
                          {visibleBadges.map((badge) => (
                            <span key={badge} className="hero-chip hero-chip--muted">
                              {badge}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </Motion.div>
              </Motion.div>
            </Motion.div>
          </Motion.div>

          <Motion.div
            initial="hidden"
            animate="show"
            variants={heroPreviewContainer}
            className="w-full max-xl:mx-auto max-xl:max-w-[40rem] xl:-mt-2 xl:justify-self-end"
          >
            <Motion.div style={enableScrollEffects ? { y: previewY, scale: previewScale } : { y: 0, scale: 1 }}>
              <div
                className={`hero-preview-cluster relative ${
                  showFloatingMetrics
                    ? 'xl:-ml-[10.5rem] xl:w-[calc(100%+10.5rem)] xl:pl-[10.5rem] 2xl:-ml-[11rem] 2xl:w-[calc(100%+11rem)] 2xl:pl-[11rem]'
                    : ''
                }`}
              >
                {showFloatingMetrics ? (
                  <div className="pointer-events-none absolute left-0 top-16 z-20 hidden w-36 gap-3 xl:grid">
                    {heroMetrics.slice(0, 2).map((metric, index) => (
                      <Motion.div
                        key={metric.label}
                        animate={reduceMotion ? undefined : { y: [0, index === 0 ? -8 : 6, 0] }}
                        transition={
                          reduceMotion
                            ? undefined
                            : {
                                duration: 5.6 + index * 0.8,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }
                        }
                        className="hero-floating-chip surface-panel border border-border/80 px-4 py-3 shadow-[var(--theme-shadow)]"
                      >
                        <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                          {metric.label}
                        </span>
                        <AnimatedCounter
                          value={metric.value}
                          className="mt-2 block text-[1.6rem] font-bold leading-none tracking-[-0.08em] text-foreground"
                        />
                      </Motion.div>
                    ))}
                  </div>
                ) : null}

                <Motion.div
                  variants={heroPreviewItem}
                  className="hero-command-shell surface-panel-strong interactive-outline relative overflow-hidden rounded-[1.8rem] p-4 sm:rounded-[2.55rem] sm:p-8 lg:p-9"
                >
                <div className="absolute left-5 top-5 flex items-center gap-2 sm:left-7 sm:top-7">
                  <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_18px_var(--theme-accent)]" />
                  <span className="text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-foreground-muted">
                    Secure systems profile
                  </span>
                </div>

                <div className="absolute right-6 top-6 hidden h-32 w-32 rounded-full border border-border sm:block" />
                <div className="absolute right-10 top-10 hidden h-24 w-24 rounded-full border border-accent/40 sm:block" />
                <div className="absolute left-0 top-16 h-px w-full bg-gradient-to-r from-transparent via-accent/35 to-transparent sm:top-20" />

                <Motion.div variants={heroPreviewItem} className="mt-8 grid gap-5 md:mt-9 md:grid-cols-[0.72fr_1fr] md:gap-6">
                  <div className="bento-card relative overflow-hidden rounded-[1.45rem] border border-border bg-background/70 p-3 backdrop-blur sm:rounded-[1.85rem]">
                    <div className="overflow-hidden rounded-[1.1rem] sm:rounded-[1.25rem]">
                      <picture>
                        <source srcSet={profile.profileImageAvif} type="image/avif" />
                        <source srcSet={profile.profileImage} type="image/webp" />
                        <img
                          src={profile.profileImageFallback}
                          alt={profile.name}
                          width="960"
                          height="720"
                          loading="eager"
                          decoding="async"
                          fetchPriority="high"
                          sizes="(min-width: 1024px) 28vw, (min-width: 768px) 38vw, 88vw"
                          className="aspect-[4/5] w-full object-cover"
                        />
                      </picture>
                    </div>
                    <div className="mt-3 rounded-[1rem] border border-border bg-background/72 px-3 py-3">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-foreground-muted">
                        Location
                      </p>
                      <p className="mt-2 text-sm font-semibold text-foreground">{profile.location}</p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between gap-4">
                    <div className="bento-card rounded-[1.35rem] border border-border bg-background/72 p-4 backdrop-blur sm:rounded-[1.5rem] sm:p-5">
                      <span className="eyebrow">Current Snapshot</span>
                      <p className="mt-4 max-w-[15ch] text-[1.65rem] font-bold leading-[1] tracking-[-0.045em] text-foreground sm:mt-5 sm:text-[2.2rem]">
                        Building secure digital products with frontend precision and systems awareness.
                      </p>
                    </div>

                    <div className="bento-card rounded-[1.35rem] border border-border bg-background/72 p-4 backdrop-blur sm:rounded-[1.5rem]">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-foreground-muted">
                        Profile
                      </p>
                      <p className="mt-2 text-sm leading-6 text-foreground">{profile.role}</p>
                    </div>
                  </div>
                </Motion.div>

                <Motion.div variants={createStaggerContainer(0.08, 0.16)} className="mt-5 grid gap-3.5 sm:mt-6 sm:gap-4">
                  {visibleCallouts.map((callout) => (
                    <Motion.div
                      key={callout.label}
                      variants={createStaggerItem(20, 0.58)}
                      whileHover={{ y: -2, scale: 1.006 }}
                      transition={{ duration: 0.24, ease: MOTION_EASE }}
                      className="bento-card hero-callout rounded-[1.3rem] border border-border bg-background/65 p-4 backdrop-blur sm:rounded-[1.5rem]"
                    >
                      <span className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                        {callout.label}
                      </span>
                      <p className="mt-2 text-sm leading-[1.75] text-foreground">{callout.value}</p>
                    </Motion.div>
                  ))}
                </Motion.div>
                {heroMetrics.length ? (
                  <Motion.div
                    variants={heroPreviewItem}
                    className="hero-proof-grid mt-5 grid gap-3 sm:mt-6 sm:grid-cols-3"
                  >
                    {heroMetrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="hero-stat-card rounded-[1.25rem] border border-border/70 px-4 py-3.5"
                      >
                        <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                          {metric.label}
                        </span>
                        <AnimatedCounter
                          value={metric.value}
                          className="mt-3 block text-[1.85rem] font-bold leading-none tracking-[-0.07em] text-foreground"
                        />
                      </div>
                    ))}
                  </Motion.div>
                ) : null}
                </Motion.div>
              </div>
            </Motion.div>
          </Motion.div>
        </div>
      </div>
    </section>
  );
}

export default memo(HeroSection);
