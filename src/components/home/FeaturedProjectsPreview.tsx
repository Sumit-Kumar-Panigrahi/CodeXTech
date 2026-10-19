import React from 'react';
import { ExternalLink, Layers, Sparkles } from 'lucide-react';
import { projectsData } from '../../data/projectsData';
import styles from './HomeDashboard.module.css';

export const FeaturedProjectsPreview: React.FC = () => {
  return (
    <section id="projects" className={styles.projectsSection} aria-label="Featured Projects Showcase">
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>
            <Sparkles size={13} />
            <span>Featured Engineering Work</span>
          </div>
          <h2 className={styles.sectionTitle}>Featured Projects Showcase</h2>
          <p className={styles.sectionDesc}>
            A curated glimpse of our digital builds and technical explorations. Full case studies and live demos will be expanded in Step 7.
          </p>
        </div>

        <div className={styles.projectsGrid}>
          {projectsData.map((project) => {
            const isPlaceholder = project.title.startsWith('[');

            return (
              <div
                key={project.id}
                className={`${styles.projectCard} ${isPlaceholder ? styles.placeholder : ''}`}
              >
                <div className={styles.projectThumbWrap}>
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title}
                    className={styles.projectThumb}
                  />
                  {isPlaceholder && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'rgba(0, 0, 0, 0.75)',
                        border: '1px solid var(--color-border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '3px 8px',
                        fontSize: '10px',
                        color: 'var(--color-text-muted)',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                      }}
                    >
                      Placeholder Slot
                    </div>
                  )}
                </div>

                <div className={styles.projectBody}>
                  <span className={styles.projectTag}>{project.category}</span>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDesc}>{project.description}</p>

                  <div className={styles.projectTechs}>
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className={styles.techBadge}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  {!isPlaceholder && project.liveUrl && project.liveUrl.length > 0 && (
                    <div style={{ marginTop: 'var(--space-3)' }}>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: 'var(--font-size-xs)',
                          color: 'var(--color-text-accent)',
                          fontWeight: 600,
                        }}
                      >
                        <span>View Live Demo</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Small informative banner */}
        <div
          style={{
            marginTop: 'var(--space-8)',
            padding: 'var(--space-4)',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-text-muted)',
          }}
        >
          <Layers size={15} color="var(--color-cyan-circuit)" />
          <span>
            Project details, filterable categories, and interactive modals will be fully integrated during Step 7.
          </span>
        </div>
      </div>
    </section>
  );
};
