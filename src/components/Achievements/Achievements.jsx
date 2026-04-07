import { portfolioData } from '../../data/portfolioData';
import { useReveal } from '../../hooks/useReveal';
import './Achievements.css';

const { achievements } = portfolioData;

export default function Achievements() {
  const { ref, visible } = useReveal();

  return (
    <section id="achievements" className="section" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Highlights</span>
          <h2 className={`section-title reveal ${visible ? 'visible' : ''}`}>
            Signals of momentum and the work <span className="accent">behind it.</span>
          </h2>
          <p className={`section-subtitle reveal ${visible ? 'visible' : ''}`}>
            Clubs, communities, certifications, and small milestones that show the direction I am
            heading in.
          </p>
        </div>

        <div className="achievements__layout">
          <div className="achievements__grid">
            {achievements.highlights.map((item, index) => (
              <article
                key={item.title}
                className={`achievements__card glass-card reveal ${visible ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <span className="achievements__card-index">{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>

          <div className={`achievements__certs glass-card reveal ${visible ? 'visible' : ''}`}>
            <span className="section-tag">Certifications</span>
            <h3>Verified learning tracks</h3>

            <div className="achievements__cert-list">
              {achievements.certifications.map((item, index) => (
                <div key={item.title} className="achievements__cert-item">
                  <span>{`0${index + 1}`}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.issuer}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <span className="section-endnote">Progress is still in motion, which is part of the point.</span>
      </div>
    </section>
  );
}
