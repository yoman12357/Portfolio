import { MotionConfig } from 'framer-motion';
import { portfolioData } from './data/portfolioData';
import { useTheme } from './hooks/useTheme';
import SiteHeader from './components/site/SiteHeader';
import HeroSection from './components/site/HeroSection';
import KeyHighlightsSection from './components/site/KeyHighlightsSection';
import SectionTransition from './components/site/SectionTransition';
import StatementSection from './components/site/StatementSection';
import AboutSection from './components/site/AboutSection';
import SecurityMindsetSection from './components/site/SecurityMindsetSection';
import SkillsSection from './components/site/SkillsSection';
import ProjectsSection from './components/site/ProjectsSection';
import ExperienceSection from './components/site/ExperienceSection';
import ContactSection from './components/site/ContactSection';
import SiteFooter from './components/site/SiteFooter';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <MotionConfig
      reducedMotion="user"
      transition={{
        duration: 0.34,
        ease: [0.22, 1, 0.36, 1],
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
          <div className="ambient-orb ambient-orb--one" />
          <div className="ambient-orb ambient-orb--two" />
          <div className="ambient-orb ambient-orb--three" />

          <SiteHeader
            theme={theme}
            onToggleTheme={toggleTheme}
            navigation={portfolioData.navigation}
            profile={portfolioData.profile}
          />

          <main id="main-content" tabIndex="-1">
            <HeroSection profile={portfolioData.profile} hero={portfolioData.hero} />
            <KeyHighlightsSection keyHighlights={portfolioData.keyHighlights} />
            <SectionTransition
              step="What I Believe"
              title="The portfolio moves from identity into belief, showing the principles that shape how I approach product quality, trust, and technical decisions."
            />
            <StatementSection statement={portfolioData.statement} />
            <SectionTransition
              step="What I Do"
              title="Those principles become practice through my development approach, security mindset, and the technical capabilities I am actively building."
            />
            <AboutSection profile={portfolioData.profile} about={portfolioData.about} />
            <SecurityMindsetSection securityMindset={portfolioData.securityMindset} />
            <SkillsSection skills={portfolioData.skills} />
            <SectionTransition
              step="What I Built"
              title="The next section turns that capability into tangible work, with projects framed as engineering decisions, systems tradeoffs, and applied learning."
            />
            <ProjectsSection projects={portfolioData.projects} />
            <SectionTransition
              step="Why It Matters"
              title="Projects matter most when they compound into stronger judgment, clearer delivery, and a more credible technical direction over time."
            />
            <ExperienceSection experience={portfolioData.experience} />
            <SectionTransition
              step="How To Reach Me"
              title="The final step is simple: if the direction and mindset resonate, there is an easy path to start a conversation."
            />
            <ContactSection profile={portfolioData.profile} contact={portfolioData.contact} />
          </main>

          <SiteFooter profile={portfolioData.profile} footer={portfolioData.footer} />
        </div>
      </>
    </MotionConfig>
  );
}
