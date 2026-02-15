import { useEffect, useRef, useState } from 'react';
import GitHubActivity from '../GitHubActivity/GitHubActivity';
import './GitHub.css';

export default function GitHub() {
    const ref = useRef(null);
    const [vis, setVis] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.05 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section id="github" className="section" ref={ref}>
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">&lt;github&gt;</span>
                    <h2 className={`section-title ${vis ? 'reveal visible' : 'reveal'}`}>
                        GitHub <span className="accent">Activity</span>
                    </h2>
                    <p className={`section-subtitle ${vis ? 'reveal visible' : 'reveal'}`}>
                        My open-source contributions and latest projects
                    </p>
                </div>

                <div className={vis ? 'reveal visible' : 'reveal'}>
                    <GitHubActivity username="yoman12357" />
                </div>

                <span className="section-tag section-tag-close">&lt;/github&gt;</span>
            </div>
        </section>
    );
}
