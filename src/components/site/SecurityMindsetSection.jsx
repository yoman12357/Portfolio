import { memo } from 'react';
import { motion as Motion } from 'framer-motion';
import ScrollScene from './ScrollScene';
import SectionHeading from './SectionHeading';
import StaggerGroup from './StaggerGroup';
import { createStaggerItem } from './motion';

function SecurityMindsetSection({ securityFocus }) {
  return (
    <section id="security" className="section-space relative overflow-hidden">
      <div className="section-shell relative">
        <div className="security-grid-glow pointer-events-none absolute inset-x-0 top-10 h-[24rem]" />

        <ScrollScene intensity="subtle">
          <div className="security-shell surface-panel-strong relative overflow-hidden rounded-[2.5rem] p-7 sm:p-9 lg:p-11">
            <div className="absolute inset-x-0 top-24 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
            <div className="absolute right-10 top-10 h-28 w-28 rounded-full border border-accent/18" />
            <div className="absolute right-14 top-14 h-20 w-20 rounded-full border border-border" />

            <SectionHeading
              label={securityFocus.label}
              title={securityFocus.title}
              description={securityFocus.introduction}
            />

            <StaggerGroup className="mt-16 grid gap-5 lg:grid-cols-2" stagger={0.08}>
              {securityFocus.items.map((item, index) => (
                <Motion.div key={item.title} variants={createStaggerItem(18, 0.46)} className="h-full">
                  <article
                    className={`security-card interactive-outline relative h-full overflow-hidden rounded-[1.8rem] p-5 sm:p-6 ${
                      index === 0 ? 'lg:translate-y-3' : index === 3 ? 'lg:translate-y-4' : ''
                    } transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1`}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute right-5 top-5 text-[2.3rem] font-bold tracking-[-0.12em] text-foreground/[0.08]"
                    >
                      0{index + 1}
                    </span>

                    <div className="relative z-10">
                      <span className="eyebrow">{item.eyebrow}</span>
                      <h3 className="mt-5 max-w-[15ch] text-[1.8rem] font-bold leading-[0.92] tracking-[-0.055em] text-foreground sm:text-[2rem]">
                        {item.title}
                      </h3>
                      <p className="mt-5 max-w-[28rem] text-sm leading-7 text-foreground-muted sm:text-[1rem]">
                        {item.description}
                      </p>
                    </div>
                  </article>
                </Motion.div>
              ))}
            </StaggerGroup>
          </div>
        </ScrollScene>
      </div>
    </section>
  );
}

export default memo(SecurityMindsetSection);
