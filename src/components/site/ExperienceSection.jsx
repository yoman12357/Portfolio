import { motion as Motion } from 'framer-motion';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import StickySplitSection from './StickySplitSection';
import StaggerGroup from './StaggerGroup';
import { createStaggerItem, MOTION_EASE } from './motion';

export default function ExperienceSection({ experience }) {
  return (
    <section id="experience" className="section-space">
      <div className="section-shell">
        <StaggerGroup className="grid gap-5 md:grid-cols-3" stagger={0.08}>
          {experience.highlights.map((item, index) => (
            <Motion.div key={item.label} variants={createStaggerItem(16, 0.42)}>
              <Motion.div
                whileHover={{ y: -6, scale: 1.014 }}
                transition={{ duration: 0.26, ease: MOTION_EASE }}
                className={`interactive-outline rounded-[1.95rem] px-5 py-6 ${
                  index === 1
                    ? 'border border-accent/30 bg-accent/[0.08] text-foreground shadow-[0_18px_42px_color-mix(in_srgb,var(--theme-accent)_12%,transparent)] md:-translate-y-3'
                    : 'surface-panel'
                }`}
              >
                <p className={`text-3xl font-bold tracking-[-0.06em] ${index === 1 ? 'text-accent' : 'text-foreground'}`}>
                  {item.value}
                </p>
                <p className="mt-2 text-sm uppercase tracking-[0.24em] text-foreground-muted">
                  {item.label}
                </p>
              </Motion.div>
            </Motion.div>
          ))}
        </StaggerGroup>

        <div className="mt-16">
          <StickySplitSection
            leftContent={
              <div className="space-y-6 lg:pr-6">
                <SectionHeading
                  label={experience.label}
                  title={experience.title}
                  description={experience.introduction}
                />

                <Reveal delay={0.08}>
                  <div className="surface-panel-strong interactive-outline rounded-[2.1rem] p-6 sm:p-7">
                    <span className="eyebrow">Signals beyond projects</span>
                    <h3 className="mt-5 max-w-[15ch] text-[2.05rem] font-bold leading-[0.94] tracking-[-0.055em] text-foreground">
                      Experience, credentials, and communities shaping my direction.
                    </h3>
                    <p className="mt-5 max-w-[24rem] text-[0.98rem] leading-7 text-foreground-muted">
                      The timeline on the right captures applied work, while these additional signals show where I am learning, contributing, and building technical depth.
                    </p>

                    <div className="mt-6 grid gap-4">
                      <div className="rounded-[1.45rem] border border-border bg-background/72 p-4">
                        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                          Credentials
                        </span>
                        <p className="mt-3 text-2xl font-bold tracking-[-0.05em] text-foreground">
                          {experience.credentials.length.toString().padStart(2, '0')}
                        </p>
                      </div>

                      <div className="rounded-[1.45rem] border border-border bg-background/72 p-4">
                        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                          Associations
                        </span>
                        <p className="mt-3 text-2xl font-bold tracking-[-0.05em] text-accent">
                          {experience.associations.length.toString().padStart(2, '0')}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            }
            rightContent={
              <div className="relative pl-6 sm:pl-8">
                <div className="absolute left-2 top-3 h-[calc(100%-2rem)] w-px bg-border sm:left-3" />

                <div className="space-y-8">
                  {experience.timeline.map((entry, index) => (
                    <Reveal key={`${entry.title}-${entry.org}`} delay={index * 0.08}>
                      <article className="relative">
                        <span className="absolute -left-6 top-7 h-4 w-4 rounded-full border-[5px] border-background bg-accent sm:-left-7" />
                        <div className="surface-panel interactive-outline rounded-[1.95rem] p-6 sm:p-7">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <span className="eyebrow">{entry.type}</span>
                            <span className="text-sm font-medium text-foreground-muted">{entry.period}</span>
                          </div>

                          <h3 className="mt-4 max-w-[17ch] text-[2.2rem] font-bold leading-[0.92] tracking-[-0.06em] text-foreground">
                            {entry.title}
                          </h3>
                          <p className="mt-2 text-base font-medium text-accent">{entry.org}</p>
                          <p className="mt-1 text-sm text-foreground-muted">{entry.location}</p>

                          <p className="mt-6 max-w-[32rem] text-[0.99rem] leading-[1.9] text-foreground-muted">
                            {entry.summary}
                          </p>

                          <ul className="mt-7 space-y-3">
                            {entry.points.map((point) => (
                              <li key={point} className="flex items-start gap-3 text-sm leading-6 text-foreground">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="mt-6 flex flex-wrap gap-2">
                            {entry.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-medium text-foreground-muted"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </article>
                    </Reveal>
                  ))}

                  <Reveal delay={0.12}>
                    <div className="surface-panel-strong interactive-outline rounded-[2.1rem] p-6 sm:p-7">
                      <span className="eyebrow">Credentials</span>
                      <h3 className="mt-5 max-w-[15ch] text-[2.15rem] font-bold leading-[0.92] tracking-[-0.06em] text-foreground">
                        Certifications and focused technical learning.
                      </h3>
                      <p className="mt-5 max-w-[22rem] font-editorial text-[2rem] italic leading-tight text-foreground-muted">
                        Signals of curiosity across AI, privacy, data protection, and modern engineering workflows.
                      </p>
                      <div className="mt-6 space-y-3">
                        {experience.credentials.map((credential) => (
                          <div
                            key={credential}
                            className="rounded-[1.3rem] border border-border bg-background/68 px-4 py-3 text-sm font-medium text-foreground"
                          >
                            {credential}
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>

                  <Reveal delay={0.16}>
                    <div className="surface-panel interactive-outline rounded-[2.1rem] p-6 sm:p-7">
                      <span className="eyebrow">Associations</span>
                      <h3 className="mt-5 max-w-[16ch] text-[2.05rem] font-bold leading-[0.94] tracking-[-0.055em] text-foreground">
                        Communities sharpening my web, systems, and security perspective.
                      </h3>
                      <div className="mt-6 flex flex-wrap gap-3">
                        {experience.associations.map((association) => (
                          <span
                            key={association}
                            className="rounded-full border border-border bg-background/70 px-4 py-2 text-sm font-medium text-foreground-muted"
                          >
                            {association}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}
