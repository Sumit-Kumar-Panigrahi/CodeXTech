import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Users } from 'lucide-react';
import { teamMembers } from '../../data/teamData';
import type { TeamMember } from '../../types';
import { TeamCard } from './TeamCard';
import { MemberIntroModal } from './MemberIntroModal';
import styles from './TeamSection.module.css';

export const TeamSection: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <section id="team" className={styles.teamSection} aria-label="CODEXTECH Team Members Showcase">
      <div className="container">
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>
            <Users size={13} />
            <span>The Engineering Collective</span>
          </div>
          <h2 className={styles.sectionTitle}>Meet the CODEXTECH Team</h2>
          <p className={styles.sectionDesc}>
            Six focused technologists dedicated to software engineering, creative design, and digital innovation.
            Click on any member to experience their spoken introduction and explore their full profile.
          </p>
        </div>

        {/* 6 Member Cards Grid */}
        <div className={styles.teamGrid}>
          {teamMembers.map((member) => (
            <TeamCard
              key={member.id}
              member={member}
              onSelect={(m) => setSelectedMember(m)}
            />
          ))}
        </div>
      </div>

      {/* Interactive Member Modal with Spoken Intro & Detailed Profile */}
      <AnimatePresence>
        {selectedMember && (
          <MemberIntroModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
