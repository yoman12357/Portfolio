import { memo } from 'react';
import { motion as Motion } from 'framer-motion';
import { MOTION_EASE } from './motion';

const thumbnailShellVariants = {
  rest: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.008,
    y: -2,
    transition: {
      duration: 0.28,
      ease: MOTION_EASE,
    },
  },
};

const thumbnailScreenVariants = {
  rest: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.018,
    y: -2,
    transition: {
      duration: 0.28,
      ease: MOTION_EASE,
    },
  },
};

const thumbnailOverlayVariants = {
  rest: {
    opacity: 0.05,
  },
  hover: {
    opacity: 0.12,
    transition: {
      duration: 0.28,
      ease: MOTION_EASE,
    },
  },
};

const thumbnailOrbitVariants = {
  rest: {
    scale: 1,
    opacity: 0.52,
  },
  hover: {
    scale: 1.04,
    opacity: 0.62,
    transition: {
      duration: 0.32,
      ease: MOTION_EASE,
    },
  },
};

function ProjectThumbnail({ project, className = '', compact = false }) {
  const thumbnail = project.thumbnail ?? {};
  const previewTitle = thumbnail.title ?? project.name;
  const previewEyebrow = thumbnail.eyebrow ?? project.role;
  const previewMeta = thumbnail.meta ?? project.availability;
  const previewTags = thumbnail.tags?.length ? thumbnail.tags : project.stack.slice(0, 3);

  if (project.thumbnailImage) {
    return (
      <Motion.div variants={thumbnailShellVariants} className={`project-thumbnail-shell ${className}`}>
        <Motion.div variants={thumbnailOverlayVariants} className="project-thumbnail-overlay" />
        <Motion.img
          src={project.thumbnailImage}
          alt={`${project.name} preview`}
          loading="lazy"
          decoding="async"
          sizes="(min-width: 1536px) 24vw, (min-width: 768px) 42vw, 92vw"
          variants={thumbnailScreenVariants}
          className="project-thumbnail-image h-full w-full object-cover"
        />
      </Motion.div>
    );
  }

  return (
    <Motion.div variants={thumbnailShellVariants} className={`project-thumbnail-shell ${className}`}>
      <Motion.div variants={thumbnailOrbitVariants} className="project-thumbnail-orbit project-thumbnail-orbit--one" />
      <Motion.div variants={thumbnailOrbitVariants} className="project-thumbnail-orbit project-thumbnail-orbit--two" />
      <Motion.div variants={thumbnailOverlayVariants} className="project-thumbnail-overlay" />

      <div className="relative z-10 flex h-full flex-col justify-between gap-5 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
            {previewEyebrow}
          </span>
          <span className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-accent">
            {project.index}
          </span>
        </div>

        <Motion.div variants={thumbnailScreenVariants} className="project-thumbnail-screen rounded-[1.45rem] p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <span className="project-thumbnail-dot" />
            <span className="project-thumbnail-dot" />
            <span className="project-thumbnail-dot" />
          </div>

          <div className="mt-5">
            <p className="text-lg font-semibold leading-tight text-foreground sm:text-[1.15rem]">
              {previewTitle}
            </p>
            <p className={`mt-2 text-sm leading-6 text-foreground-muted ${compact ? 'project-summary-clamp' : ''}`}>
              {previewMeta}
            </p>
          </div>

          <div className="mt-5 space-y-2.5">
            <div className="h-2 rounded-full bg-accent/24" style={{ width: '44%' }} />
            <div className="h-2 rounded-full bg-foreground/[0.1]" style={{ width: '82%' }} />
            <div className="h-2 rounded-full bg-foreground/[0.08]" style={{ width: '64%' }} />
          </div>
        </Motion.div>

        <div className="flex flex-wrap gap-2">
          {previewTags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-background/72 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-foreground-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Motion.div>
  );
}

export default memo(ProjectThumbnail);
