import React from 'react';
import { Compass, Sparkles } from 'lucide-react';
import { timelineData } from '../../data/timelineData';
import styles from './HomeDashboard.module.css';

export const JourneyPreview: React.FC = () => {
  return (
    <section id="journey" className={styles.journeySection} aria-label="Team Journey and Milestones">
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>
            <Compass size={13} />
            <span>Origins & Path</span>
          </div>
          <h2 className={styles.sectionTitle}>Team Journey & Milestones</h2>
          <p className={styles.sectionDesc}>
            Real milestones and formative accomplishments from the CODEXTECH roadmap.
          </p>
        </div>

        <div className={styles.timelineList}>
          {timelineData.map((milestone) => {
            const isPlaceholder = milestone.title.startsWith('[');

            return (
              <div key={milestone.id} className={styles.timelineCard}>
                <div className={styles.timelineYear}>
                  {milestone.year}
                  {milestone.dateOrQuarter && (
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                      {milestone.dateOrQuarter}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-primary)' }}>
                      {milestone.title}
                    </h3>
                    {milestone.badge && (
                      <span
                        style={{
                          fontSize: '10px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          fontWeight: 600,
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-full)',
                          background: isPlaceholder ? 'rgba(255, 255, 255, 0.06)' : 'rgba(38, 208, 206, 0.15)',
                          color: isPlaceholder ? 'var(--color-text-muted)' : 'var(--color-cyan-circuit)',
                          border: isPlaceholder ? '1px dashed var(--color-border-subtle)' : '1px solid rgba(38, 208, 206, 0.3)',
                        }}
                      >
                        {milestone.badge}
                      </span>
                    )}
                  </div>

                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                    {milestone.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informative notice */}
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
            maxWidth: '800px',
          }}
        >
          <Sparkles size={14} color="var(--color-accent-primary)" />
          <span>
            The full interactive timeline experience and verified hackathon achievements will be finalized in later stages.
          </span>
        </div>
      </div>
    </section>
  );
};
