import { lazy, memo, Suspense, useCallback, useMemo, useRef, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion as Motion, useInView } from 'framer-motion';
import ProjectCard from './ProjectCard';
import Reveal from './Reveal';
import ScrollScene from './ScrollScene';
import SectionHeading from './SectionHeading';
import { MOTION_EASE } from './motion';

const ProjectDetailsModal = lazy(() => import('./ProjectDetailsModal'));

const projectGridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.04,
    },
  },
};

const projectCardRevealVariants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.985,
    filter: 'blur(10px)',
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.52,
      ease: MOTION_EASE,
    },
  },
  exit: {
    opacity: 0,
    y: 14,
    scale: 0.992,
    transition: {
      duration: 0.24,
      ease: MOTION_EASE,
    },
  },
};

function ProjectsSection({ projects }) {
  const [activeProject, setActiveProject] = useState(null);
  const gridRef = useRef(null);

  const liveProjects = useMemo(
    () => projects.items.filter((project) => project.liveUrl).length,
    [projects.items]
  );
  const gridInView = useInView(gridRef, { once: true, amount: 0.14 });
  const handleViewDetails = useCallback((project) => {
    setActiveProject(project);
  }, []);
  const handleCloseProject = useCallback(() => {
    setActiveProject(null);
  }, []);

  return (
    <section id="projects" className="section-space">
      <div className="section-shell">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)] xl:items-end">
          <SectionHeading
            label={projects.label}
            title={projects.title}
            description={projects.subtitle}
          />

          <Reveal delay={0.08}>
            <div className="surface-panel-strong interactive-outline rounded-[1.9rem] p-5 sm:rounded-[2.2rem] sm:p-7">
              <span className="eyebrow">Project atlas</span>
              <h3 className="mt-5 max-w-[15ch] text-[1.65rem] font-bold leading-[1] tracking-[-0.045em] text-foreground sm:text-[1.9rem]">
                A closer look at the engineering decisions behind each build.
              </h3>
              <p className="mt-5 max-w-[24rem] text-[0.98rem] leading-[1.78] text-foreground-muted">
                Each project opens into a deeper breakdown of the problem, the build, and the outcome without crowding the homepage.
              </p>

              <div className="mt-6 grid gap-3 min-[460px]:grid-cols-2">
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
            </div>
          </Reveal>
        </div>

        <ScrollScene intensity="subtle" className="mt-8 sm:mt-10">
          <LayoutGroup>
            <Motion.div
              id="projects-grid"
              ref={gridRef}
              layout
              variants={projectGridVariants}
              initial="hidden"
              animate={gridInView ? 'show' : 'hidden'}
              transition={{ layout: { duration: 0.56, ease: MOTION_EASE } }}
              className="grid gap-4 sm:grid-cols-2 lg:gap-5 xl:grid-cols-6"
            >
              <AnimatePresence initial={false} mode="popLayout">
                {projects.items.map((project, index) => (
                  <Motion.div
                    key={project.name}
                    layout
                    variants={projectCardRevealVariants}
                    initial="hidden"
                    animate={gridInView ? 'show' : 'hidden'}
                    exit="exit"
                    transition={{ layout: { duration: 0.52, ease: MOTION_EASE } }}
                    className={`h-full ${index < 2 ? 'xl:col-span-3' : 'xl:col-span-2'}`}
                  >
                    <ProjectCard project={project} onViewDetails={handleViewDetails} />
                  </Motion.div>
                ))}
              </AnimatePresence>
            </Motion.div>
          </LayoutGroup>
        </ScrollScene>
      </div>

      <Suspense fallback={null}>
        <AnimatePresence initial={false} mode="wait">
          {activeProject ? (
            <ProjectDetailsModal
              key={activeProject.name}
              project={activeProject}
              onClose={handleCloseProject}
            />
          ) : null}
        </AnimatePresence>
      </Suspense>
    </section>
  );
}

export default memo(ProjectsSection);
