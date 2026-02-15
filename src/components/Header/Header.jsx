import { useState, useEffect } from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Header.css';

const links = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Journey' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'github', label: 'GitHub' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState('hero');

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 50);
            let current = 'hero';
            links.forEach(({ id }) => {
                const sec = document.getElementById(id);
                if (sec && window.scrollY >= sec.offsetTop - 200) current = id;
            });
            setActive(current);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setOpen(false);
    };

    return (
        <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
            <div className="header__inner">
                <a href="#hero" className="logo" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>
                    <span className="logo__bracket">&lt;</span>AB<span className="logo__bracket">/&gt;</span>
                </a>
                <nav className={`nav ${open ? 'nav--open' : ''}`}>
                    {links.map(({ id, label }) => (
                        <a
                            key={id}
                            href={`#${id}`}
                            className={`nav__link ${active === id ? 'nav__link--active' : ''}`}
                            onClick={(e) => { e.preventDefault(); scrollTo(id); }}
                        >
                            {label}
                        </a>
                    ))}
                </nav>
                <div className="header__actions">
                    <ThemeToggle />
                    <button
                        className={`hamburger ${open ? 'hamburger--active' : ''}`}
                        onClick={() => setOpen(!open)}
                        aria-label="Toggle navigation"
                    >
                        <span /><span /><span />
                    </button>
                </div>
            </div>
        </header>
    );
}
