import { useEffect, useState } from 'react';
import './GitHubActivity.css';

export default function GitHubActivity({ username = 'yoman12357' }) {
    const [data, setData] = useState(null);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGitHub = async () => {
            try {
                const [userRes, reposRes] = await Promise.all([
                    fetch(`https://api.github.com/users/${username}`),
                    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`),
                ]);
                const userData = await userRes.json();
                const reposData = await reposRes.json();
                setData(userData);
                setRepos(Array.isArray(reposData) ? reposData : []);
            } catch (err) {
                console.error('GitHub API:', err);
            }
            setLoading(false);
        };
        fetchGitHub();
    }, [username]);

    if (loading) {
        return (
            <div className="gh__loading">
                <div className="gh__loading-spinner" />
                <span>Fetching GitHub data...</span>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="gh">
            {/* Profile Card */}
            <div className="gh__profile glass-card">
                <img src={data.avatar_url} alt={data.login} className="gh__avatar" loading="lazy" />
                <div className="gh__info">
                    <h4>{data.name || data.login}</h4>
                    <p className="gh__bio">{data.bio || 'Web Developer & Cyber Security Enthusiast'}</p>
                    <a href={data.html_url} target="_blank" rel="noopener noreferrer" className="gh__link">
                        @{data.login} ↗
                    </a>
                </div>
                <div className="gh__stats">
                    <div className="gh__stat">
                        <span className="gh__stat-num">{data.public_repos}</span>
                        <span className="gh__stat-label">Repos</span>
                    </div>
                    <div className="gh__stat">
                        <span className="gh__stat-num">{data.followers}</span>
                        <span className="gh__stat-label">Followers</span>
                    </div>
                    <div className="gh__stat">
                        <span className="gh__stat-num">{data.following}</span>
                        <span className="gh__stat-label">Following</span>
                    </div>
                </div>
            </div>

            {/* Recent Repos */}
            <div className="gh__repos">
                <h4 className="gh__repos-title">📂 Recent Activity</h4>
                <div className="gh__repo-grid">
                    {repos.map((repo) => (
                        <a
                            key={repo.id}
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="gh__repo glass-card"
                        >
                            <div className="gh__repo-header">
                                <span className="gh__repo-name">{repo.name}</span>
                                {repo.language && (
                                    <span className="gh__repo-lang" data-lang={repo.language}>
                                        {repo.language}
                                    </span>
                                )}
                            </div>
                            <p className="gh__repo-desc">
                                {repo.description || 'No description available'}
                            </p>
                            <div className="gh__repo-meta">
                                <span>⭐ {repo.stargazers_count}</span>
                                <span>🍴 {repo.forks_count}</span>
                                <span>📅 {new Date(repo.updated_at).toLocaleDateString()}</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* Contribution Graph Placeholder */}
            <div className="gh__graph glass-card">
                <h4>📊 Contribution Activity</h4>
                <img
                    src={`https://ghchart.rshah.org/00f5ff/${username}`}
                    alt="GitHub Contributions"
                    className="gh__graph-img"
                    loading="lazy"
                />
            </div>
        </div>
    );
}
