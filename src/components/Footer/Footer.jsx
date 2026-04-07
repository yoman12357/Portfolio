import { portfolioData } from '../../data/portfolioData';
import VisitorCounter from '../VisitorCounter/VisitorCounter';
import './Footer.css';

const { footer, navigation, profile } = portfolioData;

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__headline">
          <span className="section-tag">Closing note</span>
          <h2>{profile.name}</h2>
          <p>{footer.blurb}</p>
        </div>

        <div className="footer__grid glass-card">
          <div className="footer__column">
            <h3>Navigation</h3>
            {navigation.map((item) => (
              <button key={item.id} type="button" onClick={() => scrollTo(item.id)}>
                {item.label}
              </button>
            ))}
          </div>

          <div className="footer__column">
            <h3>Focus</h3>
            {footer.services.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <div className="footer__column">
            <h3>Contact</h3>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={`tel:${profile.phone.replace(/\s+/g, '')}`}>{profile.phone}</a>
            <span>{profile.location}</span>
            <p>{footer.availability}</p>
          </div>
        </div>

        <div className="footer__bottom">
          <p>{`© ${year} ${profile.name}. All rights reserved.`}</p>
          <VisitorCounter />
          <button type="button" className="footer__top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
