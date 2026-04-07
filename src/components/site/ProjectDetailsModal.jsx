import { AnimatePresence, motion as Motion } from 'framer-motion';
import { useEffect } from 'react';
import Magnetic from './Magnetic';

const CASE_STUDY_SECTIONS = [
  { key: 'problem', label: 'Problem' },
  { key: 'approach', label: 'Approach' },
  { key: 'impact', label: 'Impact' },
];

export default function ProjectDetailsModal({ project, onClose }) {
  useEffect(() => {
    if (!project) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-background/70 px-4 py-6 backdrop-blur-md"
          onClick={onClose}
        >
          <Motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-details-title"
            className="surface-panel-strong relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[2.2rem] p-6 sm:p-8 lg:p-10"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/70 text-lg text-foreground transition-transform hover:scale-105"
              aria-label={`Close details for ${project.name}`}
            >
              &times;
            </button>

            <div className="pr-14">
              <span className="eyebrow">Project {project.index}</span>
              <h3
                id="project-details-title"
                className="mt-6 max-w-[15ch] text-[2.8rem] font-bold leading-[0.88] tracking-[-0.078em] text-foreground sm:text-[3.35rem]"
              >
                {project.name}
              </h3>
              <p className="mt-7 max-w-[38rem] text-[1.03rem] leading-8 text-foreground sm:text-[1.1rem]">
                {project.description}
              </p>
              {project.detail ? (
                <p className="mt-7 max-w-[36rem] text-[0.98rem] leading-7 text-foreground-muted">
                  {project.detail}
                </p>
              ) : null}
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="grid gap-4">
                <div className="project-detail-panel rounded-[1.5rem] p-5">
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                    Role
                  </span>
                  <p className="mt-3 text-base leading-7 text-foreground">{project.role}</p>
                </div>

                <div className="project-detail-panel rounded-[1.5rem] p-5">
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                    Availability
                  </span>
                  <p className="mt-3 text-base leading-7 text-foreground">{project.availability}</p>
                </div>

                <div className="project-detail-panel rounded-[1.5rem] p-5">
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                    Tech Stack
                  </span>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="project-stack-tag rounded-full px-3 py-1.5 text-xs font-medium tracking-[0.02em]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                {CASE_STUDY_SECTIONS.map((section) => (
                  <div key={section.key} className="project-detail-panel rounded-[1.5rem] p-5 sm:p-6">
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                      {section.label}
                    </span>
                    <p className="mt-4 text-base leading-7 text-foreground">
                      {project.caseStudy?.[section.key]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {project.liveUrl ? (
                <Magnetic>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="button-primary"
                  >
                    Live Demo <span aria-hidden="true">/</span>
                  </a>
                </Magnetic>
              ) : (
                <button
                  type="button"
                  disabled
                  className="project-action project-action--disabled inline-flex items-center justify-center gap-2"
                >
                  <span>Live Demo</span>
                  <span aria-hidden="true" className="text-[0.72rem] tracking-[0.18em]">/</span>
                </button>
              )}

              <Magnetic strength={8}>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="button-secondary"
                >
                  GitHub <span aria-hidden="true">/</span>
                </a>
              </Magnetic>
            </div>
          </Motion.div>
        </Motion.div>
      ) : null}
    </AnimatePresence>
  );
}
