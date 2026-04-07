import { useEffect, useState } from 'react';
import './GitHubActivity.css';

export default function GitHubActivity({ username = 'yoman12357' }) {
  const [data, setData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchGitHub = async () => {
      try {
        const [userResponse, repoResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`),
        ]);

        const [userData, repoData] = await Promise.all([userResponse.json(), repoResponse.json()]);

        if (!cancelled) {
          setData(userData);
          setRepos(Array.isArray(repoData) ? repoData.filter((repo) => !repo.fork).slice(0, 4) : []);
        }
      } catch (error) {
        if (!cancelled) {
          console.error('GitHub API error:', error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchGitHub();

    return () => {
      cancelled = true;
    };
  }, [username]);

  if (loading) {
    return (
      <div className="github-activity__loading glass-card">
        <div className="github-activity__spinner" />
        <span>Loading GitHub activity...</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="github-activity__loading glass-card">
        <span>GitHub data is unavailable right now.</span>
      </div>
    );
  }

  return (
    <div className="github-activity">
      <div className="github-activity__overview">
        <article className="github-activity__profile glass-card">
          <img src={data.avatar_url} alt={data.login} className="github-activity__avatar" loading="lazy" />

          <div className="github-activity__profile-copy">
            <span className="section-tag">Profile</span>
            <h3>{data.name || data.login}</h3>
            <p>{data.bio || 'Building on the web and learning in public.'}</p>

            <a href={data.html_url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              Visit GitHub
            </a>
          </div>

          <div className="github-activity__stats">
            <div>
              <strong>{data.public_repos}</strong>
              <span>Public repos</span>
            </div>
            <div>
              <strong>{data.followers}</strong>
              <span>Followers</span>
            </div>
            <div>
              <strong>{data.following}</strong>
              <span>Following</span>
            </div>
          </div>
        </article>

        <article className="github-activity__graph glass-card">
          <span className="section-tag">Contribution map</span>
          <img
            src={`https://ghchart.rshah.org/1c7c72/${username}`}
            alt="GitHub contributions"
            className="github-activity__graph-image"
            loading="lazy"
          />
        </article>
      </div>

      <div className="github-activity__repos">
        {repos.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="github-activity__repo glass-card"
          >
            <div className="github-activity__repo-top">
              <h4>{repo.name}</h4>
              {repo.language ? <span className="chip chip--mono">{repo.language}</span> : null}
            </div>

            <p>{repo.description || 'Repository currently without a description.'}</p>

            <div className="github-activity__repo-meta">
              <span>Stars {repo.stargazers_count}</span>
              <span>Forks {repo.forks_count}</span>
              <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
