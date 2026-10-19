import React, { useState } from 'react';
import { Sparkles, Terminal } from 'lucide-react';
import { projectsData } from '../../data/projectsData';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import type { Project } from '../../types';
import styles from './Projects.module.css';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className={styles.projectsSection} aria-label="Featured Engineering Projects">
      {/* Background Ambient Glow */}
      <div className={styles.ambientGlow} />

      <div className="container">
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>
            <Sparkles size={13} />
            <span>Featured Engineering Work</span>
          </div>
          <h2 className={styles.sectionTitle}>
            Engineering & <span className={styles.titleAccent}>Digital Creations</span>
          </h2>
          <p className={styles.sectionDesc}>
            Explore our signature production systems designed and built by the CodeXTech collective,
            featuring zero-trust cybersecurity, AI defence pipelines, and gamified experience engines.
          </p>
        </div>

        {/* 2-Project Showcase Grid */}
        <div className={styles.projectsGrid}>
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={setSelectedProject}
              index={index}
            />
          ))}
        </div>

        {/* Bottom Tech Assurance Pill */}
        <div
          style={{
            marginTop: 'var(--space-10)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-text-muted)',
            textAlign: 'center',
          }}
        >
          <Terminal size={13} color="var(--color-accent-primary)" />
          <span>
            Click on any project card to inspect the high-resolution architecture dashboard and system capabilities.
          </span>
        </div>
      </div>

      {/* Interactive Project Details Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
