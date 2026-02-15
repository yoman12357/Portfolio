import { useEffect, useRef, useState } from 'react';
import './Achievements.css';

const certifications = [
    {
        title: 'Git Skill Up',
        issuer: 'Skill Up',
        icon: '📚',
        color: 'var(--cyan)',
    },
    {
        title: 'Generative AI, LLM & RAG',
        issuer: 'Skill Up',
        icon: '🤖',
        color: 'var(--magenta)',
    },
    {
        title: 'Agentic AI',
        issuer: 'Skill Up',
        icon: '🧠',
        color: 'var(--violet)',
    },
    {
        title: 'Protect Sensitive Data with Data Loss Prevention',
        issuer: 'Google Cloud Skill Badge',
        icon: '🛡️',
        color: 'var(--lime)',
    },
];

const highlights = [
    {
        icon: '🏛️',
        title: 'NITK Surathkal',
        desc: 'CSE Sophomore at one of India\'s premier NITs',
    },
    {
        icon: '🎙️',
        title: 'TEDxNITKSurathkal',
        desc: 'Web Developer – building the digital presence',
    },
    {
        icon: '✈️',
        title: 'Team AeroNITK',
        desc: 'Web Team Member – contributing to the aero club',
    },
    {
        icon: '⚡',
        title: 'ISTE NITK',
        desc: 'Active member of the technical society',
    },
    {
        icon: '🌌',
        title: 'Astrophile',
        desc: 'Passionate about astronomy and the cosmos',
    },
    {
        icon: '💻',
        title: 'Open Source',
        desc: 'Actively contributing to open-source initiatives',
    },
];

export default function Achievements() {
    const ref = useRef(null);
    const [vis, setVis] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section id="achievements" className="section" ref={ref}>
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">&lt;achievements&gt;</span>
                    <h2 className={`section-title ${vis ? 'reveal visible' : 'reveal'}`}>
                        Achievements & <span className="accent">Certifications</span>
                    </h2>
                    <p className={`section-subtitle ${vis ? 'reveal visible' : 'reveal'}`}>
                        Milestones, badges, and recognitions along my journey
                    </p>
                </div>

                {/* Highlights Grid */}
                <div className="ach__highlights">
                    {highlights.map((h, i) => (
                        <div
                            key={i}
                            className={`ach__highlight glass-card ${vis ? 'reveal visible' : 'reveal'}`}
                            style={{ transitionDelay: `${i * 0.1}s` }}
                        >
                            <span className="ach__highlight-icon">{h.icon}</span>
                            <div>
                                <h4>{h.title}</h4>
                                <p>{h.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Certifications */}
                <h3 className={`ach__certs-title ${vis ? 'reveal visible' : 'reveal'}`}>
                    <span className="ach__certs-icon">🏆</span> Certifications & Badges
                </h3>
                <div className="ach__certs">
                    {certifications.map((cert, i) => (
                        <div
                            key={i}
                            className={`ach__cert glass-card ${vis ? 'reveal visible' : 'reveal'}`}
                            style={{ transitionDelay: `${0.3 + i * 0.12}s` }}
                        >
                            <div className="ach__cert-icon" style={{ '--cert-color': cert.color }}>
                                {cert.icon}
                            </div>
                            <div className="ach__cert-info">
                                <h4>{cert.title}</h4>
                                <p>{cert.issuer}</p>
                            </div>
                            <div className="ach__cert-badge" style={{ borderColor: cert.color, color: cert.color }}>
                                Verified
                            </div>
                        </div>
                    ))}
                </div>

                <span className="section-tag section-tag-close">&lt;/achievements&gt;</span>
            </div>
        </section>
    );
}
