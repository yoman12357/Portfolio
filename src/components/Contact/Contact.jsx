import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { portfolioData } from '../../data/portfolioData';
import { useReveal } from '../../hooks/useReveal';
import { db } from '../../firebase';
import './Contact.css';

const { contact, profile } = portfolioData;

export default function Contact() {
  const { ref, visible } = useReveal();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSending(true);

    try {
      await addDoc(collection(db, 'messages'), {
        ...form,
        createdAt: serverTimestamp(),
      });

      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      window.setTimeout(() => setSent(false), 4000);
    } catch (error) {
      console.error('Firebase error:', error);
      window.alert('Something went wrong. Please try again later.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Contact</span>
          <h2 className={`section-title reveal ${visible ? 'visible' : ''}`}>
            If something is worth building, <span className="accent">let&apos;s talk.</span>
          </h2>
          <p className={`section-subtitle reveal ${visible ? 'visible' : ''}`}>{contact.intro}</p>
        </div>

        <div className="contact__layout">
          <div className={`contact__info glass-card reveal ${visible ? 'visible' : ''}`}>
            <span className="section-tag">Get in touch</span>
            <h3>Open to collaboration and meaningful product work.</h3>

            <div className="contact__cards">
              {contact.cards.map((card) =>
                card.link ? (
                  <a
                    key={card.title}
                    href={card.link}
                    className="contact__card"
                    target={card.link.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                  >
                    <span>{card.title}</span>
                    <strong>{card.info}</strong>
                  </a>
                ) : (
                  <div key={card.title} className="contact__card">
                    <span>{card.title}</span>
                    <strong>{card.info}</strong>
                  </div>
                )
              )}
            </div>

            <div className="contact__socials">
              {profile.socials.map((social) => (
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer">
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          <form className={`contact__form glass-card reveal ${visible ? 'visible' : ''}`} onSubmit={handleSubmit}>
            <span className="section-tag">Message</span>
            <h3>Send a note</h3>

            {sent ? <div className="contact__success">Message sent successfully.</div> : null}

            <label className="contact__field">
              <span>Name</span>
              <input type="text" name="name" value={form.name} onChange={handleChange} required />
            </label>

            <label className="contact__field">
              <span>Email</span>
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </label>

            <label className="contact__field">
              <span>Subject</span>
              <input type="text" name="subject" value={form.subject} onChange={handleChange} required />
            </label>

            <label className="contact__field">
              <span>Message</span>
              <textarea name="message" rows="6" value={form.message} onChange={handleChange} required />
            </label>

            <button type="submit" className="btn btn-primary" disabled={sending}>
              {sending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        <span className="section-endnote">The fastest way to reach me is still email.</span>
      </div>
    </section>
  );
}
