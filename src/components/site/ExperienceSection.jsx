import { memo } from 'react';
import { motion as Motion } from 'framer-motion';
import Reveal from './Reveal';
import ScrollScene from './ScrollScene';
import SectionHeading from './SectionHeading';
import StickySplitSection from './StickySplitSection';
import StaggerGroup from './StaggerGroup';
import { createStaggerItem } from './motion';

function ExperienceSection({ experience }) {
  return (
    <section id="experience" className="section-space">
      <div className="section-shell">
        <div>
          <StickySplitSection
            leftContent={
              <div className="space-y-5 sm:space-y-6 lg:pr-6">
                <SectionHeading
                  label={experience.label}
                  title={experience.title}
                  description={experience.introduction}
                />

                <Reveal delay={0.08}>
                  <div className="surface-panel-strong interactive-outline rounded-[1.9rem] p-5 sm:rounded-[2.1rem] sm:p-7">
                    <span className="eyebrow">Signals beyond projects</span>
                    <h3 className="mt-5 max-w-[15ch] text-[1.6rem] font-bold leading-[1] tracking-[-0.04em] text-foreground sm:text-[1.85rem]">
                      Experience and credentials shaping my direction.
                    </h3>
                    <p className="mt-5 max-w-[24rem] text-[0.98rem] leading-[1.78] text-foreground-muted">
                      The timeline on the right captures applied work, while these supporting signals show where I am contributing and building technical depth.
                    </p>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
                          Active Roles
                        </span>
                        <p className="mt-3 text-2xl font-bold tracking-[-0.05em] text-accent">
                          {experience.timeline.filter((entry) => entry.type === 'Role').length.toString().padStart(2, '0')}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            }
            rightContent={
              <ScrollScene intensity="subtle">
                <div className="relative pl-5 sm:pl-8">
                  <div className="absolute left-2 top-3 h-[calc(100%-2rem)] w-px bg-border sm:left-3" />

                  <div className="space-y-8">
                    {experience.timeline.map((entry, index) => (
                      <Reveal key={`${entry.title}-${entry.org}`} delay={index * 0.08}>
                        <article className="relative">
                          <span className="absolute -left-5 top-7 h-4 w-4 rounded-full border-[5px] border-background bg-accent sm:-left-7" />
                          <div className="surface-panel interactive-outline rounded-[1.7rem] p-5 sm:rounded-[1.95rem] sm:p-7">
                            <div className="flex flex-wrap items-start justify-between gap-3 sm:items-center">
                              <span className="eyebrow">{entry.type}</span>
                              <span className="text-sm font-medium text-foreground-muted">{entry.period}</span>
                            </div>

                            <h3 className="mt-4 max-w-[17ch] text-[1.65rem] font-bold leading-[0.98] tracking-[-0.04em] text-foreground sm:text-[1.95rem]">
                              {entry.title}
                            </h3>
                            <p className="mt-2 text-base font-medium text-accent">{entry.org}</p>
                            <p className="mt-1 text-sm text-foreground-muted">{entry.location}</p>

                            <p className="mt-6 max-w-[30rem] text-[0.98rem] leading-[1.8] text-foreground-muted">
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
                      <div className="surface-panel-strong interactive-outline rounded-[1.9rem] p-5 sm:rounded-[2.1rem] sm:p-7">
                        <span className="eyebrow">Credentials</span>
                        <h3 className="mt-5 max-w-[15ch] text-[1.65rem] font-bold leading-[0.98] tracking-[-0.04em] text-foreground sm:text-[1.95rem]">
                          Certifications and focused technical learning.
                        </h3>
                        <p className="mt-5 max-w-[22rem] font-editorial text-[1.35rem] italic leading-[1.08] text-foreground-muted sm:text-[1.7rem]">
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
                  </div>
                </div>
              </ScrollScene>
            }
          />
        </div>
      </div>
    </section>
  );
}

export default memo(ExperienceSection);
