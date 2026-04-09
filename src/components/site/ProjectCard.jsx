import { memo, useCallback, useMemo } from 'react';
import { motion as Motion } from 'framer-motion';
import Magnetic from './Magnetic';
import ProjectThumbnail from './ProjectThumbnail';
import { MOTION_EASE } from './motion';

const cardHoverVariants = {
  rest: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.012,
    y: -4,
    transition: {
      duration: 0.28,
      ease: MOTION_EASE,
    },
  },
  tap: {
    scale: 0.998,
    y: -1,
    transition: {
      duration: 0.16,
      ease: MOTION_EASE,
    },
  },
};

const textShiftVariants = {
  rest: {
    y: 0,
  },
  hover: {
    y: -2,
    transition: {
      duration: 0.28,
      ease: MOTION_EASE,
    },
  },
};

function ProjectCard({ project, onViewDetails }) {
  const statusLabel = useMemo(() => (project.liveUrl ? 'Launch Ready' : 'Case Notes'), [project.liveUrl]);
  const signalLabel = useMemo(() => project.stack.slice(0, 2).join(' / ') || project.role, [project.role, project.stack]);

  const handleOpenDetails = useCallback(() => {
    onViewDetails(project);
  }, [onViewDetails, project]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleOpenDetails();
    }
  }, [handleOpenDetails]);

  return (
    <Magnetic className="magnetic-shell--fluid h-full" strength={8}>
      <Motion.article
        layout
        initial="rest"
        animate="rest"
        whileHover="hover"
        whileFocus="hover"
        whileTap="tap"
        variants={cardHoverVariants}
        transition={{ layout: { duration: 0.56, ease: MOTION_EASE } }}
        className="project-card-shell interactive-outline flex h-full cursor-pointer flex-col rounded-[1.75rem] border border-border p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/28 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:rounded-[2rem] sm:p-6"
        onClick={handleOpenDetails}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${project.name}`}
        aria-haspopup="dialog"
      >
        <div className="relative z-10 flex items-start justify-between gap-3 sm:items-center">
          <span className="eyebrow">Project {project.index}</span>
          <Motion.span variants={textShiftVariants} className="project-status-badge">
            {statusLabel}
          </Motion.span>
        </div>

        <Motion.div variants={textShiftVariants} className="project-signal-row relative z-10 mt-4 min-w-0 sm:mt-5">
          <span aria-hidden="true" className="project-signal-dot" />
          <span aria-hidden="true" className="project-signal-line" />
          <span className="project-signal-label">{signalLabel}</span>
        </Motion.div>

        <ProjectThumbnail
          project={project}
          compact
          className="relative z-10 mt-5 aspect-[4/3] w-full rounded-[1.45rem] sm:rounded-[1.7rem]"
        />

        <Motion.div variants={textShiftVariants} className="relative z-10 mt-6 flex flex-1 flex-col">
          <h3 className="project-title-clamp text-[1.35rem] font-bold leading-[1] tracking-[-0.04em] text-foreground sm:text-[1.75rem]">
            {project.name}
          </h3>
          <p className="project-summary-clamp mt-3 text-[0.96rem] leading-[1.72] text-foreground-muted">
            {project.summary ?? project.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            {project.stack.slice(0, 3).map((item) => (
              <span
                key={item}
                className="project-stack-tag rounded-full px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em]"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-col items-start justify-between gap-5 pt-6 sm:flex-row sm:items-end sm:gap-4 sm:pt-7">
            <div className="min-w-0">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-foreground-muted">
                Role
              </p>
              <p className="project-role-clamp mt-2 text-sm leading-6 text-foreground">{project.role}</p>
            </div>

            <Motion.span
              variants={textShiftVariants}
              aria-hidden="true"
              className="shrink-0 rounded-full border border-accent/22 bg-accent/[0.08] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-accent"
            >
              <span>View Details</span>
              <span aria-hidden="true" className="text-[0.72rem] tracking-[0.18em]">
                /
              </span>
            </Motion.span>
          </div>
        </Motion.div>
      </Motion.article>
    </Magnetic>
  );
}

export default memo(ProjectCard);
