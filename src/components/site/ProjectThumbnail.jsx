export default function ProjectThumbnail({ project, className = '', compact = false }) {
  const thumbnail = project.thumbnail ?? {};
  const previewTitle = thumbnail.title ?? project.name;
  const previewEyebrow = thumbnail.eyebrow ?? project.role;
  const previewMeta = thumbnail.meta ?? project.availability;
  const previewTags = thumbnail.tags?.length ? thumbnail.tags : project.stack.slice(0, 3);

  if (project.thumbnailImage) {
    return (
      <div className={`project-thumbnail-shell ${className}`}>
        <img
          src={project.thumbnailImage}
          alt={`${project.name} preview`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={`project-thumbnail-shell ${className}`}>
      <div className="project-thumbnail-orbit project-thumbnail-orbit--one" />
      <div className="project-thumbnail-orbit project-thumbnail-orbit--two" />

      <div className="relative z-10 flex h-full flex-col justify-between gap-5 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
            {previewEyebrow}
          </span>
          <span className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-accent">
            {project.index}
          </span>
        </div>

        <div className="project-thumbnail-screen rounded-[1.45rem] p-4 sm:p-5">
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
        </div>

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
    </div>
  );
}
