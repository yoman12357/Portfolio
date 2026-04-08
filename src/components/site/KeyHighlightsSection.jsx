import { motion as Motion } from 'framer-motion';
import Reveal from './Reveal';
import StaggerGroup from './StaggerGroup';
import { createStaggerItem, MOTION_EASE } from './motion';

export default function KeyHighlightsSection({ keyHighlights }) {
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
            <h2 className="mt-7 max-w-[15ch] text-[clamp(3rem,6.2vw,5rem)] font-bold leading-[0.88] tracking-[-0.08em] text-foreground">
              {keyHighlights.title}
            </h2>
          </Reveal.Item>

          <Reveal.Item>
            <p className="mt-7 max-w-[33rem] text-[1.03rem] leading-[1.9] text-foreground-muted sm:text-[1.1rem]">
              {keyHighlights.description}
            </p>
          </Reveal.Item>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4" stagger={0.07}>
          {keyHighlights.items.map((item, index) => (
            <Motion.div key={item.label} variants={createStaggerItem(18, 0.46)} className="h-full">
              <Motion.article
                whileHover={{ y: -6, scale: 1.014 }}
                transition={{ duration: 0.26, ease: MOTION_EASE }}
                className={`key-highlight-card interactive-outline h-full rounded-[1.9rem] px-5 py-6 ${
                  index === 1 ? 'xl:-translate-y-3' : index === 3 ? 'xl:translate-y-3' : ''
                }`}
              >
                <p className="text-[2.5rem] font-bold leading-none tracking-[-0.08em] text-foreground sm:text-[2.9rem]">
                  {item.value}
                </p>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                  {item.label}
                </p>
                <p className="mt-5 max-w-[22rem] text-sm leading-6 text-foreground-muted">
                  {item.description}
                </p>
              </Motion.article>
            </Motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
