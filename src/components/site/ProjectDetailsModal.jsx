import { motion as Motion } from 'framer-motion';
import { useEffect } from 'react';
import Magnetic from './Magnetic';
import { MOTION_EASE } from './motion';

const CASE_STUDY_SECTIONS = [
  { key: 'problem', label: 'Problem' },
  { key: 'solution', label: 'Solution' },
  { key: 'impact', label: 'Impact' },
];

const modalContentVariants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.06,
      staggerChildren: 0.07,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const modalItemVariants = {
  hidden: {
    opacity: 0,
    y: 16,
    filter: 'blur(6px)',
  },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.34,
      ease: MOTION_EASE,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    filter: 'blur(4px)',
    transition: {
      duration: 0.2,
      ease: MOTION_EASE,
    },
  },
};

const overlayVariants = {
  hidden: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
  },
  show: {
    opacity: 1,
    backdropFilter: 'blur(10px)',
    transition: {
      duration: 0.32,
      ease: MOTION_EASE,
    },
  },
  exit: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
    transition: {
      duration: 0.28,
      ease: MOTION_EASE,
    },
  },
};

const panelVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.972,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.38,
      ease: MOTION_EASE,
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    y: 12,
    scale: 0.968,
    transition: {
      duration: 0.28,
      ease: MOTION_EASE,
      when: 'afterChildren',
    },
  },
};

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
    <Motion.div
      variants={overlayVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="fixed inset-0 z-[90] flex items-center justify-center bg-background/68 px-3 py-4 sm:px-4 sm:py-6"
      onClick={onClose}
      style={{ willChange: 'opacity, backdrop-filter' }}
    >
      <Motion.div
        variants={panelVariants}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-details-title"
        className="surface-panel-strong relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[1.6rem] p-4 sm:max-h-[90vh] sm:rounded-[2.2rem] sm:p-8 lg:p-10"
        onClick={(event) => event.stopPropagation()}
        style={{ willChange: 'opacity, transform' }}
      >
        <span aria-hidden="true" className="project-modal-watermark hidden sm:block">
          {project.index}
        </span>

        <button
          type="button"
          onClick={onClose}
          className="project-modal-close absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/70 text-lg text-foreground transition-transform hover:scale-[1.01] sm:right-4 sm:top-4 sm:h-11 sm:w-11"
          aria-label={`Close details for ${project.name}`}
        >
          &times;
        </button>

        <Motion.div
          initial="hidden"
          animate="show"
          exit="exit"
          variants={modalContentVariants}
          className="relative z-10"
        >
          <Motion.div variants={modalItemVariants} className="pr-10 sm:pr-14">
            <span className="eyebrow">Project {project.index}</span>
            <h3
              id="project-details-title"
              className="mt-5 max-w-[15ch] text-[2rem] font-bold leading-[0.9] tracking-[-0.065em] text-foreground sm:mt-6 sm:text-[3.35rem]"
            >
              {project.name}
            </h3>
            <p className="mt-6 max-w-[38rem] text-[0.98rem] leading-7 text-foreground sm:mt-7 sm:text-[1.1rem] sm:leading-8">
              {project.description}
            </p>
            {project.detail ? (
              <p className="mt-7 max-w-[36rem] text-[0.98rem] leading-7 text-foreground-muted">
                {project.detail}
              </p>
            ) : null}

            <div className="project-modal-trace mt-7">
              <span aria-hidden="true" className="project-signal-dot" />
              <span aria-hidden="true" className="project-signal-line" />
              <span className="project-modal-caption">
                {project.role} / {project.stack.slice(0, 2).join(' / ')}
              </span>
            </div>
          </Motion.div>

          <Motion.div variants={modalItemVariants} className="mt-10 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="grid gap-4">
              <Motion.div variants={modalItemVariants} className="project-detail-panel rounded-[1.5rem] p-5">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                  Role
                </span>
                <p className="mt-3 text-base leading-7 text-foreground">{project.role}</p>
              </Motion.div>

              <Motion.div variants={modalItemVariants} className="project-detail-panel rounded-[1.5rem] p-5">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                  Availability
                </span>
                <p className="mt-3 text-base leading-7 text-foreground">{project.availability}</p>
              </Motion.div>

              <Motion.div variants={modalItemVariants} className="project-detail-panel rounded-[1.5rem] p-5">
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
              </Motion.div>
            </div>

            <div className="grid gap-4">
              {CASE_STUDY_SECTIONS.map((section) => (
                <Motion.div key={section.key} variants={modalItemVariants} className="project-detail-panel rounded-[1.5rem] p-5 sm:p-6">
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                    {section.label}
                  </span>
                  <p className="mt-4 text-base leading-7 text-foreground">
                    {project.caseStudy?.[section.key] ?? project.caseStudy?.approach}
                  </p>
                </Motion.div>
              ))}
            </div>
          </Motion.div>

          <Motion.div variants={modalItemVariants} className="mt-8 flex flex-wrap gap-3 sm:mt-10">
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
          </Motion.div>
        </Motion.div>
      </Motion.div>
    </Motion.div>
  );
}
