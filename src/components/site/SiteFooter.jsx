export default function SiteFooter({ profile, footer }) {
  return (
    <footer className="border-t border-border/90 py-8">
      <div className="section-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg font-bold uppercase tracking-[0.18em] text-foreground">
            {profile.name}
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground-muted">{footer.note}</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-foreground-muted">
          {footer.socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-accent"
            >
              {social.name}
            </a>
          ))}
          <span className="hidden h-1 w-1 rounded-full bg-border md:inline-flex" />
          <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
