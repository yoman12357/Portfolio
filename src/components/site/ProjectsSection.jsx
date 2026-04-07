import { motion as Motion } from 'framer-motion';
import { useState } from 'react';
import Reveal from './Reveal';
import ProjectCard from './ProjectCard';
import ProjectDetailsModal from './ProjectDetailsModal';
import SectionHeading from './SectionHeading';
import StaggerGroup from './StaggerGroup';
import { createStaggerItem } from './motion';

export default function ProjectsSection({ projects }) {
  const [activeProject, setActiveProject] = useState(null);
  const [featuredProject, ...otherProjects] = projects.items;

  return (
    <section id="projects" className="section-space">
      <div className="section-shell">
        <SectionHeading label={projects.label} title={projects.title} description={projects.subtitle} />

        <div className="mt-20">
          <Reveal>
            <ProjectCard
              project={featuredProject}
              featured
              onViewDetails={() => setActiveProject(featuredProject)}
            />
          </Reveal>

          <StaggerGroup className="mt-9 grid gap-6 lg:grid-cols-2" stagger={0.08}>
            {otherProjects.map((project) => (
              <Motion.div key={project.name} variants={createStaggerItem(18, 0.46)} className="h-full">
                <ProjectCard project={project} onViewDetails={() => setActiveProject(project)} />
              </Motion.div>
            ))}
          </StaggerGroup>
        </div>
      </div>

      <ProjectDetailsModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
