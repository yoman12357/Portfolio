import { useEffect, useRef, useState } from 'react';
import './Projects.css';

const projects = [
    {
        title: 'Weather Dashboard',
        desc: 'A responsive weather dashboard that displays current weather, forecasts, and weather maps using multiple weather APIs.',
        tags: ['React', 'TypeScript', 'Weather API', 'CSS3'],
        cat: 'Frontend',
        github: '#',
        live: '#',
    },
    {
        title: 'Portfolio Website',
        desc: 'A modern, responsive portfolio website with smooth animations, dark theme, and optimized performance.',
        tags: ['React', 'CSS3', 'JavaScript', 'Responsive Design'],
        cat: 'Frontend',
        github: '#',
        live: '#',
    },
];

export default function Projects() {
    const ref = useRef(null);
    const [vis, setVis] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    /* Tilt effect */
    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left, y = e.clientY - rect.top;
        const cx = rect.width / 2, cy = rect.height / 2;
        card.style.transform = `perspective(800px) rotateX(${((y - cy) / cy) * -4}deg) rotateY(${((x - cx) / cx) * 4}deg) translateY(-4px)`;
    };
    const handleMouseLeave = (e) => { e.currentTarget.style.transform = ''; };

    return (
        <section id="projects" className="section" ref={ref}>
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">&lt;projects&gt;</span>
                    <h2 className={`section-title ${vis ? 'reveal visible' : 'reveal'}`}>Featured <span className="accent">Projects</span></h2>
                </div>

                <div className="projects__grid">
                    {projects.map((p, i) => (
                        <article
                            key={i}
                            className={`project glass-card ${vis ? 'reveal visible' : 'reveal'}`}
                            style={{ transitionDelay: `${i * 0.18}s` }}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="project__visual">
                                <div className="project__screen">
                                    <div className="screen__dots"><span /><span /><span /></div>
                                    <div className="screen__body">
                                        <span className="cl cl-1" /><span className="cl cl-2" /><span className="cl cl-3" /><span className="cl cl-4" /><span className="cl cl-5" />
                                    </div>
                                </div>
                                <div className="project__overlay">
                                    <a href={p.github} className="overlay__link">📁 Code</a>
                                    <a href={p.live} className="overlay__link">🚀 Live</a>
                                </div>
                            </div>
                            <div className="project__body">
                                <span className="project__cat">{p.cat}</span>
                                <h3>{p.title}</h3>
                                <p>{p.desc}</p>
                                <div className="project__tags">{p.tags.map((t, j) => <span key={j} className="tag">{t}</span>)}</div>
                            </div>
                        </article>
                    ))}
                </div>

                <span className="section-tag section-tag-close">&lt;/projects&gt;</span>
            </div>
        </section>
    );
}
