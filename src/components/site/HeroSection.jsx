import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { motion as Motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Magnetic from './Magnetic';
import { createStaggerContainer, createStaggerItem, MOTION_EASE } from './motion';
import TextReveal from './TextReveal';

const heroIntroContainer = createStaggerContainer(0.09, 0.06);
const heroLeadItem = createStaggerItem(28, 0.62);
const heroSupportContainer = createStaggerContainer(0.08, 0.02);
const heroSupportItem = createStaggerItem(24, 0.58);
const heroPreviewContainer = createStaggerContainer(0.08, 0.22);
const heroPreviewItem = createStaggerItem(24, 0.6);

function HeroSection({ profile, hero, onOpenResume }) {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [enableScrollEffects, setEnableScrollEffects] = useState(false);
  const heroLines = useMemo(() => {
    const [firstName, ...remainingNames] = profile.name.split(' ');
    return [firstName, remainingNames.join(' ')];
  }, [profile.name]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const updateEnabled = () => setEnableScrollEffects(mediaQuery.matches && !reduceMotion);

    updateEnabled();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateEnabled);
      return () => mediaQuery.removeEventListener('change', updateEnabled);
    }

    mediaQuery.addListener(updateEnabled);
    return () => mediaQuery.removeListener(updateEnabled);
  }, [reduceMotion]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const previewY = useTransform(scrollYProgress, [0, 1], [0, -36]);
  const previewScale = useTransform(scrollYProgress, [0, 1], [1, 0.985]);

  return (
    <section id="hero" ref={sectionRef} className="relative overflow-hidden pt-8 sm:pt-12">
      <div className="section-shell section-space pb-20 sm:pb-28">
        <Motion.div
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 0.78, scale: 1 }}
          transition={{ duration: 0.66, ease: MOTION_EASE }}
          style={enableScrollEffects ? { y: glowY } : { y: 0 }}
          className="hero-grid-glow hero-grid-glow--animated pointer-events-none absolute inset-x-0 top-6 h-[24rem] sm:top-10 sm:h-[32rem]"
        />

        <div className="relative grid items-end gap-10 sm:gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
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
              <TextReveal
                as="h1"
                items={heroLines}
                split="lines"
                stagger={0.08}
                delayChildren={0.02}
                className="mt-6 text-[clamp(3.35rem,18vw,9.35rem)] font-bold leading-[0.9] tracking-[-0.065em] text-foreground sm:mt-8"
                renderItem={({ item, index, key, variants }) => (
                  <span key={key} className="block overflow-hidden pb-[0.08em]">
                    <Motion.span
                      variants={variants}
                      className={`block ${
                        index === 1
                          ? 'text-accent drop-shadow-[0_0_28px_color-mix(in_srgb,var(--theme-accent)_18%,transparent)]'
                          : ''
                      }`}
                    >
                      {item}
                    </Motion.span>
                  </span>
                )}
              />
            </Motion.div>

            <Motion.div variants={heroLeadItem} className="mt-8 sm:mt-10">
              <Motion.div variants={heroSupportContainer} initial="hidden" animate="show">
                <Motion.p variants={heroSupportItem} className="max-w-[30rem] text-[clamp(1.45rem,8vw,2.8rem)] font-semibold leading-[1.14] text-foreground">
                  {hero.subtitle}
                </Motion.p>

                <Motion.p variants={heroSupportItem} className="mt-6 max-w-[32rem] text-[0.98rem] leading-[1.76] text-foreground-muted sm:mt-7 sm:text-[1.05rem]">
                  {hero.description}
                </Motion.p>

                <Motion.div variants={heroSupportItem} className="mt-8 max-w-[34rem]">
                  <div className="surface-panel flex w-full flex-wrap items-center gap-2.5 rounded-[1.2rem] px-4 py-3 sm:inline-flex sm:w-auto sm:gap-3 sm:rounded-[1.35rem] sm:px-5 sm:py-3.5">
                    <span className="eyebrow !mb-0">
                      Why me
                    </span>
                    <p className="text-sm font-medium leading-6 text-foreground sm:text-[0.95rem]">
                      {hero.whyMe}
                    </p>
                  </div>
                </Motion.div>
              </Motion.div>
            </Motion.div>

            <Motion.div variants={heroLeadItem}>
              <div className="mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-3.5">
                <Magnetic>
                  <a href={`mailto:${profile.email}`} className="button-primary hero-primary-cta">
                    Hire Me <span aria-hidden="true">/</span>
                  </a>
                </Magnetic>
                <Magnetic strength={8}>
                  <button type="button" onClick={onOpenResume} className="button-secondary">
                    View Resume <span aria-hidden="true">/</span>
                  </button>
                </Magnetic>
                <Magnetic strength={7}>
                  <a href="#contact" className="button-secondary">
                    Contact <span aria-hidden="true">/</span>
                  </a>
                </Magnetic>
              </div>
            </Motion.div>

            <Motion.div variants={heroSupportItem}>
              <div className="mt-9 flex flex-wrap gap-2.5 sm:mt-11 sm:gap-3">
                {hero.badges.map((badge) => (
                  <span key={badge} className="hero-chip hero-chip--muted">
                    {badge}
                  </span>
                ))}
              </div>
            </Motion.div>
          </Motion.div>

          <Motion.div
            initial="hidden"
            animate="show"
            variants={heroPreviewContainer}
              className="w-full lg:justify-self-end"
            >
              <Motion.div style={enableScrollEffects ? { y: previewY, scale: previewScale } : { y: 0, scale: 1 }}>
                <Motion.div
                  variants={heroPreviewItem}
                  className="hero-command-shell surface-panel-strong interactive-outline relative overflow-hidden rounded-[2rem] p-5 sm:rounded-[2.55rem] sm:p-8 lg:p-9"
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
                  <div className="relative overflow-hidden rounded-[1.45rem] border border-border bg-background/70 p-3 backdrop-blur sm:rounded-[1.85rem]">
                    <div className="overflow-hidden rounded-[1.1rem] sm:rounded-[1.25rem]">
                      <picture>
                        <source srcSet={profile.profileImageAvif} type="image/avif" />
                        <source srcSet={profile.profileImage} type="image/webp" />
                        <img
                          src={profile.profileImageFallback}
                          alt={profile.name}
                          width="960"
                          height="720"
                          decoding="async"
                          fetchPriority="high"
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
                    <div>
                      <span className="eyebrow">Current Snapshot</span>
                      <p className="mt-4 max-w-[15ch] text-[1.65rem] font-bold leading-[1] tracking-[-0.045em] text-foreground sm:mt-5 sm:text-[2.2rem]">
                        Building secure digital products with frontend precision and systems awareness.
                      </p>
                    </div>

                    <div className="rounded-[1.35rem] border border-border bg-background/72 p-4 backdrop-blur sm:rounded-[1.5rem]">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-foreground-muted">
                        Profile
                      </p>
                      <p className="mt-2 text-sm leading-6 text-foreground">{profile.role}</p>
                    </div>
                  </div>
                </Motion.div>

                <Motion.div variants={createStaggerContainer(0.08, 0.16)} className="mt-5 grid gap-3.5 sm:mt-6 sm:gap-4">
                  {hero.callouts.map((callout) => (
                    <Motion.div
                      key={callout.label}
                      variants={createStaggerItem(20, 0.58)}
                      whileHover={{ y: -2, scale: 1.006 }}
                      transition={{ duration: 0.24, ease: MOTION_EASE }}
                      className="hero-callout rounded-[1.3rem] border border-border bg-background/65 p-4 backdrop-blur sm:rounded-[1.5rem]"
                    >
                      <span className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                        {callout.label}
                      </span>
                      <p className="mt-2 text-sm leading-[1.75] text-foreground">{callout.value}</p>
                    </Motion.div>
                  ))}
                </Motion.div>
              </Motion.div>
            </Motion.div>
          </Motion.div>
        </div>
      </div>
    </section>
  );
}

export default memo(HeroSection);
