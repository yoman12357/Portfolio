import { lazy, memo, Suspense, useCallback, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { MOTION_DURATION, MOTION_EASE } from './animations/variants';
import { portfolioData } from './data/portfolioData';
import { useTheme } from './hooks/useTheme';
import SiteHeader from './components/site/SiteHeader';
import HeroSection from './components/site/HeroSection';
import KeyHighlightsSection from './components/site/KeyHighlightsSection';
import SectionTransition from './components/site/SectionTransition';
import StatementSection from './components/site/StatementSection';
import AboutSection from './components/site/AboutSection';
import SecurityMindsetSection from './components/site/SecurityMindsetSection';
import CurrentlyLearningSection from './components/site/CurrentlyLearningSection';
import SkillsSection from './components/site/SkillsSection';
import SiteFooter from './components/site/SiteFooter';
import ResumeModal from './components/site/ResumeModal';

const ScrollProgress = lazy(() => import('./components/site/ScrollProgress'));
const CustomCursor = lazy(() => import('./components/site/CustomCursor'));
const ProjectsSection = lazy(() => import('./components/site/ProjectsSection'));
const ExperienceSection = lazy(() => import('./components/site/ExperienceSection'));
const ContactSection = lazy(() => import('./components/site/ContactSection'));

const LazySectionFallback = memo(function LazySectionFallback({ id, className = 'section-space' }) {
  return (
    <section id={id} className={className} aria-hidden="true">
      <div className="section-shell" />
    </section>
  );
});

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [resumeOpen, setResumeOpen] = useState(false);
  const [enhancementsReady, setEnhancementsReady] = useState(false);
  const openResume = useCallback(() => setResumeOpen(true), []);
  const closeResume = useCallback(() => setResumeOpen(false), []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const enableEnhancements = () => setEnhancementsReady(true);

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(enableEnhancements, { timeout: 1200 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(enableEnhancements, 700);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <MotionConfig
      reducedMotion="user"
      transition={{
        duration: MOTION_DURATION,
        ease: MOTION_EASE,
      }}
    >
      <>
        <a
          href="#main-content"
          className="sr-only fixed left-4 top-4 z-[100] rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-[var(--theme-shadow)] focus:not-sr-only focus:outline-none"
        >
          Skip to content
        </a>

        <div className="relative min-h-screen overflow-x-clip bg-background text-foreground transition-colors duration-300 ease-in-out">
          {enhancementsReady ? (
            <Suspense fallback={null}>
              <ScrollProgress />
              <CustomCursor />
            </Suspense>
          ) : null}
          <div className="ambient-orb ambient-orb--one" />
          <div className="ambient-orb ambient-orb--two" />
          <div className="ambient-orb ambient-orb--three" />

          <SiteHeader
            theme={theme}
            onToggleTheme={toggleTheme}
            navigation={portfolioData.navigation}
            profile={portfolioData.profile}
            onOpenResume={openResume}
          />

          <main id="main-content" tabIndex="-1">
            <HeroSection profile={portfolioData.profile} hero={portfolioData.hero} onOpenResume={openResume} />
            <KeyHighlightsSection keyHighlights={portfolioData.keyHighlights} />
            <SectionTransition
              step="What I Believe"
              title="The portfolio moves from identity into belief, showing the principles that shape how I approach product quality, trust, and technical decisions."
            />
            <StatementSection statement={portfolioData.statement} />
            <SectionTransition
              step="What I Do"
              title="Those principles become practice through my development approach, security focus, and the technical capabilities I am actively building."
            />
            <AboutSection profile={portfolioData.profile} about={portfolioData.about} />
            <SecurityMindsetSection securityFocus={portfolioData.securityFocus} />
            <SkillsSection skills={portfolioData.skills} />
            <CurrentlyLearningSection learning={portfolioData.currentlyLearning} />
            <SectionTransition
              step="What I Built"
              title="The next section turns that capability into tangible work, with projects framed as engineering decisions, systems tradeoffs, and applied learning."
            />
            <Suspense fallback={<LazySectionFallback id="projects" />}>
              <ProjectsSection projects={portfolioData.projects} />
            </Suspense>
            <SectionTransition
              step="Why It Matters"
              title="Projects matter most when they compound into stronger judgment, clearer delivery, and a more credible technical direction over time."
            />
            <Suspense fallback={<LazySectionFallback id="experience" />}>
              <ExperienceSection experience={portfolioData.experience} />
            </Suspense>
            <SectionTransition
              step="How To Reach Me"
              title="The final step is simple: if the direction and mindset resonate, there is an easy path to start a conversation."
            />
            <Suspense fallback={<LazySectionFallback id="contact" className="section-space pb-24 sm:pb-28" />}>
              <ContactSection contact={portfolioData.contact} onOpenResume={openResume} />
            </Suspense>
          </main>

          <SiteFooter profile={portfolioData.profile} footer={portfolioData.footer} onOpenResume={openResume} />

          <Suspense fallback={null}>
            <AnimatePresence initial={false} mode="wait">
              {resumeOpen ? (
                <ResumeModal
                  key="resume-modal"
                  profile={portfolioData.profile}
                  hero={portfolioData.hero}
                  about={portfolioData.about}
                  skills={portfolioData.skills}
                  securityFocus={portfolioData.securityFocus}
                  projects={portfolioData.projects}
                  experience={portfolioData.experience}
                  onClose={closeResume}
                />
              ) : null}
            </AnimatePresence>
          </Suspense>
        </div>
      </>
    </MotionConfig>
  );
}
