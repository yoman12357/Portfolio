import { portfolioData } from '../../data/portfolioData';
import { useReveal } from '../../hooks/useReveal';
import GitHubActivity from '../GitHubActivity/GitHubActivity';
import './GitHub.css';

const { profile } = portfolioData;

export default function GitHub() {
  const { ref, visible } = useReveal(0.05);

  return (
    <section id="github" className="section" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">GitHub</span>
          <h2 className={`section-title reveal ${visible ? 'visible' : ''}`}>
            Code history, recent repos, and <span className="accent">public proof.</span>
          </h2>
          <p className={`section-subtitle reveal ${visible ? 'visible' : ''}`}>
            A live snapshot from GitHub so the portfolio is backed by current activity instead of
            only static claims.
          </p>
        </div>

        <div className={`reveal ${visible ? 'visible' : ''}`}>
          <GitHubActivity username={profile.githubUsername} />
        </div>

        <span className="section-endnote">Live data from GitHub keeps this section honest.</span>
      </div>
    </section>
  );
}
