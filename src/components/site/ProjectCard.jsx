import { motion as Motion } from 'framer-motion';
import Magnetic from './Magnetic';
import { MOTION_EASE } from './motion';

const CASE_STUDY_SECTIONS = [
  { key: 'problem', label: 'Problem' },
  { key: 'approach', label: 'Approach' },
  { key: 'impact', label: 'Impact' },
];

function ProjectAction({ href, label, projectName, disabled = false, primary = false, onClick }) {
  const className = primary
    ? 'project-action project-action--primary inline-flex items-center justify-center gap-2'
    : 'project-action project-action--secondary inline-flex items-center justify-center gap-2';

  if (onClick) {
    return (
      <Magnetic strength={primary ? 10 : 8}>
        <button
          type="button"
          onClick={onClick}
          className={className}
          aria-label={`${label} for ${projectName}`}
        >
          <span>{label}</span>
          <span aria-hidden="true" className="text-[0.72rem] tracking-[0.18em]">/</span>
        </button>
      </Magnetic>
    );
  }

  if (disabled) {
    return (
      <button
        type="button"
        disabled
        className="project-action project-action--disabled inline-flex items-center justify-center gap-2"
        aria-label={`${label} unavailable for ${projectName}`}
      >
        <span>{label}</span>
        <span aria-hidden="true" className="text-[0.72rem] tracking-[0.18em]">/</span>
      </button>
    );
  }

  return (
    <Magnetic strength={primary ? 10 : 8}>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className}
        aria-label={`${label} for ${projectName}`}
      >
        <span>{label}</span>
        <span aria-hidden="true" className="text-[0.72rem] tracking-[0.18em]">/</span>
      </a>
    </Magnetic>
  );
}

function StackTags({ stack }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2.5">
      {stack.map((item) => (
        <span
          key={item}
          className="project-stack-tag rounded-full px-3 py-1.5 text-xs font-medium tracking-[0.02em]"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function CaseStudyPreview({ caseStudy, featured = false }) {
  return (
    <div className={`mt-8 grid gap-3 ${featured ? 'sm:grid-cols-3' : ''}`}>
      {CASE_STUDY_SECTIONS.map((section) => (
        <div key={section.key} className="project-detail-panel rounded-[1.35rem] p-4">
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
            {section.label}
          </span>
          <p className="mt-3 text-sm leading-6 text-foreground-muted">
            {caseStudy[section.key]}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function ProjectCard({ project, featured = false, onViewDetails }) {
  return (
    <Motion.article
      whileHover={{ y: -6, scale: 1.012 }}
      transition={{ duration: 0.28, ease: MOTION_EASE }}
      className={`project-card-shell surface-panel interactive-outline rounded-[2rem] p-5 sm:p-7 ${
        featured ? 'lg:p-9' : 'h-full'
      }`}
    >
      <span
        aria-hidden="true"
        className={`project-index-mark pointer-events-none absolute right-5 top-5 select-none sm:right-7 sm:top-6 ${
          featured ? 'opacity-100' : 'opacity-90'
        }`}
      >
        {project.index}
      </span>

      <div className="relative z-10">
        <div className={`flex max-w-[calc(100%-4.25rem)] flex-wrap items-center gap-3 ${featured ? 'justify-between' : ''}`}>
          <span className="eyebrow">Project {project.index}</span>
          {featured ? (
            <span className="rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              Featured Project
            </span>
          ) : (
            <span className="rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
              {project.availability}
            </span>
          )}
        </div>

        {featured ? (
          <div className="mt-9 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-11">
            <div>
              <h3 className="max-w-[15ch] text-[2.6rem] font-bold leading-[0.88] tracking-[-0.078em] text-foreground sm:text-[3.1rem] lg:text-[3.8rem]">
                {project.name}
              </h3>
              <p className="mt-8 max-w-[33rem] text-[1.04rem] leading-[1.9] text-foreground sm:text-[1.1rem]">
                {project.description}
              </p>
              {project.detail ? (
                <p className="mt-7 max-w-[32rem] text-[0.99rem] leading-[1.9] text-foreground-muted">{project.detail}</p>
              ) : null}

              <CaseStudyPreview caseStudy={project.caseStudy} featured />

              <div className="editorial-line mt-9 max-w-40" />

              <div className="mt-9 flex flex-wrap gap-3">
                <ProjectAction
                  href={project.liveUrl}
                  label="Live Demo"
                  projectName={project.name}
                  primary
                  disabled={!project.liveUrl}
                />
                <ProjectAction
                  label="View Details"
                  projectName={project.name}
                  onClick={onViewDetails}
                />
                <ProjectAction href={project.githubUrl} label="GitHub" projectName={project.name} />
              </div>

              {!project.liveUrl ? (
                <p className="mt-4 text-sm leading-6 text-foreground-muted">
                  No public live demo is available for this project yet.
                </p>
              ) : null}
            </div>

            <div className="grid gap-4">
              <div className="project-detail-panel rounded-[1.6rem] p-5 sm:p-6">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                  Role
                </span>
                <p className="mt-3 text-[1.02rem] font-semibold leading-7 text-foreground">{project.role}</p>
              </div>

              <div className="project-detail-panel rounded-[1.6rem] p-5 sm:p-6">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                  Tech Stack
                </span>
                <StackTags stack={project.stack} />
              </div>

              <div className="project-detail-panel rounded-[1.6rem] p-5 sm:p-6">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                  Availability
                </span>
                <p className="mt-3 text-base leading-7 text-foreground">{project.availability}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 flex h-full flex-col">
            <h3 className="max-w-[14ch] text-[2.25rem] font-bold leading-[0.9] tracking-[-0.068em] text-foreground sm:max-w-[15ch] sm:text-[2.65rem]">
              {project.name}
            </h3>
            <p className="mt-7 max-w-[28rem] text-[0.99rem] leading-[1.9] text-foreground-muted">{project.description}</p>

            <CaseStudyPreview caseStudy={project.caseStudy} />

            <div className="editorial-line mt-8 max-w-24" />

            <div className="mt-8 grid gap-4">
              <div className="project-detail-panel rounded-[1.45rem] p-4">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                  Role
                </span>
                <p className="mt-3 text-sm leading-7 text-foreground">{project.role}</p>
              </div>

              <div>
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
                  Tech Stack
                </span>
                <StackTags stack={project.stack} />
              </div>
            </div>

            <div className="mt-auto pt-10">
              <div className="flex flex-wrap gap-3">
                <ProjectAction
                  href={project.liveUrl}
                  label="Live Demo"
                  projectName={project.name}
                  primary
                  disabled={!project.liveUrl}
                />
                <ProjectAction
                  label="View Details"
                  projectName={project.name}
                  onClick={onViewDetails}
                />
                <ProjectAction href={project.githubUrl} label="GitHub" projectName={project.name} />
              </div>
            </div>
          </div>
        )}
      </div>
    </Motion.article>
  );
}
