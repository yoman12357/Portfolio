import { memo } from 'react';

function SiteFooter({ profile, footer, onOpenResume }) {
  return (
    <footer className="border-t border-border/90 py-7 sm:py-8">
      <div className="section-shell flex flex-col gap-5 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div className="mx-auto md:mx-0">
          <p className="font-display text-lg font-bold uppercase tracking-[0.18em] text-foreground">
            {profile.name}
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground-muted">{footer.note}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-foreground-muted md:justify-end">
          {footer.socials.map((social) => (
            social.name === 'Resume' ? (
              <button
                key={social.name}
                type="button"
                onClick={onOpenResume}
                className="inline-flex min-h-10 items-center justify-center rounded-full border border-border bg-background/72 px-4 py-2 font-medium transition-colors duration-300 hover:border-accent/35 hover:text-accent"
              >
                {social.name}
              </button>
            ) : (
              <a
                key={social.name}
                href={social.url}
                target={social.url.startsWith('http') ? '_blank' : undefined}
                rel={social.url.startsWith('http') ? 'noreferrer' : undefined}
                className="inline-flex min-h-10 items-center justify-center rounded-full border border-border bg-background/72 px-4 py-2 font-medium transition-colors duration-300 hover:border-accent/35 hover:text-accent"
              >
                {social.name}
              </a>
            )
          ))}
          <span className="basis-full text-xs uppercase tracking-[0.18em] text-foreground-muted/90 md:ml-1 md:basis-auto">
            &copy; {new Date().getFullYear()} All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default memo(SiteFooter);
