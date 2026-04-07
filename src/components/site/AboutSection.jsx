import { motion as Motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

export default function AboutSection({ profile, about }) {
  return (
    <section id="about" className="section-space relative overflow-hidden">
      <div className="section-shell relative">
        <div className="pointer-events-none absolute inset-x-0 top-20 hidden justify-center lg:flex">
          <span className="font-display text-[10rem] font-bold uppercase tracking-[-0.08em] text-foreground/[0.035]">
            {about.watermark}
          </span>
        </div>

        <SectionHeading label={about.label} title={about.title} description={about.introduction} />

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <Reveal>
            <Motion.div
              whileHover={{ y: -6, rotate: -0.45 }}
              className="surface-panel-strong interactive-outline relative overflow-hidden rounded-[2.3rem] p-6 sm:p-7"
            >
              <div className="absolute inset-x-8 top-6 h-32 rounded-full bg-accent/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[1.5rem]">
                <img
                  src={profile.profileImage}
                  alt={profile.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="relative mt-5 grid gap-3 sm:grid-cols-2">
                {about.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="rounded-[1.5rem] border border-border bg-background/70 p-4 backdrop-blur"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-foreground-muted">
                      {fact.label}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-foreground">{fact.value}</p>
                  </div>
                ))}
              </div>
            </Motion.div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="surface-panel rounded-[2.3rem] p-7 sm:p-9 lg:p-11">
              <div className="editorial-line mb-8" />
              <p className="max-w-[25rem] font-editorial text-[2.15rem] italic leading-tight text-foreground sm:text-[2.7rem]">
                {about.mantra}
              </p>
              <div className="mt-11 max-w-[35rem] grid gap-8 text-[1.03rem] leading-[1.95] text-foreground-muted sm:text-[1.08rem]">
                {about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-16 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {about.strengths.map((strength, index) => (
                  <Motion.article
                    key={strength.title}
                    whileHover={{ y: -6, rotate: index === 1 ? 0 : index === 0 ? -0.35 : 0.35 }}
                    className={`rounded-[1.6rem] border p-5 ${
                      index === 1
                        ? 'border-accent/28 bg-accent/[0.08] text-foreground shadow-[0_18px_42px_color-mix(in_srgb,var(--theme-accent)_12%,transparent)]'
                        : 'border-border bg-background/70'
                    } ${index === 0 ? 'sm:translate-y-2' : index === 2 ? 'xl:translate-y-4' : ''}`}
                  >
                    <h3
                      className={`text-lg font-bold tracking-[-0.04em] ${
                        index === 1 ? 'text-accent' : 'text-foreground'
                      }`}
                    >
                      {strength.title}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-foreground-muted">
                      {strength.description}
                    </p>
                  </Motion.article>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
