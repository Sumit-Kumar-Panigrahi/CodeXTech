import React from 'react';
import { Compass, Rocket, Trophy } from 'lucide-react';
import { timelineData } from '../../data/timelineData';
import { TimelineCard } from './TimelineCard';
import styles from './Timeline.module.css';

export const TimelineSection: React.FC = () => {
  return (
    <section id="journey" className={styles.timelineSection} aria-label="Formation & Milestones Timeline">
      {/* Background Ambient Glow */}
      <div className={styles.ambientGlow} />

      <div className="container">
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>
            <Compass size={13} />
            <span>Origins & Path</span>
          </div>
          <h2 className={styles.sectionTitle}>
            Formation & <span className={styles.titleAccent}>Milestones</span>
          </h2>
          <p className={styles.sectionDesc}>
            Key defining moments in the evolution of CODEXTECH, reflecting our commitment to continuous learning,
            engineering excellence, and competitive innovation.
          </p>
        </div>

        {/* Central Vertical Spine Timeline */}
        <div className={styles.timelineContainer}>
          {/* Animated Gradient Spine Line */}
          <div className={styles.timelineSpine} />

          {timelineData.map((milestone, index) => {
            const isLeft = index % 2 === 0;
            const isAchievement =
              milestone.category.toLowerCase().includes('achievement') ||
              Boolean(milestone.achievement);

            return (
              <div
                key={milestone.id}
                className={`${styles.timelineRow} ${
                  isLeft ? styles.timelineRowLeft : styles.timelineRowRight
                }`}
              >
                {/* Center Node with Glowing Pulse */}
                <div
                  className={styles.timelineNode}
                  aria-hidden="true"
                  title={milestone.title}
                >
                  <span className={styles.nodePulse} />
                  {isAchievement ? (
                    <Trophy size={18} className={styles.nodeIconAchievement} />
                  ) : (
                    <Rocket size={18} className={styles.nodeIconFormation} />
                  )}
                </div>

                {/* Milestone Card */}
                <div className={styles.cardSlot}>
                  <TimelineCard milestone={milestone} index={index} isLeft={isLeft} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
