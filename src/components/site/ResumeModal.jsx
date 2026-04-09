import { motion as Motion } from 'framer-motion';
import { useEffect, useMemo } from 'react';
import { MOTION_EASE } from './motion';

const overlayVariants = {
  hidden: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
  },
  show: {
    opacity: 1,
    backdropFilter: 'blur(10px)',
    transition: {
      duration: 0.28,
      ease: MOTION_EASE,
    },
  },
  exit: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
    transition: {
      duration: 0.22,
      ease: MOTION_EASE,
    },
  },
};

const panelVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.982,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.32,
      ease: MOTION_EASE,
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.98,
    transition: {
      duration: 0.22,
      ease: MOTION_EASE,
      when: 'afterChildren',
    },
  },
};

const contentVariants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.04,
      staggerChildren: 0.05,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.24,
      ease: MOTION_EASE,
    },
  },
  exit: {
    opacity: 0,
    y: 6,
    transition: {
      duration: 0.16,
      ease: MOTION_EASE,
    },
  },
};

function ResumeSection({ label, title, children, className = '' }) {
  return (
    <section className={`surface-panel rounded-[1.35rem] p-4 sm:rounded-[1.6rem] sm:p-5 md:rounded-[1.8rem] md:p-6 ${className}`.trim()}>
      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-foreground-muted">
        {label}
      </span>
      <h3 className="mt-3 text-[1.08rem] font-bold tracking-[-0.04em] text-foreground sm:text-[1.18rem] md:text-[1.35rem]">
        {title}
      </h3>
      <div className="mt-4 md:mt-5">{children}</div>
    </section>
  );
}

function MetaPill({ label, value }) {
  return (
    <div className="rounded-[1rem] border border-border bg-background/78 px-3.5 py-3">
      <p className="text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-foreground-muted sm:text-[0.68rem]">
        {label}
      </p>
      <p className="mt-1.5 text-[0.92rem] font-semibold leading-5 text-foreground sm:text-[0.96rem]">
        {value}
      </p>
    </div>
  );
}

function SkillTag({ children, accent = false }) {
  return (
    <span
      className={`rounded-full border px-3 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.14em] sm:text-[0.72rem] sm:tracking-[0.16em] ${
        accent
          ? 'border-accent/28 bg-accent/[0.08] text-accent'
          : 'border-border bg-background/76 text-foreground-muted'
      }`}
    >
      {children}
    </span>
  );
}

function QuickLink({ label, value, href }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      className="flex items-center justify-between gap-3 rounded-[1.2rem] border border-border bg-background/76 px-4 py-4 text-left transition-colors duration-300 hover:border-accent/34 hover:text-accent"
    >
      <div className="min-w-0">
        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-foreground-muted sm:text-[0.72rem] sm:tracking-[0.22em]">
          {label}
        </p>
        <p className="mt-2 truncate text-[0.9rem] font-semibold text-foreground sm:text-sm">{value}</p>
      </div>
      <span aria-hidden="true" className="shrink-0 text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-accent sm:text-[0.72rem] sm:tracking-[0.22em]">
        Open
      </span>
    </a>
  );
}

