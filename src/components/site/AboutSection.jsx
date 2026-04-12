import { memo } from 'react';
import { motion as Motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

function AboutSection({ about }) {
  return (
    <section id="about" className="deferred-section section-space relative overflow-hidden">
      <div className="section-shell relative">
        <SectionHeading
          label={about.label}
          title={about.title}
          description={about.introduction}
          centered
        />

        <div className="mt-16">
          <Reveal>
            <div className="surface-panel rounded-[2.3rem] p-7 sm:p-9 lg:p-11">
              <div className="editorial-line mb-8" />
              <p className="max-w-[24rem] font-editorial text-[1.8rem] italic leading-[1.08] text-foreground sm:text-[2.25rem]">
                {about.mantra}
              </p>
              <div className="mt-10 max-w-[33rem] grid gap-7 text-[1rem] leading-[1.82] text-foreground-muted sm:text-[1.04rem]">
                {about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-16 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {about.strengths.map((strength, index) => (
                  <Motion.article
                    key={strength.title}
                    whileHover={{ y: -3, scale: 1.004 }}
                    className={`rounded-[1.6rem] border p-5 ${
                      index === 1
                        ? 'border-accent/28 bg-accent/[0.08] text-foreground shadow-[0_18px_42px_color-mix(in_srgb,var(--theme-accent)_12%,transparent)]'
                        : 'border-border bg-background/70'
                    } ${index === 0 ? 'sm:translate-y-2' : index === 2 ? 'xl:translate-y-4' : ''}`}
                  >
                    <h3
                      className={`text-[1.02rem] font-bold tracking-[-0.03em] ${
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

export default memo(AboutSection);
