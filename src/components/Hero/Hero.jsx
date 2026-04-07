import { useEffect, useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import './Hero.css';

const { hero, profile } = portfolioData;

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRoleIndex((value) => (value + 1) % hero.rotatingRoles.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="section hero">
      <div className="container hero__layout">
        <div className="hero__content">
          <span className="eyebrow">{hero.eyebrow}</span>

          <p className="hero__lead">Designing, building, and learning in public.</p>

          <h1 className="hero__title">
            {hero.titleLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>

          <div className="hero__rotator" aria-live="polite">
            <span className="hero__rotator-label">Currently focused on</span>
            <strong key={hero.rotatingRoles[roleIndex]} className="hero__rotator-value">
              {hero.rotatingRoles[roleIndex]}
            </strong>
          </div>

          <p className="hero__intro">{hero.intro}</p>
          <p className="hero__summary">{hero.summary}</p>

          <div className="hero__chips">
            {hero.badges.map((badge) => (
              <span key={badge} className="chip chip--mono">
                {badge}
              </span>
            ))}
          </div>

          <div className="hero__actions">
            <button type="button" className="btn btn-primary" onClick={() => scrollTo('projects')}>
              View Projects
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => scrollTo('contact')}>
              Start a Conversation
            </button>
            <a href={profile.resumeUrl} download className="btn btn-secondary">
              Download Resume
            </a>
          </div>

          <div className="hero__stats">
            {hero.stats.map((stat) => (
              <div key={stat.label} className="hero__stat glass-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <aside className="hero__panel glass-card">
          <div className="hero__portrait">
            <img src={profile.profileImage} alt={profile.name} />
          </div>

          <div className="hero__panel-copy">
            <span className="section-tag">{hero.spotlight.label}</span>
            <p>{hero.spotlight.text}</p>
          </div>

          <div className="hero__details">
            <div>
              <span>Role</span>
              <strong>{profile.role}</strong>
            </div>
            <div>
              <span>Education</span>
              <strong>{profile.secondaryRole}</strong>
            </div>
            <div>
              <span>Location</span>
              <strong>{profile.location}</strong>
            </div>
          </div>

          <div className="hero__socials">
            {profile.socials.slice(0, 2).map((social) => (
              <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer">
                {social.name}
              </a>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
