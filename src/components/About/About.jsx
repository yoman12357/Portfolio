import { useEffect, useRef, useState } from 'react';
import './About.css';

export default function About() {
    const ref = useRef(null);
    const [vis, setVis] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.15 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section id="about" className="section" ref={ref}>
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">&lt;about&gt;</span>
                    <h2 className={`section-title ${vis ? 'reveal visible' : 'reveal'}`}>About <span className="accent">Me</span></h2>
                </div>

                <div className="about__grid">
                    {/* Card */}
                    <div className={`about__card glass-card ${vis ? 'reveal visible' : 'reveal'}`}>
                        <div className="about__avatar-wrap">
                            <div className="about__avatar-ring" />
                            <div className="about__avatar">
                                <img src="../public/profile.jpg"  style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
                            </div>
                        </div>
                        <div className="about__info">
                            <h3>Aryan Bokolia</h3>
                            <p className="about__role">Web Developer</p>
                            <p className="about__role--secondary">CSE Sophomore @ NITK Surathkal</p>
                            <div className="about__socials">
                                <a href="https://github.com/yoman12357" target="_blank" rel="noopener noreferrer" className="social-chip">
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                                    GitHub
                                </a>
                                <a href="https://www.linkedin.com/in/aryan-bokolia" target="_blank" rel="noopener noreferrer" className="social-chip">
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Text */}
                    <div className={`about__text ${vis ? 'reveal visible' : 'reveal'}`}>
                        <p>
                            As a second-year Computer Science and Engineering student at NITK Surathkal,
                            I am deeply committed to leveraging technology to solve complex, real-world problems.
                            I am actively seeking opportunities to participate in hackathons, collaborate on
                            research projects, and contribute to open-source initiatives.
                        </p>
                        <p>
                            My goal is to stay ahead of the curve by continuously upgrading my skills in areas
                            like programming languages, web development, and MERN Stack. I specialize in
                            React, Node.js, and modern web technologies, building clean and efficient code.
                        </p>
                        <p>
                            In the long term, I aspire to be at the forefront of technological advancements,
                            working on transformative solutions that make a tangible difference.
                            Apart from the Tech World, I am an Astrophile — passionate about astronomy and the cosmos. 🌌
                        </p>
                        <div className="about__highlights">
                            <div className="about__hl glass-card">
                                <span className="about__hl-icon">🚀</span>
                                <div><h4>Fast Development</h4><p>Quick turnaround with quality results</p></div>
                            </div>
                            <div className="about__hl glass-card">
                                <span className="about__hl-icon">💡</span>
                                <div><h4>Creative Solutions</h4><p>Innovative approaches to complex problems</p></div>
                            </div>
                            <div className="about__hl glass-card">
                                <span className="about__hl-icon">🎯</span>
                                <div><h4>Goal Oriented</h4><p>Focused on delivering exceptional results</p></div>
                            </div>
                        </div>
                    </div>
                </div>
                <span className="section-tag section-tag-close">&lt;/about&gt;</span>
            </div>
        </section>
    );
}
