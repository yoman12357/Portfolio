import { useEffect, useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Header.css';

const { navigation, profile } = portfolioData;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 28);

      let current = 'hero';
      navigation.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section && window.scrollY >= section.offsetTop - 220) {
          current = id;
        }
      });

      setActive(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner glass-card">
        <a
          href="#hero"
          className="header__brand"
          onClick={(event) => {
            event.preventDefault();
            scrollTo('hero');
          }}
        >
          <span className="header__brand-mark">{profile.initials}</span>
          <span className="header__brand-copy">
            <strong>{profile.name}</strong>
            <small>{profile.role}</small>
          </span>
        </a>

        <nav className={`header__nav ${open ? 'header__nav--open' : ''}`}>
          {navigation.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`header__link ${active === id ? 'header__link--active' : ''}`}
              onClick={(event) => {
                event.preventDefault();
                scrollTo(id);
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <ThemeToggle />

          <a href={profile.resumeUrl} download className="header__resume">
            Resume
          </a>

          <button
            type="button"
            className={`header__menu ${open ? 'header__menu--open' : ''}`}
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
