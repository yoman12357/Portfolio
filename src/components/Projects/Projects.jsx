import { useEffect, useMemo, useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { useReveal } from '../../hooks/useReveal';
import './Projects.css';

const { projects, profile } = portfolioData;

function formatRepoName(name) {
  return name
    .split(/[-_]/g)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export default function Projects() {
  const { ref, visible } = useReveal();
  const [liveRepos, setLiveRepos] = useState([]);

  useEffect(() => {
    let cancelled = false;

    const loadRepos = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${profile.githubUsername}/repos?sort=updated&per_page=6`
        );
        const data = await response.json();

        if (!cancelled && Array.isArray(data)) {
          const selected = data
            .filter((repo) => !repo.fork)
            .sort((left, right) => {
              const starDiff = right.stargazers_count - left.stargazers_count;
              if (starDiff !== 0) {
                return starDiff;
              }

              return new Date(right.updated_at) - new Date(left.updated_at);
            })
            .slice(0, 2)
            .map((repo) => ({
              title: formatRepoName(repo.name),
              description: repo.description || 'Repository available on GitHub.',
              stack: [
                repo.language || 'Code',
                `${repo.stargazers_count} stars`,
                `${repo.forks_count} forks`,
              ],
              category: 'Live from GitHub',
              github: repo.html_url,
              live: repo.homepage || null,
            }));

          setLiveRepos(selected);
        }
      } catch (error) {
        if (!cancelled) {
          console.error('Project fetch error:', error);
        }
      }
    };

    loadRepos();

    return () => {
      cancelled = true;
    };
  }, []);

  const cards = useMemo(() => {
    const fallbackCards = projects.fallback.map((item) => ({
      ...item,
      github: `https://github.com/${profile.githubUsername}`,
      live: null,
    }));

    return [...fallbackCards, ...liveRepos];
  }, [liveRepos]);

  return (
    <section id="projects" className="section" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Projects</span>
          <h2 className={`section-title reveal ${visible ? 'visible' : ''}`}>
            Selected work and the kinds of things <span className="accent">I build.</span>
          </h2>
          <p className={`section-subtitle reveal ${visible ? 'visible' : ''}`}>{projects.note}</p>
        </div>

        <div className="projects__grid">
          {cards.map((project, index) => (
            <article
              key={`${project.title}-${index}`}
              className={`projects__card glass-card reveal ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 110}ms` }}
            >
              <div className="projects__card-top">
                <span className="projects__category">{project.category}</span>
                <h3>{project.title}</h3>
              </div>

              <p className="projects__description">{project.description}</p>

              <div className="projects__stack">
                {project.stack.map((item) => (
                  <span key={item} className="chip chip--mono">
                    {item}
                  </span>
                ))}
              </div>

              <div className="projects__links">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  Code
                </a>
                {project.live ? (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    Live
                  </a>
                ) : (
                  <a
                    href={`https://github.com/${profile.githubUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    GitHub Profile
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <span className="section-endnote">A mix of personal builds and live repositories from GitHub.</span>
      </div>
    </section>
  );
}
