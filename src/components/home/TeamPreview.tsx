import React from 'react';
import { Users, ShieldCheck, Sparkles } from 'lucide-react';
import { teamMembers } from '../../data/teamData';
import styles from './HomeDashboard.module.css';

export const TeamPreview: React.FC = () => {
  return (
    <section id="team" className={styles.teamSection} aria-label="Team Members Preview">
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>
            <Users size={13} />
            <span>The Collective</span>
          </div>
          <h2 className={styles.sectionTitle}>Meet the CODEXTECH Team</h2>
          <p className={styles.sectionDesc}>
            Six focused technologists engineering software architectures and creative digital products.
          </p>
        </div>

        <div className={styles.teamGrid}>
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className={`${styles.teamMemberCard} ${member.isLeader ? styles.leader : ''}`}
            >
              <img
                src={member.photoUrl}
                alt={member.name}
                className={styles.memberPhoto}
              />
              <div className={styles.memberMeta}>
                <h4>{member.name}</h4>
                <span>{member.role}</span>
                {member.isLeader && (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      marginTop: '4px',
                      fontSize: '10px',
                      color: 'var(--color-cyan-circuit)',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                    }}
                  >
                    <ShieldCheck size={11} />
                    <span>Founder / Leader</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Informative notice */}
        <div
          style={{
            marginTop: 'var(--space-8)',
            padding: 'var(--space-4)',
            background: 'rgba(255, 78, 38, 0.05)',
            border: '1px solid var(--color-border-accent)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-text-secondary)',
          }}
        >
          <Sparkles size={15} color="var(--color-accent-primary)" />
          <span>
            Click on any team member card in the showcase to experience their interactive spoken voice introduction and full profile.
          </span>
        </div>
      </div>
    </section>
  );
};