export default function ResumeModal({
  profile,
  hero,
  about,
  skills,
  securityFocus,
  projects,
  experience,
  onClose,
}) {
  const educationItem = useMemo(
    () => experience.timeline.find((item) => item.type === 'Education'),
    [experience.timeline]
  );

  const featuredProjects = useMemo(() => projects.items.slice(0, 3), [projects.items]);
  const roleItems = useMemo(
    () => experience.timeline.filter((item) => item.type !== 'Education').slice(0, 2),
    [experience.timeline]
  );

  const developmentSkills = useMemo(
    () => skills.categories.find((category) => category.eyebrow === 'Development')?.items ?? [],
    [skills.categories]
  );

  const securitySkills = useMemo(
    () => skills.categories.find((category) => category.eyebrow === 'Cybersecurity')?.items ?? [],
    [skills.categories]
  );

  const toolSkills = useMemo(
    () => skills.categories.find((category) => category.eyebrow === 'Tools & Technologies')?.items ?? [],
    [skills.categories]
  );

  const credentials = useMemo(() => experience.credentials.slice(0, 4), [experience.credentials]);
  const communities = useMemo(() => experience.associations.slice(0, 4), [experience.associations]);

  const quickLinks = useMemo(
    () => [
      {
        label: 'Email',
        value: profile.email,
        href: `mailto:${profile.email}`,
      },
      {
        label: 'Phone',
        value: profile.phone,
        href: `tel:${profile.phone.replace(/\s+/g, '')}`,
      },
      {
        label: 'GitHub',
        value: profile.githubUrl.replace(/^https?:\/\//, ''),
        href: profile.githubUrl,
      },
      {
        label: 'LinkedIn',
        value: profile.linkedinUrl.replace(/^https?:\/\//, ''),
        href: profile.linkedinUrl,
      },
      {
        label: 'Resume PDF',
        value: 'Open in new tab',
        href: profile.resumeUrl,
      },
    ],
    [profile.email, profile.githubUrl, profile.linkedinUrl, profile.phone, profile.resumeUrl]
  );

  const topMeta = useMemo(
    () =>
      [
        { label: 'Based in', value: profile.location },
        { label: 'Availability', value: hero.badges[0] ?? 'Open to internships' },
        { label: 'Education', value: educationItem?.org ?? 'NITK' },
        { label: 'Focus', value: 'Frontend + Security' },
      ],
    [educationItem?.org, hero.badges, profile.location]
  );

  useEffect(() => {
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
  }, [onClose]);

  return (
    <Motion.div
      variants={overlayVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="fixed inset-0 z-[95] flex items-center justify-center bg-background/64 px-2 py-2 sm:px-4 sm:py-4 lg:px-5 lg:py-5"
      onClick={onClose}
    >
      <Motion.div
        variants={panelVariants}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-modal-title"
        className="surface-panel-strong relative flex h-[93vh] max-h-[93vh] w-full max-w-6xl flex-col overflow-hidden rounded-[1.45rem] p-3 sm:h-[91vh] sm:max-h-[91vh] sm:rounded-[1.9rem] sm:p-5 md:h-[min(90vh,58rem)] md:max-h-[90vh] md:rounded-[2.1rem] md:p-6 lg:p-7"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close resume preview"
          className="project-modal-close absolute right-2.5 top-2.5 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/82 text-base text-foreground transition-transform hover:scale-[1.01] sm:right-3.5 sm:top-3.5 sm:h-10 sm:w-10 sm:text-lg md:right-4 md:top-4 md:h-11 md:w-11"
        >
          &times;
        </button>

        <Motion.div variants={contentVariants} initial="hidden" animate="show" exit="exit" className="flex h-full min-h-0 flex-col">
          <Motion.div variants={itemVariants} className="border-b border-border/80 pb-4 pr-10 sm:pb-5 sm:pr-12 md:pr-14">
            <div className="grid gap-4 xl:grid-cols-[1.16fr_0.84fr] xl:items-start">
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-sm font-bold tracking-[0.18em] text-background">
                    {profile.initials}
                  </span>
                  <span className="eyebrow"></span>
                </div>

                <h2
                  id="resume-modal-title"
                  className="mt-4 max-w-[12ch] text-[clamp(1.9rem,7vw,4rem)] font-bold leading-[0.92] tracking-[-0.06em] text-foreground"
                >
                  {profile.name}
                </h2>
                <p className="mt-2 text-[0.92rem] font-semibold text-accent sm:text-[0.98rem] md:text-[1.04rem]">
                  {profile.role}
                </p>
                <p className="mt-3 max-w-[34rem] text-[0.9rem] leading-6 text-foreground-muted sm:text-[0.94rem] md:text-[0.98rem]">
                  {hero.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {hero.badges.slice(0, 3).map((badge, index) => (
                    <SkillTag key={badge} accent={index === 0}>
                      {badge}
                    </SkillTag>
                  ))}
                </div>
              </div>

              <div className="surface-panel rounded-[1.35rem] p-4 sm:rounded-[1.6rem] sm:p-5">
                <div className="grid gap-4 min-[500px]:grid-cols-[5.75rem_1fr] min-[500px]:items-start">
                  <div className="mx-auto w-full max-w-[5.75rem] overflow-hidden rounded-[1.2rem] border border-border bg-background/78">
                    <picture>
                      <source srcSet={profile.profileImageAvif} type="image/avif" />
                      <source srcSet={profile.profileImage} type="image/webp" />
                      <img
                        src={profile.profileImageFallback}
                        alt={profile.name}
                        width="320"
                        height="400"
                        decoding="async"
                        className="aspect-[4/5] w-full object-cover"
                      />
                    </picture>
                  </div>

                  <div className="min-w-0">
                    <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-foreground-muted sm:text-[0.72rem]">
                      Best fit
                    </p>
                    <p className="mt-2 text-[1rem] font-bold leading-6 tracking-[-0.03em] text-foreground sm:text-[1.08rem]">
                      {profile.secondaryRole}
                    </p>
                    <p className="mt-3 text-[0.9rem] leading-6 text-foreground-muted">
                      {hero.whyMe}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid gap-2.5 min-[480px]:grid-cols-2">
                  {topMeta.map((item) => (
                    <MetaPill key={item.label} label={item.label} value={item.value} />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2">
                <SkillTag>{profile.location}</SkillTag>
                <SkillTag>{educationItem?.org ?? 'NITK'}</SkillTag>
                <SkillTag accent>Security-Aware Development</SkillTag>
              </div>

              <div className="flex flex-col gap-2.5 min-[480px]:flex-row">
                <a href={`mailto:${profile.email}`} className="button-primary w-full min-[480px]:w-auto">
                  Contact Me <span aria-hidden="true">/</span>
                </a>
                <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="button-secondary w-full min-[480px]:w-auto">
                  Open PDF <span aria-hidden="true">/</span>
                </a>
              </div>
            </div>
          </Motion.div>

          <Motion.div variants={itemVariants} className="mt-3 min-h-0 flex-1 overflow-y-auto pr-0.5 sm:mt-4 sm:pr-1 overscroll-contain">
            <div className="grid gap-3 sm:gap-4 lg:grid-cols-[1.04fr_0.96fr]">
              <div className="space-y-3 sm:space-y-4">
                <ResumeSection label="Strengths" title="What I bring to a team">
                  <div className="grid gap-3 md:grid-cols-3">
                    {about.strengths.slice(0, 3).map((strength, index) => (
                      <article
                        key={strength.title}
                        className={`rounded-[1.2rem] border px-4 py-4 ${
                          index === 1
                            ? 'border-accent/28 bg-accent/[0.08]'
                            : 'border-border bg-background/76'
                        }`}
                      >
                        <p className={`text-[0.88rem] font-bold leading-5 tracking-[-0.02em] ${index === 1 ? 'text-accent' : 'text-foreground'}`}>
                          {strength.title}
                        </p>
                        <p className="mt-3 text-[0.88rem] leading-6 text-foreground-muted">
                          {strength.description}
                        </p>
                      </article>
                    ))}
                  </div>
                </ResumeSection>

                <ResumeSection label="Experience" title="Recent experience">
                  <div className="space-y-3 sm:space-y-4">
                    {roleItems.map((item) => (
                      <article key={`${item.title}-${item.org}`} className="rounded-[1.2rem] border border-border bg-background/76 px-4 py-4">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <h4 className="text-[0.98rem] font-bold tracking-[-0.03em] text-foreground sm:text-[1rem]">
                              {item.title}
                            </h4>
                            <p className="mt-1 text-sm font-medium text-accent">{item.org}</p>
                          </div>
                          <span className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-foreground-muted sm:text-[0.68rem] sm:tracking-[0.22em]">
                            {item.period}
                          </span>
                        </div>

                        <p className="mt-3 text-[0.9rem] leading-6 text-foreground-muted sm:text-sm">
                          {item.summary}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <SkillTag key={tag}>{tag}</SkillTag>
                          ))}
                        </div>
                      </article>
                    ))}

                    {educationItem ? (
                      <div className="rounded-[1.2rem] border border-border bg-background/76 px-4 py-4">
                        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-foreground-muted sm:text-[0.72rem] sm:tracking-[0.22em]">
                          Education
                        </p>
                        <p className="mt-2 text-[0.98rem] font-bold tracking-[-0.03em] text-foreground">
                          {educationItem.title}
                        </p>
                        <p className="mt-1 text-sm font-medium text-accent">{educationItem.org}</p>
                        <p className="mt-3 text-[0.9rem] leading-6 text-foreground-muted sm:text-sm">
                          {educationItem.summary}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </ResumeSection>

                <ResumeSection label="Projects" title="Selected work that shows range">
                  <div className="space-y-3 sm:space-y-4">
                    {featuredProjects.map((project) => (
                      <article key={project.name} className="rounded-[1.2rem] border border-border bg-background/76 px-4 py-4">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <h4 className="text-[0.98rem] font-bold tracking-[-0.03em] text-foreground sm:text-[1rem]">
                              {project.name}
                            </h4>
                            <p className="mt-1 text-sm font-medium text-accent">{project.role}</p>
                          </div>
                          <span className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-foreground-muted sm:text-[0.68rem] sm:tracking-[0.22em]">
                            {project.availability}
                          </span>
                        </div>

                        <p className="mt-3 text-[0.9rem] leading-6 text-foreground-muted sm:text-sm">
                          {project.summary}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.stack.slice(0, 3).map((item) => (
                            <SkillTag key={item} accent={project.featured}>
                              {item}
                            </SkillTag>
                          ))}
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2.5">
                          {project.githubUrl ? (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center justify-center rounded-full border border-border bg-background/82 px-3.5 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-foreground transition-colors duration-300 hover:border-accent/34 hover:text-accent"
                            >
                              GitHub
                            </a>
                          ) : null}

                          {project.liveUrl ? (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center justify-center rounded-full border border-accent/24 bg-accent/[0.08] px-3.5 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent transition-colors duration-300 hover:border-accent/40 hover:bg-accent/[0.12]"
                            >
                              Live Demo
                            </a>
                          ) : null}
                        </div>
                      </article>
                    ))}
                  </div>
                </ResumeSection>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <ResumeSection label="Technical Stack" title="Development + security foundations">
                  <div className="space-y-4">
                    <div>
                      <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-foreground-muted sm:text-[0.72rem] sm:tracking-[0.22em]">
                        Development
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2.5">
                        {developmentSkills.map((item) => (
                          <SkillTag key={item}>{item}</SkillTag>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-foreground-muted sm:text-[0.72rem] sm:tracking-[0.22em]">
                        Cybersecurity
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2.5">
                        {securitySkills.map((item) => (
                          <SkillTag key={item} accent>
                            {item}
                          </SkillTag>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-foreground-muted sm:text-[0.72rem] sm:tracking-[0.22em]">
                        Tools
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2.5">
                        {toolSkills.map((item) => (
                          <SkillTag key={item}>{item}</SkillTag>
                        ))}
                      </div>
                    </div>
                  </div>
                </ResumeSection>

                <ResumeSection label="Security Focus" title="Security-aware engineering mindset">
                  <div className="grid gap-3 min-[520px]:grid-cols-2">
                    {securityFocus.items.slice(0, 4).map((item) => (
                      <article key={item.title} className="rounded-[1.2rem] border border-border bg-background/76 px-4 py-4">
                        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-accent sm:text-[0.72rem] sm:tracking-[0.22em]">
                          {item.eyebrow}
                        </p>
                        <p className="mt-2 text-[0.92rem] font-bold leading-5 tracking-[-0.02em] text-foreground">
                          {item.title}
                        </p>
                        <p className="mt-3 text-[0.88rem] leading-6 text-foreground-muted">
                          {item.description}
                        </p>
                      </article>
                    ))}
                  </div>
                </ResumeSection>

                <ResumeSection label="Credentials" title="Learning momentum and communities">
                  <div className="space-y-4">
                    <div>
                      <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-foreground-muted sm:text-[0.72rem] sm:tracking-[0.22em]">
                        Certifications and coursework
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2.5">
                        {credentials.map((item) => (
                          <SkillTag key={item}>{item}</SkillTag>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-foreground-muted sm:text-[0.72rem] sm:tracking-[0.22em]">
                        Communities
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2.5">
                        {communities.map((item) => (
                          <SkillTag key={item} accent={item.toLowerCase().includes('cyber')}>
                            {item}
                          </SkillTag>
                        ))}
                      </div>
                    </div>
                  </div>
                </ResumeSection>

                <ResumeSection label="Contact" title="Reach out directly">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {quickLinks.map((link) => (
                      <QuickLink key={link.label} {...link} />
                    ))}
                  </div>
                </ResumeSection>
              </div>
            </div>
          </Motion.div>
        </Motion.div>
      </Motion.div>
    </Motion.div>
  );
}
