import { motion as Motion } from 'framer-motion';
import Reveal from './Reveal';
import Magnetic from './Magnetic';
import { MOTION_EASE } from './motion';

export default function ContactSection({ profile, contact }) {
  return (
    <section id="contact" className="section-space pb-24 sm:pb-28">
      <div className="section-shell">
        <Reveal className="surface-panel-strong relative overflow-hidden rounded-[2.4rem] p-7 sm:p-9 lg:p-11">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-transparent via-accent/15 to-transparent" />
          <div className="pointer-events-none absolute -right-20 top-12 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-accent/35 to-transparent" />

          <div className="relative grid gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-end">
            <div>
              <span className="eyebrow">{contact.label}</span>
              <h2 className="mt-7 max-w-[14ch] text-[clamp(3.35rem,7.6vw,6.25rem)] font-bold leading-[0.86] tracking-[-0.082em] text-foreground">
                {contact.title}
              </h2>
              <p className="mt-8 max-w-[24rem] font-editorial text-[2.15rem] italic leading-tight text-accent sm:text-[2.75rem]">
                {contact.cta}
              </p>
              <p className="mt-8 max-w-[34rem] text-[1.04rem] leading-[1.95] text-foreground-muted sm:text-[1.1rem]">
                {contact.description}
              </p>
              <p className="mt-6 text-sm font-medium uppercase tracking-[0.24em] text-foreground-muted">
                {contact.note}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Magnetic>
                  <a href={`mailto:${profile.email}`} className="button-primary">
                    Email Me <span aria-hidden="true">/</span>
                  </a>
                </Magnetic>
                <Magnetic strength={8}>
                  <a href={profile.resumeUrl} download className="button-secondary">
                    Download Resume PDF <span aria-hidden="true">/</span>
                  </a>
                </Magnetic>
              </div>

              <div className="mt-8 max-w-[35rem] rounded-[1.6rem] border border-accent/25 bg-accent/[0.06] px-5 py-4 text-sm leading-7 text-foreground-muted">
                Open to internships, security-aware product teams, and technically ambitious collaborations where strong execution and reliable systems both matter.
              </div>
            </div>

            <div className="grid gap-4">
              {contact.links.map((link, index) => (
                <Motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                  whileHover={{ y: -6, scale: 1.012 }}
                  whileTap={{ scale: 0.992 }}
                  transition={{ duration: 0.28, ease: MOTION_EASE }}
                  className={`interactive-outline rounded-[1.8rem] border p-5 sm:p-6 ${
                    index === 0
                      ? 'border-accent/28 bg-accent/[0.08] text-foreground shadow-[0_18px_40px_color-mix(in_srgb,var(--theme-accent)_12%,transparent)]'
                      : 'border-border bg-background/72 text-foreground'
                  }`}
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
                      <p className="mt-3 text-[1.15rem] font-bold tracking-[-0.04em] sm:text-[1.28rem]">{link.value}</p>
                    </div>
                    <span
                      aria-hidden="true"
                      className={`text-[0.72rem] font-semibold uppercase tracking-[0.24em] ${
                        index === 0 ? 'text-accent' : 'text-accent'
                      }`}
                    >
                      Open
                    </span>
                  </div>
                  <p
                    className="mt-5 max-w-[30rem] text-sm leading-6 text-foreground-muted"
                  >
                    {index === 0
                      ? 'Best for direct outreach, project discussions, and internship opportunities.'
                      : link.label === 'GitHub'
                        ? 'See projects, experiments, and the technical direction behind my work.'
                        : 'Connect professionally and follow my ongoing development and security journey.'}
                  </p>
                </Motion.a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
