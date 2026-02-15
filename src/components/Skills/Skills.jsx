import { useEffect, useRef, useState } from 'react';
import './Skills.css';

const categories = [
    {
        title: 'Frontend', icon: '⚡',
        skills: [
            { name: 'React', level: 90, ico: '⚛️' },
            { name: 'JavaScript', level: 85, ico: '🟨' },
            { name: 'HTML / CSS', level: 95, ico: '🎨' },
            { name: 'TypeScript', level: 80, ico: '📘' },
            { name: 'Next.js', level: 75, ico: '▲' },
        ],
    },
    {
        title: 'Backend & Stack', icon: '🔧',
        skills: [
            { name: 'Node.js', level: 80, ico: '🟢' },
            { name: 'Express.js', level: 75, ico: '🚀' },
            { name: 'MongoDB', level: 75, ico: '🍃' },
            { name: 'Firebase', level: 80, ico: '🔥' },
            { name: 'MERN Stack', level: 78, ico: '📦' },
        ],
    },
    {
        title: 'Languages & DSA', icon: '💻',
        skills: [
            { name: 'Python', level: 80, ico: '🐍' },
            { name: 'C / C++', level: 85, ico: '⚙️' },
            { name: 'Data Structures', level: 82, ico: '🏗️' },
            { name: 'Algorithms', level: 80, ico: '📐' },
        ],
    },
    {
        title: 'Tools & AI', icon: '🛠️',
        skills: [
            { name: 'Git', level: 90, ico: '📚' },
            { name: 'VS Code', level: 95, ico: '💻' },
            { name: 'Figma', level: 80, ico: '🎭' },
            { name: 'Agentic AI', level: 70, ico: '🤖' },
            { name: 'Gen AI / LLM', level: 72, ico: '🧠' },
        ],
    },
];

const orbitNodes = [
    { ico: '⚛️', label: 'React' },
    { ico: '🟢', label: 'Node' },
    { ico: '🍃', label: 'Mongo' },
    { ico: '🟨', label: 'JS' },
    { ico: '🐍', label: 'Python' },
    { ico: '🔥', label: 'Firebase' },
];

export default function Skills() {
    const ref = useRef(null);
    const [vis, setVis] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section id="skills" className="section" ref={ref}>
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">&lt;skills&gt;</span>
                    <h2 className={`section-title ${vis ? 'reveal visible' : 'reveal'}`}>Skills & <span className="accent">Technologies</span></h2>
                </div>

                <div className="skills__cats">
                    {categories.map((cat, ci) => (
                        <div key={ci} className={`skills__cat glass-card ${vis ? 'reveal visible' : 'reveal'}`} style={{ transitionDelay: `${ci * 0.12}s` }}>
                            <h3 className="skills__cat-title"><span>{cat.icon}</span> {cat.title}</h3>
                            <div className="skills__list">
                                {cat.skills.map((s, si) => (
                                    <div key={si} className="skills__row">
                                        <div className="skills__info"><span className="skills__ico">{s.ico}</span><span>{s.name}</span></div>
                                        <div className="skills__bar">
                                            <div className={`skills__fill ${vis ? 'skills__fill--go' : ''}`} style={{ '--target': `${s.level}%`, transitionDelay: `${ci * 0.15 + si * 0.08 + 0.3}s` }} />
                                        </div>
                                        <span className="skills__pct">{s.level}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Orbit */}
                <div className={`skills__orbit ${vis ? 'reveal visible' : 'reveal'}`}>
                    <div className="orbit__ring">
                        {orbitNodes.map((n, i) => (
                            <div key={i} className="orbit__node" style={{ '--i': i, '--total': orbitNodes.length }}>
                                <span>{n.ico}</span><small>{n.label}</small>
                            </div>
                        ))}
                    </div>
                </div>

                <span className="section-tag section-tag-close">&lt;/skills&gt;</span>
            </div>
        </section>
    );
}
