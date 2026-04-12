import { lazy, memo, Suspense, useCallback, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { MOTION_DURATION, MOTION_EASE } from './animations/variants';
import { portfolioData } from './data/portfolioData';
import { useTheme } from './hooks/useTheme';
import DeferredSection from './components/site/DeferredSection';
import SiteHeader from './components/site/SiteHeader';
import HeroSection from './components/site/HeroSection';
import KeyHighlightsSection from './components/site/KeyHighlightsSection';
import SectionTransition from './components/site/SectionTransition';
import AboutSection from './components/site/AboutSection';
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
  const [allowCustomCursor, setAllowCustomCursor] = useState(false);
  const [allowHeavyVisuals, setAllowHeavyVisuals] = useState(false);
  const openResume = useCallback(() => setResumeOpen(true), []);
  const closeResume = useCallback(() => setResumeOpen(false), []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const saveDataEnabled = Boolean(connection?.saveData);
    const lowBandwidth = typeof connection?.effectiveType === 'string' && /2g/.test(connection.effectiveType);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const deviceMemory = navigator.deviceMemory ?? 4;
    const hardwareConcurrency = navigator.hardwareConcurrency ?? 4;
    const canRunEnhancements = !saveDataEnabled && !lowBandwidth && !prefersReducedMotion;

    setAllowCustomCursor(canRunEnhancements && hardwareConcurrency >= 6 && deviceMemory >= 4);
    setAllowHeavyVisuals(canRunEnhancements && hardwareConcurrency >= 6 && deviceMemory >= 4);

    if (!canRunEnhancements) {
      setEnhancementsReady(false);
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
              {allowCustomCursor ? <CustomCursor /> : null}
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
            <AboutSection profile={portfolioData.profile} about={portfolioData.about} />
            <SkillsSection skills={portfolioData.skills} />
            <SectionTransition
              step="What I Built"
              title="The next section turns that capability into tangible work, with projects framed as engineering decisions, systems tradeoffs, and applied learning."
            />
            <DeferredSection
              id="projects"
              placeholderHeightClassName="min-h-[28rem]"
              render={() => (
                <Suspense fallback={<LazySectionFallback id="projects" />}>
                  <ProjectsSection projects={portfolioData.projects} />
                </Suspense>
              )}
            />
            <DeferredSection
              id="experience"
              placeholderHeightClassName="min-h-[30rem]"
              render={() => (
                <Suspense fallback={<LazySectionFallback id="experience" />}>
                  <ExperienceSection experience={portfolioData.experience} />
                </Suspense>
              )}
            />
            <DeferredSection
              id="contact"
              className="section-space pb-24 sm:pb-28"
              placeholderHeightClassName="min-h-[24rem]"
              render={() => (
                <Suspense fallback={<LazySectionFallback id="contact" className="section-space pb-24 sm:pb-28" />}>
                  <ContactSection
                    contact={portfolioData.contact}
                    onOpenResume={openResume}
                    enableOrbitalScene={allowHeavyVisuals}
                  />
                </Suspense>
              )}
            />
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
