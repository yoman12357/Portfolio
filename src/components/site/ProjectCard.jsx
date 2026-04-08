import { motion as Motion } from 'framer-motion';
import ProjectThumbnail from './ProjectThumbnail';
import { MOTION_EASE } from './motion';

export default function ProjectCard({ project, onViewDetails }) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onViewDetails();
    }
  };

  return (
    <Motion.article
      layout
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.28, ease: MOTION_EASE }}
      className="project-card-shell interactive-outline flex h-full cursor-pointer flex-col rounded-[2rem] border border-border p-5 text-left sm:p-6"
      onClick={onViewDetails}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${project.name}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="eyebrow">Project {project.index}</span>
        <span className="rounded-full border border-border bg-background/72 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
          {project.liveUrl ? 'Live' : 'Case Study'}
        </span>
      </div>

      <ProjectThumbnail project={project} compact className="mt-5 aspect-[4/3] w-full rounded-[1.7rem]" />

      <div className="mt-6 flex flex-1 flex-col">
        <h3 className="project-title-clamp text-[1.7rem] font-bold leading-[0.94] tracking-[-0.06em] text-foreground sm:text-[1.9rem]">
          {project.name}
        </h3>
        <p className="project-summary-clamp mt-3 text-[0.98rem] leading-7 text-foreground-muted">
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

        <div className="mt-auto flex items-end justify-between gap-4 pt-7">
          <div className="min-w-0">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-foreground-muted">
              Role
            </p>
            <p className="project-role-clamp mt-2 text-sm leading-6 text-foreground">{project.role}</p>
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onViewDetails();
            }}
            className="project-details-trigger shrink-0"
            aria-label={`Open project details for ${project.name}`}
          >
            View Details
          </button>
        </div>
      </div>
    </Motion.article>
  );
}
