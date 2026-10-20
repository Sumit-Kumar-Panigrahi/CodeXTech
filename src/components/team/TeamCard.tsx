import React from 'react';
import { Volume2, ShieldCheck, ArrowRight } from 'lucide-react';
import type { TeamMember } from '../../types';
import styles from './TeamCard.module.css';

interface TeamCardProps {
  member: TeamMember;
  onSelect: (member: TeamMember) => void;
}

export const TeamCard: React.FC<TeamCardProps> = ({ member, onSelect }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(member);
    }
  };

  // Extract first name for a natural, welcoming call to action (e.g. "Meet Sumit")
  const firstName = member.name.split(' ')[0];

  // Specific object-position tuning per member photo to guarantee 100% face visibility
  const getImagePosition = (id: string): string => {
    switch (id) {
      case 'siriparapu-ritesh-kumar':
        return 'center 10%';
      case 'sumit-kumar-panigrahi':
        return 'center 12%';
      case 'priyanshu-behura':
        return 'center 12%';
      case 'pranab-kumar-jena':
        return 'center 10%';
      case 'supriya-panda':
        return 'center 12%';
      case 'adity-kumari':
        return 'center 10%';
      default:
        return 'center 15%';
    }
  };

  return (
    <div
      className={`${styles.card} ${member.isLeader ? styles.cardLeader : ''}`}
      onClick={() => onSelect(member)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Open interactive profile and listen to voice introduction for ${member.name}`}
    >
      {/* Photo Frame — Full Face & Head Clear & Unobscured */}
      <div className={styles.photoWrapper}>
        <img
          src={member.photoUrl}
          alt={member.name}
          className={styles.photo}
          style={{ objectPosition: getImagePosition(member.id) }}
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.src.endsWith('/assets/team/placeholder.svg')) {
              target.src = '/assets/team/placeholder.svg';
            }
          }}
        />
        {/* Subtle fade ONLY at the very bottom edge */}
        <div className={styles.photoBottomEdgeFade} />

        {member.isLeader && (
          <div className={styles.leaderBadge}>
            <ShieldCheck size={13} />
            <span>Team Leader</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className={styles.cardBody}>
        <div className={styles.identityGroup}>
          <h3 className={styles.memberName}>{member.name}</h3>
          <span className={styles.memberRole}>{member.role}</span>
        </div>

        {/* Polished Action Pill */}
        <div className={styles.actionPill}>
          <div className={styles.actionPillText}>
            <span>Meet {firstName} • Voice Intro</span>
            <ArrowRight size={13} />
          </div>

          <div
            className={styles.speakerCircle}
            title="Spoken Voice Introduction Available"
            aria-label="Speaker audio icon"
          >
            <Volume2 size={14} />
          </div>
        </div>
      </div>
    </div>
  );
};
