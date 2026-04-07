import { motion as Motion } from 'framer-motion';
import Magnetic from './Magnetic';
import { createStaggerContainer, createStaggerItem, MOTION_EASE } from './motion';

const heroContainer = createStaggerContainer(0.08, 0.08);
const heroItem = createStaggerItem(26, 0.72);
const heroPreviewContainer = createStaggerContainer(0.1, 0.14);
const heroPreviewItem = createStaggerItem(20, 0.6);

export default function HeroSection({ profile, hero }) {
  const [firstName, ...rest] = profile.name.split(' ');

  return (
    <section id="hero" className="relative overflow-hidden pt-12">
      <div className="section-shell section-space pb-24 sm:pb-28">
        <div className="hero-grid-glow pointer-events-none absolute inset-x-0 top-10 h-[32rem]" />

        <div className="relative grid items-end gap-14 xl:grid-cols-[1.02fr_0.98fr]">
          <Motion.div
            initial="hidden"
            animate="show"
            variants={heroContainer}
            className="max-w-[42rem]"
          >
            <Motion.div variants={heroItem}>
              <div className="flex flex-wrap items-center gap-3">
                <span className="eyebrow">{hero.eyebrow}</span>
                <span className="hero-chip hero-chip--muted">
                  {profile.secondaryRole}
                </span>
              </div>
            </Motion.div>

            <Motion.div variants={heroItem}>
              <h1 className="mt-8 text-[clamp(5.15rem,13vw,12rem)] font-bold uppercase leading-[0.76] tracking-[-0.12em] text-foreground">
                <span className="block">{firstName}</span>
                <span className="block text-accent drop-shadow-[0_0_28px_color-mix(in_srgb,var(--theme-accent)_18%,transparent)]">
                  {rest.join(' ')}
                </span>
              </h1>
            </Motion.div>

            <Motion.div variants={heroItem}>
              <p className="mt-10 max-w-[31rem] text-[clamp(2.3rem,4.4vw,3.25rem)] leading-[1.12] text-foreground">
                {hero.subtitle}
              </p>
            </Motion.div>

            <Motion.div variants={heroItem}>
              <p className="mt-8 max-w-[34rem] text-[1.04rem] leading-[1.95] text-foreground-muted sm:text-[1.1rem]">
                {hero.description}
              </p>
            </Motion.div>

            <Motion.div variants={heroItem}>
              <div className="mt-10 flex flex-wrap gap-3.5">
                <Magnetic>
                  <a href="#projects" className="button-primary">
                    View Projects <span aria-hidden="true">/</span>
                  </a>
                </Magnetic>
                <Magnetic strength={8}>
                  <a href="#contact" className="button-secondary">
                    Contact Me <span aria-hidden="true">/</span>
                  </a>
                </Magnetic>
              </div>
            </Motion.div>

            <Motion.div variants={heroItem}>
              <div className="mt-11 flex flex-wrap gap-3">
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
            className="lg:justify-self-end"
          >
            <Motion.div
              variants={heroPreviewItem}
              className="hero-command-shell surface-panel-strong interactive-outline relative overflow-hidden rounded-[2.55rem] p-6 sm:p-8 lg:p-9"
            >
              <div className="absolute left-7 top-7 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_18px_var(--theme-accent)]" />
                <span className="text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-foreground-muted">
                  Secure systems profile
                </span>
              </div>

              <div className="absolute right-6 top-6 h-32 w-32 rounded-full border border-border" />
              <div className="absolute right-10 top-10 h-24 w-24 rounded-full border border-accent/40" />
              <div className="absolute left-0 top-20 h-px w-full bg-gradient-to-r from-transparent via-accent/35 to-transparent" />

              <Motion.div variants={heroPreviewItem} className="mt-9 grid gap-6 sm:grid-cols-[0.72fr_1fr]">
                <div className="relative overflow-hidden rounded-[1.85rem] border border-border bg-background/70 p-3 backdrop-blur">
                  <div className="overflow-hidden rounded-[1.25rem]">
                    <img
                      src={profile.profileImage}
                      alt={profile.name}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover"
                    />
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
                    <p className="mt-5 max-w-[14ch] text-[2.15rem] font-bold leading-[0.95] tracking-[-0.055em] text-foreground sm:text-[2.4rem]">
                      Engineering interfaces that feel polished, trustworthy, and resilient under real constraints.
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] border border-border bg-background/72 p-4 backdrop-blur">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-foreground-muted">
                      Profile
                    </p>
                    <p className="mt-2 text-sm leading-6 text-foreground">{profile.role}</p>
                  </div>
                </div>
              </Motion.div>

              <Motion.div variants={createStaggerContainer(0.08, 0.16)} className="mt-6 grid gap-4">
                {hero.callouts.map((callout) => (
                  <Motion.div
                    key={callout.label}
                    variants={createStaggerItem(16, 0.52)}
                    whileHover={{ y: -4, scale: 1.015 }}
                    transition={{ duration: 0.28, ease: MOTION_EASE }}
                    className="hero-callout rounded-[1.5rem] border border-border bg-background/65 p-4 backdrop-blur"
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                      {callout.label}
                    </span>
                    <p className="mt-2 text-sm leading-6 text-foreground">{callout.value}</p>
                  </Motion.div>
                ))}
              </Motion.div>
            </Motion.div>
          </Motion.div>
        </div>
      </div>
    </section>
  );
}
