import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Sparkles } from 'lucide-react';
import { HeroInteractiveCore } from './HeroInteractiveCore';
import styles from './HomeDashboard.module.css';

export const HeroSection: React.FC = () => {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className={styles.heroSection}>
      <div className="container">
        <div className={styles.heroGrid}>
          {/* Left Column: Headline and Call to Actions */}
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.heroBadge}>
              <Sparkles size={13} />
              <span>Technology Collective & Creative Studio</span>
            </div>

            <h1 className={styles.heroTitle}>
              Engineering Digital Reality from{' '}
              <span className={styles.heroTitleAccent}>Visionary Ideas</span>.
            </h1>

            <p className={styles.heroDescription}>
              We believe every great idea begins with a simple thought. When creativity,
              technology, and teamwork come together, that thought becomes reality. Welcome
              to CODEXTECH.
            </p>

            <div className={styles.heroActions}>
              <a
                href="#projects"
                className={styles.btnPrimary}
                onClick={(e) => handleScrollTo(e, '#projects')}
              >
                <span>Explore Projects</span>
                <ArrowRight size={16} />
              </a>

              <a
                href="#team"
                className={styles.btnSecondary}
                onClick={(e) => handleScrollTo(e, '#team')}
              >
                <Users size={16} color="var(--color-accent-primary)" />
                <span>Meet the Team</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Holographic Interactive Tech Core */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <HeroInteractiveCore />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
