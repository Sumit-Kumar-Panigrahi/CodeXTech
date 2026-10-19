import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Layers,
  Code2,
  Activity,
  Clock,
  ImageOff,
} from 'lucide-react';
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

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [imageError, setImageError] = useState(false);
  const scrollPosRef = useRef<number>(0);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  // Preserve scroll position & manage keyboard accessibility
  useEffect(() => {
    scrollPosRef.current = window.scrollY;
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      // Preserve exact scroll position so user returns to the projects cards
      window.scrollTo({ top: scrollPosRef.current, behavior: 'instant' });
      // Restore focus to the card/button that triggered the modal
      if (previouslyFocusedRef.current && typeof previouslyFocusedRef.current.focus === 'function') {
        previouslyFocusedRef.current.focus();
      }
    };
  }, [onClose]);

  if (!project) return null;

  const hasLiveUrl = Boolean(project.liveUrl && project.liveUrl.trim().length > 0);
  const hasRepoUrl = Boolean(project.repoUrl && project.repoUrl.trim().length > 0);
  const cleanDomain = `${project.id}.codextech.internal`;

  return (
    <AnimatePresence>
      <div
        className={styles.modalOverlay}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={onClose}
      >
        <motion.div
          className={styles.modalCard}
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar with Back Button & Close X */}
          <div className={styles.modalHeader}>
            <div className={styles.modalHeaderLeft}>
              {/* Obvious Back to Projects Button */}
              <button
                type="button"
                className={styles.backBtn}
                onClick={onClose}
                aria-label="Back to Projects Showcase"
                title="Return to Projects Showcase"
              >
                <ArrowLeft size={15} />
                <span>Back to Projects</span>
              </button>

              <div className={styles.modalTag}>
                <Sparkles size={12} />
                <span>{project.category}</span>
              </div>

              {project.status && (
                <div className={styles.modalStatus}>
                  <Activity size={12} />
                  <span>{project.status}</span>
                </div>
              )}
            </div>

            {/* Close X Button */}
            <button
              type="button"
              className={styles.closeBtn}
              onClick={onClose}
              title="Close modal (Esc)"
              aria-label="Close modal"
            >
              <X size={17} />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className={styles.modalBody}>
            {/* Full Dashboard Screenshot Showcase Container */}
            <div className={styles.modalImageFrame}>
              <div className={styles.modalImageChrome}>
                <div className={styles.chromeDots}>
                  <span className={`${styles.dot} ${styles.dotRed}`} />
                  <span className={`${styles.dot} ${styles.dotYellow}`} />
                  <span className={`${styles.dot} ${styles.dotGreen}`} />
                </div>
                <span className={styles.chromeUrl}>{cleanDomain}</span>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                  Interactive Production Capture
                </span>
              </div>

              <div className={styles.modalImageContainer}>
                {!imageError ? (
                  <img
                    src={project.thumbnailUrl}
                    alt={`${project.title} High-Resolution Dashboard`}
                    className={styles.modalImage}
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className={styles.imageFallbackBox}>
                    <ImageOff size={32} color="var(--color-accent-primary)" />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--color-text-primary)' }}>
                        Dashboard Screenshot Not Found
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                        Missing file: <code style={{ color: 'var(--color-warm-amber)' }}>{project.thumbnailUrl}</code>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Split Details Section */}
            <div className={styles.modalDetailsGrid}>
              {/* Left Column: Overview & Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                <div>
                  <h2 id="project-modal-title" className={styles.modalProjectTitle}>
                    {project.title}
                  </h2>
                  <p className={styles.modalTagline}>{project.tagline}</p>
                </div>

                <div className={styles.modalDetailSection}>
                  <div className={styles.modalSectionTitle}>
                    <Layers size={13} />
                    <span>System Overview</span>
                  </div>
                  <p className={styles.modalDesc}>{project.description}</p>
                </div>

                {/* Verified Architecture Features */}
                {project.features && project.features.length > 0 && (
                  <div className={styles.modalDetailSection}>
                    <div className={styles.modalSectionTitle}>
                      <CheckCircle2 size={13} />
                      <span>Verified System Capabilities</span>
                    </div>
                    <ul className={styles.featuresList}>
                      {project.features.map((feat, idx) => (
                        <li key={idx} className={styles.featureItem}>
                          <Sparkles size={12} className={styles.featureIcon} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right Column: Tech Stack & Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                {/* Metrics / Key Specs */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className={styles.modalDetailSection}>
                    <div className={styles.modalSectionTitle}>
                      <Activity size={13} />
                      <span>Architecture Highlights</span>
                    </div>
                    <div className={styles.metricsGrid}>
                      {project.metrics.map((m, idx) => (
                        <div key={idx} className={styles.metricBox}>
                          <div className={styles.metricVal}>{m.value}</div>
                          <div className={styles.metricLab}>{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies */}
                <div className={styles.modalDetailSection}>
                  <div className={styles.modalSectionTitle}>
                    <Code2 size={13} />
                    <span>Engine & Technologies</span>
                  </div>
                  <div className={styles.techRow} style={{ marginBottom: 0 }}>
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className={styles.techPill}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Repository & Live Demo Actions */}
                <div className={styles.modalActionPanel}>
                  {hasLiveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.btnPrimaryLink}
                    >
                      <ExternalLink size={14} />
                      <span>Open Live Application</span>
                    </a>
                  )}

                  {hasRepoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.btnSecondaryLink}
                    >
                      <GithubIcon size={14} />
                      <span>Browse GitHub Repository</span>
                    </a>
                  )}

                  {/* Clean message when links are empty / pending */}
                  {!hasLiveUrl && !hasRepoUrl && (
                    <div className={styles.linksPendingNotice}>
                      <Clock size={15} style={{ flexShrink: 0 }} />
                      <span>
                        Repository source and live deployment links will be released when ready.
                      </span>
                    </div>
                  )}

                  {/* Obvious Bottom Return to Projects Button */}
                  <button
                    type="button"
                    className={styles.btnSecondaryLink}
                    onClick={onClose}
                    style={{ cursor: 'pointer', border: '1px solid rgba(255, 255, 255, 0.16)' }}
                    aria-label="Return to Projects Showcase"
                  >
                    <ArrowLeft size={14} />
                    <span>Back to Projects Showcase</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
