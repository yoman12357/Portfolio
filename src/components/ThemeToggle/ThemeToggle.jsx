import { useState, useEffect } from 'react';
import './ThemeToggle.css';

export default function ThemeToggle() {
    const [dark, setDark] = useState(() => {
        const saved = localStorage.getItem('portfolio-theme');
        return saved ? saved === 'dark' : true;
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
        localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light');
    }, [dark]);

    return (
        <button
            className="theme-toggle"
            onClick={() => setDark(!dark)}
            aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}
            title={`Switch to ${dark ? 'light' : 'dark'} mode`}
        >
            <div className={`toggle__track ${dark ? '' : 'toggle__track--light'}`}>
                <div className="toggle__thumb">
                    <span className="toggle__icon">{dark ? '🌙' : '☀️'}</span>
                </div>
                <div className="toggle__stars">
                    <span className="toggle__star" style={{ '--x': '6px', '--y': '4px', '--s': '1px' }} />
                    <span className="toggle__star" style={{ '--x': '18px', '--y': '10px', '--s': '1.5px' }} />
                    <span className="toggle__star" style={{ '--x': '12px', '--y': '16px', '--s': '1px' }} />
                </div>
            </div>
        </button>
    );
}
