import { useEffect, useRef, useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import './Contact.css';

const contactInfo = [
    { icon: '📧', title: 'Email', info: 'aryanbokolia34@gmail.com', link: 'mailto:aryanbokolia34@gmail.com' },
    { icon: '📱', title: 'Phone', info: '+91 7982212773', link: 'tel:+917982212773' },
    { icon: '📍', title: 'Location', info: 'Delhi, India' },
    { icon: '💼', title: 'LinkedIn', info: 'in/aryan-bokolia', link: 'https://www.linkedin.com/in/aryan-bokolia' },
];

const socials = [
    { name: 'GitHub', url: 'https://github.com/yoman12357' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/aryan-bokolia' },
    { name: 'Instagram', url: 'https://www.instagram.com/aryanbokolia_/' },
];

export default function Contact() {
    const ref = useRef(null);
    const [vis, setVis] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        try {
            await addDoc(collection(db, 'messages'), {
                ...form,
                createdAt: serverTimestamp(),
            });
            setSent(true);
            setForm({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setSent(false), 4000);
        } catch (err) {
            console.error('Firebase error:', err);
            alert('Something went wrong. Please try again later.');
        }
        setSending(false);
    };

    return (
        <section id="contact" className="section" ref={ref}>
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">&lt;contact&gt;</span>
                    <h2 className={`section-title ${vis ? 'reveal visible' : 'reveal'}`}>Let's Work <span className="accent">Together</span></h2>
                    <p className={`section-subtitle ${vis ? 'reveal visible' : 'reveal'}`}>Have a project in mind? Let's discuss how we can bring your ideas to life.</p>
                </div>

                <div className="contact__grid">
                    {/* Info */}
                    <div className={`contact__info ${vis ? 'reveal visible' : 'reveal'}`}>
                        <h3>Get In Touch</h3>
                        <p>I'm always open to discussing new opportunities, creative projects, or potential collaborations.</p>
                        <div className="contact__methods">
                            {contactInfo.map((c, i) =>
                                c.link ? (
                                    <a key={i} href={c.link} className="contact__card glass-card" target={c.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                                        <span className="contact__icon">{c.icon}</span>
                                        <div><h4>{c.title}</h4><p>{c.info}</p></div>
                                    </a>
                                ) : (
                                    <div key={i} className="contact__card glass-card">
                                        <span className="contact__icon">{c.icon}</span>
                                        <div><h4>{c.title}</h4><p>{c.info}</p></div>
                                    </div>
                                )
                            )}
                        </div>
                        <div className="contact__socials">
                            {socials.map((s, i) => (
                                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="social-btn">{s.name}</a>
                            ))}
                        </div>
                    </div>

                    {/* Form */}
                    <form className={`contact__form glass-card ${vis ? 'reveal visible' : 'reveal'}`} onSubmit={handleSubmit}>
                        {sent && <div className="contact__success">✅ Message sent successfully!</div>}
                        <div className="form-group">
                            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required />
                            <span className="input-line" />
                        </div>
                        <div className="form-group">
                            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Your Email" required />
                            <span className="input-line" />
                        </div>
                        <div className="form-group">
                            <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" required />
                            <span className="input-line" />
                        </div>
                        <div className="form-group">
                            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your Message" required rows={5} />
                            <span className="input-line" />
                        </div>
                        <button type="submit" className="btn btn-primary contact__submit" disabled={sending}>
                            <span className="btn-text">{sending ? 'Sending...' : 'Send Message'}</span>
                            <span className="btn-icon">🚀</span>
                            <span className="btn-glow" />
                        </button>
                    </form>
                </div>

                <span className="section-tag section-tag-close">&lt;/contact&gt;</span>
            </div>
        </section>
    );
}
