import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Award, Sparkles, Trophy, Landmark } from 'lucide-react';
import type { Milestone } from '../../types';
import styles from './Timeline.module.css';

interface TimelineCardProps {
  milestone: Milestone;
  index: number;
  isLeft: boolean;
}

export const TimelineCard: React.FC<TimelineCardProps> = ({ milestone, index, isLeft }) => {
  const isAchievement =
    milestone.category.toLowerCase().includes('achievement') || Boolean(milestone.achievement);

  return (
    <motion.div
      className={`${styles.milestoneCard} ${isAchievement ? styles.achievementCard : ''}`}
      initial={{ opacity: 0, x: isLeft ? -30 : 30, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      {/* Top Metadata Badges */}
      <div className={styles.cardTagsRow}>
        <span className={styles.categoryTag}>
          <Sparkles size={11} />
          <span>{milestone.category}</span>
        </span>

        {/* Formation Date (Only rendered when verified date exists) */}
        {milestone.date && (
          <span className={styles.datePill}>
            <Calendar size={11} />
            <span>{milestone.date}</span>
          </span>
        )}

        {/* Institution Pill (For Hackathon) */}
        {milestone.institution && (
          <span className={styles.institutionPill}>
            <Landmark size={11} />
            <span>{milestone.institution}</span>
          </span>
        )}

        {/* Achievement Status (Finalist) */}
        {milestone.achievement && (
          <span className={styles.achievementTag}>
            <Trophy size={11} />
            <span>{milestone.achievement}</span>
          </span>
        )}
      </div>

      {/* Main Title */}
      <h3 className={styles.cardTitle}>{milestone.title}</h3>

      {/* Subtitle / Event Name if present */}
      {milestone.event && (
        <div className={styles.cardSubtitle}>
          <Award size={14} />
          <span>{milestone.event}</span>
        </div>
      )}

      {/* Verified Description */}
      <p className={styles.cardDesc}>{milestone.description}</p>
    </motion.div>
  );
};
