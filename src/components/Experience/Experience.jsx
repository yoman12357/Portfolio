import { useEffect, useRef, useState } from 'react';
import './Experience.css';

const workExperience = [
    {
        title: 'Web Developer',
        org: 'TEDxNITKSurathkal',
        period: 'Aug 2025 – Present',
        location: 'Mangaluru, Karnataka',
        type: 'Role',
        desc: 'Building and maintaining the digital presence for TEDxNITKSurathkal. Developing the event website and ensuring a seamless online experience.',
        points: [
            'Developing and maintaining the official TEDx event website',
            'Implementing responsive design and modern animations',
            'Collaborating with the design team for UI/UX',
            'Integrating event registration and speaker showcases',
        ],
        tags: ['React', 'CSS', 'JavaScript', 'Web Development'],
    },
    {
        title: 'Web Team Member',
        org: 'Team AeroNITK',
        period: 'Apr 2025 – Present',
        location: 'Karnataka, India',
        type: 'Role',
        desc: 'Contributing to the web development efforts of Team AeroNITK, one of the prominent technical clubs at NITK Surathkal.',
        points: [
            'Building and updating the club website',
            'Creating interactive showcases for projects and competitions',
            'Working with the team on design and functionality',
            'Helping with content management and deployment',
        ],
        tags: ['HTML/CSS', 'JavaScript', 'React', 'Team Collaboration'],
    },
    {
        title: 'Member',
        org: 'ISTE NITK',
        period: 'Sep 2025 – Present',
        location: 'Dakshina Kannada',
        type: 'Role',
        desc: 'Active member of the Indian Society for Technical Education (ISTE) at NITK, participating in technical events and initiatives.',
        points: [
            'Participating in technical workshops and seminars',
            'Contributing to club events and activities',
            'Collaborating with peers on tech projects',
            'Learning and sharing knowledge within the community',
        ],
        tags: ['Technical Society', 'Events', 'Community'],
    },
];

const education = [
    {
        title: "Bachelor of Technology – CSE",
        org: 'National Institute of Technology Karnataka',
        period: 'Aug 2024 – Aug 2028',
        location: 'Surathkal, Karnataka',
        type: 'Education',
        desc: "Pursuing B.Tech in Computer Science and Engineering at NITK Surathkal. Focusing on software development, DSA, and modern web technologies.",
        points: [
            'Learning advanced CS concepts, algorithms, and data structures',
            'Working on web development projects using React and MERN stack',
            'Participating in coding competitions and hackathons',
            'Active member of TEDxNITKSurathkal, Team AeroNITK, and ISTE',
        ],
        tags: ['C', 'C++', 'Python', 'React', 'MERN', 'DSA', 'Algorithms'],
    },
    {
        title: 'High School',
        org: 'Vanasthali Public School',
        period: 'Jun 2015 – Jun 2024',
        location: 'Delhi, India',
        type: 'Education',
        desc: 'Completed schooling with strong foundation in Mathematics, Science, and Computer Science. Prepared for engineering entrance examinations.',
        points: [
            'Excelled in Mathematics, Physics, and Chemistry',
            'Developed analytical thinking and problem-solving skills',
            'Participated in science exhibitions and competitions',
            'Discovered passion for technology and coding',
        ],
        tags: ['Mathematics', 'Physics', 'Chemistry', 'Problem Solving'],
    },
];

export default function Experience() {
    const ref = useRef(null);
    const [vis, setVis] = useState(false);
    const [tab, setTab] = useState('work');

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    const data = tab === 'work' ? workExperience : education;

    return (
        <section id="experience" className="section" ref={ref}>
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">&lt;journey&gt;</span>
                    <h2 className={`section-title ${vis ? 'reveal visible' : 'reveal'}`}>Experience & <span className="accent">Journey</span></h2>
                    <p className={`section-subtitle ${vis ? 'reveal visible' : 'reveal'}`}>My professional roles and academic path</p>
                </div>

                {/* Tab switcher */}
                <div className={`exp__tabs ${vis ? 'reveal visible' : 'reveal'}`}>
                    <button className={`exp__tab ${tab === 'work' ? 'exp__tab--active' : ''}`} onClick={() => setTab('work')}>
                        💼 Work & Roles
                    </button>
                    <button className={`exp__tab ${tab === 'education' ? 'exp__tab--active' : ''}`} onClick={() => setTab('education')}>
                        🎓 Education
                    </button>
                </div>

                <div className="timeline">
                    {data.map((exp, i) => (
                        <div key={`${tab}-${i}`} className={`timeline__item ${vis ? 'reveal visible' : 'reveal'}`} style={{ transitionDelay: `${i * 0.2}s` }}>
                            <div className="timeline__marker"><span className="timeline__dot" /></div>
                            <div className="timeline__card glass-card">
                                <span className="timeline__badge">{exp.type}</span>
                                <h3>{exp.title}</h3>
                                <p className="timeline__org">{exp.org}</p>
                                <div className="timeline__meta"><span>📅 {exp.period}</span><span>📍 {exp.location}</span></div>
                                <p className="timeline__desc">{exp.desc}</p>
                                <ul className="timeline__points">{exp.points.map((p, j) => <li key={j}>{p}</li>)}</ul>
                                <div className="timeline__tags">{exp.tags.map((t, j) => <span key={j} className="tag">{t}</span>)}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <span className="section-tag section-tag-close">&lt;/journey&gt;</span>
            </div>
        </section>
    );
}
