import VisitorCounter from '../VisitorCounter/VisitorCounter';
import './Footer.css';

const quickLinks = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'];
const quickIds = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];

export default function Footer() {
    const year = new Date().getFullYear();

    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    return (
        <footer className="footer">
            <div className="footer__grid-bg" />
            <div className="container">
                <div className="footer__top">
                    <div className="footer__brand">
                        <span className="footer__logo"><span className="logo__bracket">&lt;</span>Aryan Bokolia<span className="logo__bracket">/&gt;</span></span>
                        <p>Passionate web developer creating innovative digital solutions with modern technologies and creative design.</p>
                    </div>
                    <div className="footer__col">
                        <h4>Quick Links</h4>
                        {quickLinks.map((l, i) => (
                            <a key={i} href={`#${quickIds[i]}`} onClick={(e) => { e.preventDefault(); scrollTo(quickIds[i]); }}>{l}</a>
                        ))}
                    </div>
                    <div className="footer__col">
                        <h4>Services</h4>
                        <span>Web Development</span>
                        <span>Frontend Design</span>
                        <span>Full-Stack (MERN)</span>
                    </div>
                    <div className="footer__col">
                        <h4>Contact Info</h4>
                        <span>📧 aryanbokolia34@gmail.com</span>
                        <span>📱 +91 7982212773</span>
                        <span>📍 Mangaluru, Karnataka</span>
                        <span>🕒 Available 24/7</span>
                    </div>
                </div>
                <div className="footer__divider" />
                <div className="footer__bottom">
                    <p>© {year} Aryan Bokolia. All rights reserved.</p>
                    <VisitorCounter />
                    <p className="footer__built">Built with React ⚛️ + Firebase 🔥</p>
                    <button className="footer__top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑ Top</button>
                </div>
            </div>
        </footer>
    );
}
