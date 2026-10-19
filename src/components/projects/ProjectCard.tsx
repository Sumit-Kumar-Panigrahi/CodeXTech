import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Eye, Sparkles, ImageOff } from 'lucide-react';
import type { Project } from '../../types';
import styles from './Projects.module.css';

const GithubIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect, index }) => {
  const [imageError, setImageError] = React.useState(false);
  const hasLiveUrl = Boolean(project.liveUrl && project.liveUrl.trim().length > 0);
  const hasRepoUrl = Boolean(project.repoUrl && project.repoUrl.trim().length > 0);

  const cleanDomain = `${project.id}.codextech.internal`;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(project);
    }
  };

  return (
    <motion.article
      className={styles.projectCard}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: index * 0.12 }}
      onClick={() => onSelect(project)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
    >
      {/* Browser Window Chrome */}
      <div className={styles.cardChrome}>
        <div className={styles.chromeDots}>
          <span className={`${styles.dot} ${styles.dotRed}`} />
          <span className={`${styles.dot} ${styles.dotYellow}`} />
          <span className={`${styles.dot} ${styles.dotGreen}`} />
        </div>
        <span className={styles.chromeUrl}>{cleanDomain}</span>
        {project.status && (
          <span className={styles.chromeStatus}>
            <span className={styles.statusIndicator} />
            {project.status}
          </span>
        )}
      </div>

      {/* Screenshot Preview Stage */}
      <div className={styles.previewStage}>
        {!imageError ? (
          <img
            src={project.thumbnailUrl}
            alt={`${project.title} Dashboard Interface`}
            className={styles.dashboardImage}
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={styles.imageFallbackBox} style={{ padding: 'var(--space-4)' }}>
            <ImageOff size={24} color="var(--color-accent-primary)" />
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
              Preview Missing: {project.thumbnailUrl}
            </span>
          </div>
        )}
        <div className={styles.previewOverlay} />
        <div className={styles.hoverExpandPill}>
          <Eye size={13} />
          <span>Inspect Architecture</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className={styles.cardBody}>
        <div className={styles.categoryBadge}>
          <Sparkles size={11} />
          <span>{project.category}</span>
        </div>

        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.projectTagline}>{project.tagline}</p>
        <p className={styles.projectDesc}>{project.description}</p>

        {/* Verified Tech Badges */}
        <div className={styles.techRow}>
          {project.technologies.slice(0, 4).map((tech, idx) => (
            <span key={idx} className={styles.techPill}>
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className={styles.techPill}>+{project.technologies.length - 4} more</span>
          )}
        </div>

        {/* Action Footer */}
        <div className={styles.cardFooter}>
          <button
            type="button"
            className={styles.viewDetailsBtn}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(project);
            }}
          >
            <span>Project Details</span>
            <ArrowRight size={13} />
          </button>

          {/* External Links — Only rendered when valid URLs exist */}
          {(hasLiveUrl || hasRepoUrl) && (
            <div className={styles.externalActions} onClick={(e) => e.stopPropagation()}>
              {hasLiveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.iconLinkBtn}
                  title="Open Live Website"
                  aria-label="Open Live Website"
                >
                  <ExternalLink size={14} />
                </a>
              )}
              {hasRepoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.iconLinkBtn}
                  title="View GitHub Repository"
                  aria-label="View GitHub Repository"
                >
                  <GithubIcon size={14} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
};
