import { portfolioData } from '../../data/portfolioData';
import { useReveal } from '../../hooks/useReveal';
import './Skills.css';

const { skills } = portfolioData;

export default function Skills() {
  const { ref, visible } = useReveal();

  return (
    <section id="skills" className="section" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Skills</span>
          <h2 className={`section-title reveal ${visible ? 'visible' : ''}`}>
            The stack I rely on <span className="accent">most often.</span>
          </h2>
          <p className={`section-subtitle reveal ${visible ? 'visible' : ''}`}>
            A mix of product-facing frontend work, practical full-stack tools, and the core problem
            solving skills I am trying to sharpen continuously.
          </p>
        </div>

        <div className={`skills__summary glass-card reveal ${visible ? 'visible' : ''}`}>
          <div>
            <span className="section-tag">Featured tools</span>
            <p>
              I am strongest when I can combine UI thinking, React execution, and a backend that is
              simple enough to move quickly.
            </p>
          </div>

          <div className="skills__featured">
            {skills.featured.map((item) => (
              <span key={item} className="chip">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="skills__grid">
          {skills.categories.map((category, index) => (
            <article
              key={category.title}
              className={`skills__card glass-card reveal ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 110}ms` }}
            >
              <div className="skills__card-head">
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </div>

              <div className="skills__list">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="skills__item">
                    <div className="skills__meta">
                      <span>{skill.name}</span>
                      <strong>{skill.level}%</strong>
                    </div>
                    <div className="skills__track">
                      <span className="skills__fill" style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <span className="section-endnote">Strongest in React-based product work and modern web foundations.</span>
      </div>
    </section>
  );
}
