import { memo } from 'react';
import { motion as Motion } from 'framer-motion';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import StaggerGroup from './StaggerGroup';
import { createStaggerItem } from './motion';

function CurrentlyLearningSection({ learning }) {
  return (
    <section id="learning" className="section-space">
      <div className="section-shell">
        <SectionHeading
          label={learning.label}
          title={learning.title}
          description={learning.introduction}
        />

        <StaggerGroup className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4" stagger={0.08}>
          {learning.highlights.map((group, index) => (
            <Motion.div key={group.title} variants={createStaggerItem(18, 0.46)} className="h-full">
              <article
                className={`interactive-outline h-full rounded-[2rem] p-6 sm:p-7 ${
                  index === 1 || index === 2
                    ? 'surface-panel-strong border border-accent/24'
                    : 'surface-panel'
                } transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1`}
              >
                <span className="eyebrow">{group.eyebrow}</span>
                <h3 className="mt-5 max-w-[15ch] text-[1.8rem] font-bold leading-[0.98] tracking-[-0.04em] text-foreground">
                  {group.title}
                </h3>
                <p className="mt-5 max-w-[22rem] text-sm leading-[1.78] text-foreground-muted sm:text-[0.98rem]">
                  {group.description}
                </p>
              </article>
            </Motion.div>
          ))}
        </StaggerGroup>

        <Reveal delay={0.1}>
          <div className="mt-8 rounded-[1.7rem] border border-border bg-background/68 px-5 py-4 text-sm leading-7 text-foreground-muted">
            {learning.note}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default memo(CurrentlyLearningSection);
