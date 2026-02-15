import { motion } from 'framer-motion';
import './App.css';
import Loader from './components/Loader/Loader';
import ParticleCanvas from './components/ParticleCanvas/ParticleCanvas';
import CursorGlow from './components/CursorGlow/CursorGlow';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Experience from './components/Experience/Experience';
import Achievements from './components/Achievements/Achievements';
import GitHub from './components/GitHub/GitHub';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

function AnimatedSection({ children }) {
  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  return (
    <>
      <Loader />
      <ParticleCanvas />
      <CursorGlow />
      <ScrollProgress />
      <div className="scanline-overlay" />

      <Header />

      <main>
        <Hero />
        <AnimatedSection><About /></AnimatedSection>
        <AnimatedSection><Skills /></AnimatedSection>
        <AnimatedSection><Experience /></AnimatedSection>
        <AnimatedSection><Achievements /></AnimatedSection>
        <AnimatedSection><GitHub /></AnimatedSection>
        <AnimatedSection><Projects /></AnimatedSection>
        <AnimatedSection><Contact /></AnimatedSection>
      </main>

      <Footer />
    </>
  );
}
