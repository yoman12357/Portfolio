import { lazy, memo, Suspense, useRef } from 'react';
import { motion as Motion, useInView } from 'framer-motion';
import Reveal from './Reveal';
import Magnetic from './Magnetic';
import TextReveal from './TextReveal';

const ContactOrbitalScene = lazy(() => import('./contact3d/ContactOrbitalScene'));

function SceneFallback() {
  return (
    <div
      className="contact-scene-canvas"
      style={{
        background:
          'radial-gradient(circle at top, color-mix(in srgb, var(--theme-accent) 16%, transparent), transparent 34%), linear-gradient(155deg, #040b18 0%, #071122 46%, #09172f 100%)',
        boxShadow: '0 28px 72px color-mix(in srgb, var(--theme-accent) 12%, transparent)',
      }}
    >
      <div className="pointer-events-none absolute inset-x-[9%] top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent" />
      <div className="pointer-events-none absolute left-6 top-6 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-white/72 backdrop-blur">
        3D Tech Orbit
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Motion.div
          animate={{ scale: [0.96, 1.03, 0.98], rotate: [0, 8, -6, 0] }}
          transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
          className="relative h-44 w-44 rounded-full sm:h-52 sm:w-52"
          style={{
            background:
              'radial-gradient(circle at 30% 28%, color-mix(in srgb, var(--theme-accent) 44%, #ffffff 18%), color-mix(in srgb, var(--theme-accent) 18%, #071122) 28%, #040915 72%, #020617 100%)',
            boxShadow:
              '0 28px 70px color-mix(in srgb, var(--theme-accent) 18%, transparent), inset 0 10px 20px rgba(255,255,255,0.12), inset 0 -24px 44px rgba(2,6,23,0.84)',
          }}
        >
          <div className="absolute inset-[9%] rounded-full border border-white/10" />
          <div className="absolute inset-[18%] rounded-full border border-accent/20" />
          <div className="absolute inset-[-18%] rounded-full border border-accent/15" />
        </Motion.div>
      </div>
    </div>
  );
}

function ContactSection({ contact, onOpenResume, enableOrbitalScene = true }) {
  const sceneRef = useRef(null);
  const sceneInView = useInView(sceneRef, { once: true, amount: 0.2 });
  const emailLink = contact.links.find((link) => link.label === 'Email');
  const resumeLink = contact.links.find((link) => link.label === 'Resume');
  const prioritizedLinks = [
    emailLink,
    contact.links.find((link) => link.label === 'LinkedIn'),
    contact.links.find((link) => link.label === 'GitHub'),
    resumeLink,
  ].filter(Boolean);

  return (
    <section id="contact" className="section-space pb-24 sm:pb-28">
      <div className="section-shell">
        <Reveal className="surface-panel-strong contact-shell">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-transparent via-accent/15 to-transparent" />
          <div className="pointer-events-none absolute -left-14 top-12 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 bottom-0 h-52 w-52 rounded-full bg-accent/12 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-accent/35 to-transparent" />

          <div className="contact-layout">
            <Reveal
              className="contact-copy"
              delay={0.06}
              staggerChildren={0.08}
              delayChildren={0.03}
              distance={18}
              duration={0.46}
            >
              <Reveal.Item>
                <span className="eyebrow">{contact.label}</span>
              </Reveal.Item>

              <Reveal.Item>
                <TextReveal
                  as="h2"
                  text={contact.title}
                  split="words"
                  stagger={0.045}
                  className="mt-6 max-w-[13ch] text-[clamp(2.35rem,9vw,5.2rem)] font-bold leading-[0.92] tracking-[-0.06em] text-foreground sm:mt-7"
                />
              </Reveal.Item>

              <Reveal.Item>
                <p className="mt-7 max-w-[24rem] font-editorial text-[1.4rem] italic leading-[1.08] text-accent sm:mt-8 sm:text-[2.2rem]">
                  {contact.ctaText ?? contact.cta}
                </p>
              </Reveal.Item>

              <Reveal.Item>
                <p className="mt-7 max-w-[32rem] text-[1rem] leading-[1.82] text-foreground-muted sm:text-[1.05rem]">
                  {contact.description}
                </p>
              </Reveal.Item>

              <Reveal.Item>
                <p className="mt-6 text-sm font-medium uppercase tracking-[0.24em] text-foreground-muted">
                  {contact.note}
                </p>
              </Reveal.Item>

              <Reveal.Item>
                <div className="mt-8 flex flex-wrap gap-3.5 sm:gap-4">
                  <Magnetic>
                    <a href={emailLink?.href} className="button-primary" aria-label={contact.primaryActionLabel}>
                      {contact.primaryActionLabel} <span aria-hidden="true">/</span>
                    </a>
                  </Magnetic>
                  <Magnetic strength={8}>
                    <button
                      type="button"
                      onClick={onOpenResume}
                      className="button-secondary"
                      aria-label={contact.secondaryActionLabel}
                    >
                      {contact.secondaryActionLabel} <span aria-hidden="true">/</span>
                    </button>
                  </Magnetic>
                </div>
              </Reveal.Item>

              <Reveal.Item>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm font-medium text-foreground-muted">
                  {prioritizedLinks.map((link) =>
                    link.label === 'Resume' ? (
                      <button
                        key={link.label}
                        type="button"
                        onClick={onOpenResume}
                        className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-accent focus-visible:text-accent"
                        aria-label={`Open ${link.label}`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                        {link.label}
                      </button>
                    ) : (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                        className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-accent focus-visible:text-accent"
                        aria-label={`Open ${link.label}`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                        {link.label}
                      </a>
                    )
                  )}
                </div>
              </Reveal.Item>

              <Reveal.Item>
                <p className="mt-7 max-w-[32rem] text-sm leading-7 text-foreground-muted">
                  {contact.highlight}
                </p>
              </Reveal.Item>
            </Reveal>

            <Reveal delay={0.1} className="contact-visual-column">
              <div ref={sceneRef} className="contact-scene-wrap">
                {enableOrbitalScene ? (
                  <Suspense fallback={<SceneFallback />}>
                    {sceneInView ? <ContactOrbitalScene /> : <SceneFallback />}
                  </Suspense>
                ) : (
                  <SceneFallback />
                )}
              </div>
            </Reveal>
          </div>

        </Reveal>
      </div>
    </section>
  );
}

export default memo(ContactSection);
