import { useEffect, useState, useRef, useCallback } from 'react';
import './Hero.css';

const phrases = [
    'Web Developer',
    'CSE Sophomore @ NITK',
    'Full-Stack Developer',
    'Cyber Security Enthusiast',
    'MERN Stack Developer',
    'Agentic AI Enthusiast',
    'Astrophile ✨',
];

export default function Hero() {
    const [typed, setTyped] = useState('');
    const idx = useRef(0);
    const charIdx = useRef(0);
    const deleting = useRef(false);

    const tick = useCallback(() => {
        const current = phrases[idx.current];
        if (deleting.current) {
            charIdx.current--;
            setTyped(current.slice(0, charIdx.current));
            if (charIdx.current <= 0) { deleting.current = false; idx.current = (idx.current + 1) % phrases.length; return 400; }
            return 40;
        } else {
            charIdx.current++;
            setTyped(current.slice(0, charIdx.current));
            if (charIdx.current >= current.length) { deleting.current = true; return 2000; }
            return 80;
        }
    }, []);

    useEffect(() => {
        let timer;
        const run = () => { const delay = tick(); timer = setTimeout(run, delay); };
        timer = setTimeout(run, 1500);
        return () => clearTimeout(timer);
    }, [tick]);

    /* Parallax on scroll */
    const contentRef = useRef(null);
    const indicatorRef = useRef(null);
    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            if (y < window.innerHeight && contentRef.current) {
                const f = y / window.innerHeight;
                contentRef.current.style.opacity = 1 - f * 1.2;
                contentRef.current.style.transform = `translateY(${y * 0.3}px) scale(${1 - f * 0.1})`;
                if (indicatorRef.current) indicatorRef.current.style.opacity = 1 - f * 3;
            }
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* Count-up */
    const statsRef = useRef(null);
    const [counts, setCounts] = useState([0, 0, 0]);
    useEffect(() => {
        const el = statsRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                const targets = [5, 10, 4];
                targets.forEach((t, i) => {
                    let c = 0;
                    const iv = setInterval(() => { c++; setCounts(p => { const n = [...p]; n[i] = c; return n; }); if (c >= t) clearInterval(iv); }, 60);
                });
                obs.disconnect();
            }
        }, { threshold: 0.5 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    return (
        <section id="hero" className="section hero">
            <div className="hero__grid" />
            <div className="hero__content" ref={contentRef}>
                <div className="hero__badge">[ SYSTEM ONLINE ]</div>
                <p className="hero__greeting glitch" data-text="Hello, I'm">Hello, I'm</p>
                <h1 className="hero__name">
                    <span className="hero__name-line hero__name-line--1">Aryan</span>
                    <span className="hero__name-line hero__name-line--2">Bokolia</span>
                </h1>
                <div className="hero__role">
                    <span className="hero__prefix">&gt;&gt;</span>
                    <span className="hero__typed">{typed}</span>
                    <span className="hero__cursor">█</span>
                </div>
                <p className="hero__desc">
                    CSE Sophomore at NITK Surathkal · Web Developer · DSA Enthusiast<br />
                    Crafting digital experiences & solving real-world problems with code.
                </p>
                <div className="hero__cta">
                    <button className="btn btn-primary" onClick={() => scrollTo('projects')}>
                        <span className="btn-text">View My Work</span>
                        <span className="btn-icon">→</span>
                        <span className="btn-glow" />
                    </button>
                    <button className="btn btn-outline" onClick={() => scrollTo('contact')}>
                        <span className="btn-text">Get In Touch</span>
                        <span className="btn-icon">↗</span>
                    </button>
                    <a href="/Final_Resume.pdf" download className="btn btn-outline hero__resume-btn">
                        <span className="btn-text">Download CV</span>
                        <span className="btn-icon">📄</span>
                    </a>
                </div>
                <div className="hero__stats" ref={statsRef}>
                    <div className="stat"><span className="stat__num">{counts[0]}+</span><span className="stat__label">Projects</span></div>
                    <div className="stat__div" />
                    <div className="stat"><span className="stat__num">{counts[1]}+</span><span className="stat__label">Technologies</span></div>
                    <div className="stat__div" />
                    <div className="stat"><span className="stat__num">{counts[2]}+</span><span className="stat__label">Certifications</span></div>
                </div>
            </div>
            <div className="hero__scroll" ref={indicatorRef}><div className="hero__scroll-line" /><span>Scroll</span></div>
        </section>
    );
}
