import { motion as Motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import StaggerGroup from './StaggerGroup';
import { createStaggerItem, MOTION_EASE } from './motion';

export default function SkillsSection({ skills }) {
  return (
    <section id="skills" className="section-space relative overflow-hidden">
      <div className="section-shell relative">
        <div className="pointer-events-none absolute inset-x-0 top-16 hidden justify-center lg:flex">
          <span className="font-display text-[9rem] font-bold uppercase tracking-[-0.08em] text-foreground/[0.03]">
            EXPERTISE
          </span>
        </div>

        <SectionHeading
          label={skills.label}
          title={skills.title}
          description={skills.introduction}
          centered
        />

        <StaggerGroup className="mt-16 grid gap-6 lg:grid-cols-[0.92fr_1.16fr_0.92fr] lg:items-start" stagger={0.1}>
          {skills.categories.map((category, index) => {
            const isHighlighted = Boolean(category.highlighted);
            const offsetClass =
              index === 0
                ? 'lg:translate-y-4'
                : index === 2
                  ? 'lg:translate-y-8'
                  : 'lg:-translate-y-2';

            return (
              <Motion.div key={category.title} variants={createStaggerItem(20, 0.5)} className="h-full">
                <Motion.article
                  whileHover={{ y: -6, scale: 1.014, rotate: isHighlighted ? 0 : index === 0 ? -0.35 : 0.35 }}
                  transition={{ duration: 0.28, ease: MOTION_EASE }}
                  className={`skills-card-shell interactive-outline relative h-full overflow-hidden rounded-[2.2rem] p-6 sm:p-7 ${offsetClass} ${
                    isHighlighted ? 'skills-card-shell--highlighted' : ''
                  }`}
                >
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span
                          className={`text-[0.68rem] font-semibold uppercase tracking-[0.3em] ${
                            isHighlighted ? 'text-accent-foreground/72' : 'text-foreground-muted'
                          }`}
                        >
                          {category.eyebrow}
                        </span>
                        <h3
                          className={`mt-5 max-w-[14ch] text-[2.2rem] font-bold leading-[0.91] tracking-[-0.065em] sm:text-[2.55rem] ${
                            isHighlighted ? 'text-accent-foreground' : 'text-foreground'
                          }`}
                        >
                          {category.title}
                        </h3>
                      </div>

                      <span
                        className={`text-[2.8rem] font-bold leading-none tracking-[-0.12em] ${
                          isHighlighted ? 'text-accent-foreground/18' : 'text-foreground/[0.08]'
                        }`}
                        aria-hidden="true"
                      >
                        {category.index}
                      </span>
                    </div>

                    <p
                      className={`mt-7 max-w-[22rem] text-sm leading-[1.9] sm:text-[1rem] ${
                        isHighlighted ? 'text-accent-foreground/88' : 'text-foreground-muted'
                      }`}
                    >
                      {category.description}
                    </p>

                    <div
                      className={`mt-8 h-px w-full ${
                        isHighlighted
                          ? 'bg-gradient-to-r from-accent-foreground/10 via-accent-foreground/60 to-accent-foreground/10'
                          : 'bg-gradient-to-r from-transparent via-accent/40 to-transparent'
                      }`}
                    />

                    <ul className="mt-9 space-y-4">
                      {category.items.map((item) => (
                        <li
                          key={item}
                          className={`flex items-start gap-3 text-sm leading-6 sm:text-[0.96rem] ${
                            isHighlighted ? 'text-accent-foreground' : 'text-foreground'
                          }`}
                        >
                          <span
                            className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                              isHighlighted ? 'bg-accent-foreground' : 'bg-accent'
                            }`}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Motion.article>
              </Motion.div>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
