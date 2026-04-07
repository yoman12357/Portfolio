import { portfolioData } from '../../data/portfolioData';
import { useReveal } from '../../hooks/useReveal';
import './About.css';

const { about, profile } = portfolioData;

export default function About() {
  const { ref, visible } = useReveal();

  return (
    <section id="about" className="section" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">About</span>
          <h2 className={`section-title reveal ${visible ? 'visible' : ''}`}>
            A clearer picture of <span className="accent">who I am.</span>
          </h2>
          <p className={`section-subtitle reveal ${visible ? 'visible' : ''}`}>
            The goal is simple: keep growing as an engineer while building work that feels useful,
            well-crafted, and honest to the details.
          </p>
        </div>

        <div className="about__layout">
          <div className={`about__copy glass-card reveal ${visible ? 'visible' : ''}`}>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <div className="about__interests">
              {about.interests.map((interest) => (
                <span key={interest} className="chip">
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <div className="about__side">
            <div className={`about__identity glass-card reveal ${visible ? 'visible' : ''}`}>
              <span className="section-tag">Profile</span>
              <h3>{profile.name}</h3>
              <p>{profile.role}</p>
              <small>{profile.secondaryRole}</small>

              <div className="about__socials">
                {profile.socials.slice(0, 2).map((social) => (
                  <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer">
                    {social.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="about__highlights">
              {about.highlights.map((item, index) => (
                <article
                  key={item.title}
                  className={`about__highlight glass-card reveal ${visible ? 'visible' : ''}`}
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  <span className="about__highlight-index">0{index + 1}</span>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <span className="section-endnote">Building with discipline, curiosity, and taste.</span>
      </div>
    </section>
  );
}
