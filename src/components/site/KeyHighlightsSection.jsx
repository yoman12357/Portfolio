import { memo } from 'react';
import { motion as Motion } from 'framer-motion';
import Reveal from './Reveal';
import StaggerGroup from './StaggerGroup';
import TextReveal from './TextReveal';
import { createStaggerItem } from './motion';

function KeyHighlightsSection({ keyHighlights }) {
  return (
    <section id="highlights" className="pb-24 sm:pb-28">
      <div className="section-shell">
        <Reveal
          className="max-w-[44rem]"
          staggerChildren={0.08}
          delayChildren={0.04}
          distance={18}
          duration={0.46}
        >
          <Reveal.Item>
            <span className="eyebrow">{keyHighlights.label}</span>
          </Reveal.Item>

          <Reveal.Item>
            <TextReveal
              as="h2"
              text={keyHighlights.title}
              split="words"
              stagger={0.045}
              className="mt-7 max-w-[16ch] text-[clamp(2.7rem,5.4vw,4.3rem)] font-bold leading-[0.92] tracking-[-0.06em] text-foreground"
            />
          </Reveal.Item>

          <Reveal.Item>
            <p className="mt-7 max-w-[31rem] text-[1rem] leading-[1.82] text-foreground-muted sm:text-[1.05rem]">
              {keyHighlights.description}
            </p>
          </Reveal.Item>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4" stagger={0.07}>
          {keyHighlights.items.map((item, index) => (
            <Motion.div key={item.label} variants={createStaggerItem(18, 0.46)} className="h-full">
              <article
                className={`key-highlight-card interactive-outline h-full rounded-[1.9rem] px-5 py-6 ${
                  index === 1 ? 'xl:-translate-y-3' : index === 3 ? 'xl:translate-y-3' : ''
                } transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1`}
              >
                <p className="text-[2.3rem] font-bold leading-none tracking-[-0.06em] text-foreground sm:text-[2.7rem]">
                  {item.value}
                </p>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                  {item.label}
                </p>
                <p className="mt-5 max-w-[22rem] text-sm leading-6 text-foreground-muted">
                  {item.description}
                </p>
              </article>
            </Motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

export default memo(KeyHighlightsSection);
