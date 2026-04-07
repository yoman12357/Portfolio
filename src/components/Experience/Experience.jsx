import { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { useReveal } from '../../hooks/useReveal';
import './Experience.css';

const { experience } = portfolioData;

export default function Experience() {
  const { ref, visible } = useReveal();
  const [tab, setTab] = useState('work');

  const entries = tab === 'work' ? experience.work : experience.education;

  return (
    <section id="experience" className="section" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Journey</span>
          <h2 className={`section-title reveal ${visible ? 'visible' : ''}`}>
            Work, campus roles, and the path <span className="accent">so far.</span>
          </h2>
          <p className={`section-subtitle reveal ${visible ? 'visible' : ''}`}>
            A quick look at the environments where I am learning, contributing, and getting more
            comfortable building in public.
          </p>
        </div>

        <div className={`experience__tabs reveal ${visible ? 'visible' : ''}`}>
          <button
            type="button"
            className={`experience__tab ${tab === 'work' ? 'experience__tab--active' : ''}`}
            onClick={() => setTab('work')}
          >
            Work and Roles
          </button>
          <button
            type="button"
            className={`experience__tab ${tab === 'education' ? 'experience__tab--active' : ''}`}
            onClick={() => setTab('education')}
          >
            Education
          </button>
        </div>

        <div className="experience__list">
          {entries.map((entry, index) => (
            <article
              key={`${tab}-${entry.title}-${entry.org}`}
              className={`experience__item glass-card reveal ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="experience__topline">
                <span>{entry.period}</span>
                <span>{entry.location}</span>
              </div>

              <div className="experience__heading">
                <h3>{entry.title}</h3>
                <p>{entry.org}</p>
              </div>

              <p className="experience__desc">{entry.desc}</p>

              <ul className="experience__points">
                {entry.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              <div className="experience__tags">
                {entry.tags.map((tag) => (
                  <span key={tag} className="chip chip--mono">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <span className="section-endnote">Still early in the journey, but already building with more range.</span>
      </div>
    </section>
  );
}
