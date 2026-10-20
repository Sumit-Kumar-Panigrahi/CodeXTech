import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Volume2,
  VolumeX,
  Subtitles,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Code2,
  Layers,
  User,
} from 'lucide-react';
import type { TeamMember } from '../../types';
import { useMemberSpeech } from './useMemberSpeech';
import styles from './MemberModal.module.css';

interface MemberIntroModalProps {
  member: TeamMember;
  onClose: () => void;
}

export const MemberIntroModal: React.FC<MemberIntroModalProps> = ({ member, onClose }) => {
  const [viewMode, setViewMode] = useState<'intro' | 'profile'>('intro');

  const subtitles =
    member.introSentences && member.introSentences.length > 0
      ? member.introSentences
      : [member.introScript];

  const spokenTexts =
    member.spokenSentences && member.spokenSentences.length > 0
      ? member.spokenSentences
      : subtitles;

  const {
    isPlaying,
    isMuted,
    captionsEnabled,
    activeSentence,
    activeSentenceIndex,
    totalSentences,
    needsUserGesture,
    startSequence,
    replay,
    toggleMute,
    toggleCaptions,
    stopAll,
  } = useMemberSpeech({
    memberId: member.id,
    gender: member.gender || (['supriya-panda', 'adity-kumari'].includes(member.id) ? 'female' : 'male'),
    subtitles,
    spokenTexts,
    onNarrationComplete: () => {
      setViewMode('profile');
    },
    autoPlay: true,
  });

  const handleSkipIntro = () => {
    stopAll();
    setViewMode('profile');
  };

  const handleReplayIntro = () => {
    setViewMode('intro');
    replay();
  };

  const handleClose = () => {
    stopAll();
    onClose();
  };

  // Keyboard accessibility (Escape key closes modal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const hasLinkedIn = Boolean(member.socialLinks?.linkedin && member.socialLinks.linkedin.length > 0);
  const hasGitHub = Boolean(member.socialLinks?.github && member.socialLinks.github.length > 0);
  const hasEmail = Boolean(member.socialLinks?.email && member.socialLinks.email.length > 0);

  return (
    <div
      className={styles.modalOverlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="member-modal-title"
    >
      <motion.div
        className={styles.modalCard}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Top Header Bar */}
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderLeft}>
            {viewMode === 'profile' ? (
              <button
                type="button"
                className={styles.backBtn}
                onClick={handleClose}
                title="Back to Team Showcase"
                aria-label="Back to Team Showcase"
              >
                <ArrowLeft size={14} />
                <span>Back to Team</span>
              </button>
            ) : (
              <div className={styles.modalTag}>
                <Sparkles size={13} />
                <span>Spoken Voice Introduction</span>
              </div>
            )}
          </div>

          <div className={styles.headerActions}>
            {/* Replay Button */}
            <button
              type="button"
              className={styles.actionBtn}
              onClick={handleReplayIntro}
              title="Replay Spoken Introduction from beginning"
              aria-label="Replay Spoken Introduction"
            >
              <RotateCcw size={13} />
              <span>Replay</span>
            </button>

            {/* Sound / Mute Toggle */}
            <button
              type="button"
              className={`${styles.actionBtn} ${isMuted ? styles.actionBtnActive : ''}`}
              onClick={toggleMute}
              title={isMuted ? 'Unmute Voice' : 'Mute Voice'}
              aria-label={isMuted ? 'Unmute Voice' : 'Mute Voice'}
              aria-pressed={!isMuted}
            >
              {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
              <span>{isMuted ? 'Muted' : 'Sound'}</span>
            </button>

            {/* Subtitles Toggle */}
            <button
              type="button"
              className={`${styles.actionBtn} ${captionsEnabled ? styles.actionBtnActive : ''}`}
              onClick={toggleCaptions}
              title="Toggle Subtitles"
              aria-label="Toggle Subtitles"
              aria-pressed={captionsEnabled}
            >
              <Subtitles size={13} />
              <span>{captionsEnabled ? 'CC On' : 'CC Off'}</span>
            </button>

            {/* Skip to Profile Button (only in intro mode) */}
            {viewMode === 'intro' && (
              <button
                type="button"
                className={styles.skipBtn}
                onClick={handleSkipIntro}
                title="Skip to detailed profile immediately"
              >
                <span>Skip to Profile</span>
                <ArrowRight size={13} />
              </button>
            )}

            {/* Close Button */}
            <button
              type="button"
              className={styles.closeBtn}
              onClick={handleClose}
              title="Close modal and return to team roster"
              aria-label="Close modal and return to team roster"
            >
              <X size={15} />
              <span>Close</span>
            </button>
          </div>
        </div>

        {/* Modal Body: Intro Mode vs Profile Mode */}
        <AnimatePresence mode="wait">
          {viewMode === 'intro' ? (
            <motion.div
              key="intro-screen"
              className={styles.introContent}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Portrait Frame — Crystal Clear, No Face Darkening */}
              <div className={styles.introPortraitWrap}>
                <img
                  src={member.photoUrl}
                  alt={member.name}
                  className={styles.introPortrait}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.endsWith('/assets/team/placeholder.svg')) {
                      target.src = '/assets/team/placeholder.svg';
                    }
                  }}
                />
              </div>

              {/* Dialogue & Subtitles */}
              <div className={styles.introSpeechColumn}>
                <div className={styles.speakerBadge}>
                  <User size={13} />
                  <span>CODEXTECH Core Specialist</span>
                </div>

                <div>
                  <h2 id="member-modal-title" className={styles.speakerName}>
                    {member.name}
                  </h2>
                  <div className={styles.speakerRole}>
                    {member.role} {member.isLeader && '• Team Leader'}
                  </div>
                </div>

                {/* Subtitles Box: Highlights the sentence currently being spoken */}
                {captionsEnabled ? (
                  <div className={styles.subtitleCard} aria-live="polite">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-accent-primary)', fontWeight: 600 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {isPlaying && <span className={styles.speakingPulse} />}
                        <span>{member.name}</span>
                      </div>
                      <span style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>
                        Sentence {activeSentenceIndex + 1} of {totalSentences}
                      </span>
                    </div>
                    <p className={styles.subtitleText}>"{activeSentence}"</p>
                  </div>
                ) : (
                  <div className={styles.subtitleCard} style={{ opacity: 0.6, fontStyle: 'italic' }}>
                    <p className={styles.subtitleText}>[Captions are currently turned off]</p>
                  </div>
                )}

                {/* Autoplay blocked prompt */}
                {needsUserGesture && (
                  <button
                    type="button"
                    onClick={startSequence}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      background: 'rgba(255, 78, 38, 0.18)',
                      border: '1px solid var(--color-border-accent)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--color-text-accent)',
                      fontSize: 'var(--font-size-xs)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      alignSelf: 'flex-start',
                    }}
                  >
                    <Volume2 size={15} />
                    <span>Click here to play voice introduction</span>
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="profile-screen"
              className={styles.profileScrollBody}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {/* Profile Hero Header */}
              <div className={styles.profileHeroHeader}>
                <img
                  src={member.photoUrl}
                  alt={member.name}
                  className={styles.profileHeroPhoto}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.endsWith('/assets/team/placeholder.svg')) {
                      target.src = '/assets/team/placeholder.svg';
                    }
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <h2 id="member-modal-title" className={styles.profileName}>
                      {member.name}
                    </h2>
                    {member.isLeader && (
                      <span
                        style={{
                          fontSize: '10px',
                          textTransform: 'uppercase',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: 'var(--radius-full)',
                          background: 'rgba(255, 78, 38, 0.15)',
                          color: 'var(--color-accent-primary)',
                          border: '1px solid var(--color-border-accent)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <ShieldCheck size={11} />
                        Team Leader
                      </span>
                    )}
                  </div>
                  <div className={styles.profileRole}>{member.role}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', alignSelf: 'flex-start', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={handleClose}
                    className={styles.backBtn}
                    title="Return to Team Roster"
                  >
                    <ArrowLeft size={13} />
                    <span>Back to Team</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleReplayIntro}
                    className={styles.actionBtn}
                  >
                    <RotateCcw size={12} />
                    <span>Replay Voice Intro</span>
                  </button>
                </div>
              </div>

              {/* Bio & Philosophy */}
              <div className={styles.profileSectionBlock}>
                <div className={styles.profileSectionTitle}>
                  <User size={13} color="var(--color-accent-primary)" />
                  <span>Background & Philosophy</span>
                </div>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  {member.bio}
                </p>
              </div>

              {/* Technical Specializations */}
              <div className={styles.profileSectionBlock}>
                <div className={styles.profileSectionTitle}>
                  <Code2 size={13} color="var(--color-cyan-circuit)" />
                  <span>Technical Specializations</span>
                </div>
                <div className={styles.skillsPillGrid}>
                  {member.skills.map((skill, idx) => (
                    <span key={idx} className={styles.skillPill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contributions & Key Focus */}
              {member.contributions && member.contributions.length > 0 && (
                <div className={styles.profileSectionBlock}>
                  <div className={styles.profileSectionTitle}>
                    <Layers size={13} color="var(--color-warm-amber)" />
                    <span>Project Contributions & Focus</span>
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {member.contributions.map((item, idx) => (
                      <li key={idx} style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Verified Social Profiles (Only displayed when links are provided) */}
              {(hasLinkedIn || hasGitHub || hasEmail) && (
                <div className={styles.profileSectionBlock}>
                  <div className={styles.profileSectionTitle}>
                    <ExternalLink size={13} color="var(--color-accent-primary)" />
                    <span>Verified Profiles</span>
                  </div>
                  <div className={styles.socialRow}>
                    {hasLinkedIn && (
                      <a
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLinkBtn}
                        aria-label={`${member.name}'s official LinkedIn profile (opens in new tab)`}
                      >
                        LinkedIn <ExternalLink size={11} />
                      </a>
                    )}
                    {hasGitHub && (
                      <a
                        href={member.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLinkBtn}
                        aria-label={`${member.name}'s GitHub profile (opens in new tab)`}
                      >
                        GitHub <ExternalLink size={11} />
                      </a>
                    )}
                    {hasEmail && (
                      <a
                        href={`mailto:${member.socialLinks.email}`}
                        className={styles.socialLinkBtn}
                      >
                        Email
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Bottom Quick Return Button */}
              <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 'var(--space-2)' }}>
                <button
                  type="button"
                  onClick={handleClose}
                  className={styles.backBtn}
                  style={{ padding: '8px 24px', fontSize: '13px' }}
                >
                  <ArrowLeft size={15} />
                  <span>Back to Team Showcase</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
