import { memo } from 'react';
import { motion as Motion } from 'framer-motion';
import Reveal from './Reveal';
import Magnetic from './Magnetic';
import StaggerGroup from './StaggerGroup';
import TextReveal from './TextReveal';
import { createStaggerItem } from './motion';

function ContactSection({ contact, onOpenResume }) {
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
        <Reveal className="surface-panel-strong relative overflow-hidden rounded-[2rem] p-5 sm:rounded-[2.4rem] sm:p-9 lg:p-11">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-transparent via-accent/15 to-transparent" />
          <div className="pointer-events-none absolute -right-20 top-12 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-accent/35 to-transparent" />

          <div className="relative grid gap-10 sm:gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-end lg:gap-14">
            <Reveal
              className="min-w-0"
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
                  className="mt-6 max-w-[16ch] text-[clamp(2.35rem,9vw,5.2rem)] font-bold leading-[0.92] tracking-[-0.06em] text-foreground sm:mt-7"
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
                  {prioritizedLinks.map((link) => (
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
                  ))}
                </div>
              </Reveal.Item>

              <Reveal.Item>
                <div className="mt-8 max-w-[35rem] rounded-[1.6rem] border border-accent/25 bg-accent/[0.06] px-5 py-4 text-sm leading-7 text-foreground-muted">
                  {contact.highlight}
                </div>
              </Reveal.Item>
            </Reveal>

            <StaggerGroup className="grid gap-4 md:grid-cols-2 lg:grid-cols-1" stagger={0.08} delayChildren={0.14}>
              {prioritizedLinks.map((link, index) => (
                link.label === 'Resume' ? (
                  <Motion.button
                    key={link.label}
                    type="button"
                    variants={createStaggerItem(18, 0.44)}
                    className={`interactive-outline rounded-[1.6rem] border p-5 text-left sm:rounded-[1.8rem] sm:p-6 ${
                      index === 0
                        ? 'border-accent/28 bg-accent/[0.08] text-foreground shadow-[0_18px_40px_color-mix(in_srgb,var(--theme-accent)_12%,transparent)]'
                        : 'border-border bg-background/72 text-foreground'
                    } transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 active:scale-[0.995]`}
                    onClick={onOpenResume}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span
                          className={`text-xs font-semibold uppercase tracking-[0.26em] ${
                            index === 0 ? 'text-accent' : 'text-foreground-muted'
                          }`}
                        >
                          {link.label}
                        </span>
                        <p className="mt-3 text-[1.05rem] font-bold tracking-[-0.04em] sm:text-[1.28rem]">{link.value}</p>
                      </div>
                      <span aria-hidden="true" className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-accent">
                        Open
                      </span>
                    </div>
                    <p className="mt-5 max-w-[30rem] text-sm leading-6 text-foreground-muted">
                      {link.description}
                    </p>
                  </Motion.button>
                ) : (
                  <Motion.a
                    key={link.label}
                    variants={createStaggerItem(18, 0.44)}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                    className={`interactive-outline rounded-[1.6rem] border p-5 text-left sm:rounded-[1.8rem] sm:p-6 ${
                      index === 0
                        ? 'border-accent/28 bg-accent/[0.08] text-foreground shadow-[0_18px_40px_color-mix(in_srgb,var(--theme-accent)_12%,transparent)]'
                        : 'border-border bg-background/72 text-foreground'
                    } transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 active:scale-[0.995]`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span
                          className={`text-xs font-semibold uppercase tracking-[0.26em] ${
                            index === 0 ? 'text-accent' : 'text-foreground-muted'
                          }`}
                        >
                          {link.label}
                        </span>
                        <p className="mt-3 text-[1.05rem] font-bold tracking-[-0.04em] sm:text-[1.28rem]">{link.value}</p>
                      </div>
                      <span aria-hidden="true" className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-accent">
                        Open
                      </span>
                    </div>
                    <p className="mt-5 max-w-[30rem] text-sm leading-6 text-foreground-muted">
                      {link.description}
                    </p>
                  </Motion.a>
                )
              ))}
            </StaggerGroup>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default memo(ContactSection);
