import { AnimatePresence, motion as Motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectDetailsModal from './ProjectDetailsModal';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import StickySplitSection from './StickySplitSection';
import { MOTION_EASE } from './motion';

const INITIAL_VISIBLE_PROJECTS = 4;

export default function ProjectsSection({ projects }) {
  const [activeProject, setActiveProject] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const hasOverflow = projects.items.length > INITIAL_VISIBLE_PROJECTS;
  const visibleProjects = useMemo(
    () => (showAll ? projects.items : projects.items.slice(0, INITIAL_VISIBLE_PROJECTS)),
    [projects.items, showAll]
  );
  const liveProjects = projects.items.filter((project) => project.liveUrl).length;

  return (
    <section id="projects" className="section-space">
      <div className="section-shell">
        <StickySplitSection
          leftContent={
            <div className="space-y-6 lg:pr-6">
              <SectionHeading
                label={projects.label}
                title={projects.title}
                description={projects.subtitle}
              />

              <Reveal delay={0.08}>
                <div className="surface-panel-strong interactive-outline rounded-[2.2rem] p-6 sm:p-7">
                  <span className="eyebrow">Browse the work</span>
                  <h3 className="mt-5 max-w-[14ch] text-[2.1rem] font-bold leading-[0.94] tracking-[-0.06em] text-foreground">
                    Compact previews on the right. Full engineering details on click.
                  </h3>
                  <p className="mt-5 max-w-[24rem] text-[0.98rem] leading-7 text-foreground-muted">
                    The grid keeps the homepage lighter, while every card still opens a deeper case-study view with the problem, approach, and impact.
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.35rem] border border-border bg-background/72 px-4 py-4">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                        Total Projects
                      </p>
                      <p className="mt-3 text-3xl font-bold tracking-[-0.06em] text-foreground">
                        {projects.items.length.toString().padStart(2, '0')}
                      </p>
                    </div>

                    <div className="rounded-[1.35rem] border border-border bg-background/72 px-4 py-4">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                        Live Demos
                      </p>
                      <p className="mt-3 text-3xl font-bold tracking-[-0.06em] text-accent">
                        {liveProjects.toString().padStart(2, '0')}
                      </p>
                    </div>
                  </div>

                  {hasOverflow ? (
                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={() => setShowAll((current) => !current)}
                        className="button-secondary"
                        aria-expanded={showAll}
                        aria-controls="projects-grid"
                      >
                        {showAll ? 'Show Less' : `Show More (${projects.items.length - INITIAL_VISIBLE_PROJECTS})`}
                      </button>
                    </div>
                  ) : null}
                </div>
              </Reveal>
            </div>
          }
          rightContent={
            <Motion.div
              id="projects-grid"
              layout
              className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3"
            >
              <AnimatePresence initial={false}>
                {visibleProjects.map((project, index) => (
                  <Motion.div
                    key={project.name}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.18 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.42, delay: index * 0.05, ease: MOTION_EASE }}
                    className="h-full"
                  >
                    <ProjectCard project={project} onViewDetails={() => setActiveProject(project)} />
                  </Motion.div>
                ))}
              </AnimatePresence>
            </Motion.div>
          }
        />
      </div>

      <ProjectDetailsModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
