import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpeechNarration } from './useSpeechNarration';
import { WelcomeControls } from './WelcomeControls';
import { LeaderScene } from './LeaderScene';
import { LogoReveal } from './LogoReveal';
import { siteConfig } from '../../data/siteConfig';
import styles from './WelcomeScreen.module.css';

interface WelcomeScreenProps {
  onComplete: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'logo' | 'narration'>('logo');

  const {
    isPlaying,
    isMuted,
    captionsEnabled,
    activeCue,
    activeCueIndex,
    totalCues,
    needsUserGesture,
    startExperience,
    replay,
    toggleMute,
    toggleCaptions,
    stopAll,
  } = useSpeechNarration({
    onComplete: () => {
      // Allow user to linger 1.5s on the final welcome cue before completing
      setTimeout(() => {
        onComplete();
      }, 1500);
    },
    autoPlay: true,
  });

  // Logo reveal transition into leader narration
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('narration');
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  // Handle Skip Intro
  const handleSkip = () => {
    stopAll();
    onComplete();
  };

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      } else if (e.key.toLowerCase() === 'm') {
        toggleMute();
      } else if (e.key.toLowerCase() === 'c') {
        toggleCaptions();
      } else if (e.key.toLowerCase() === 'r') {
        replay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleMute, toggleCaptions, replay]);

  const progressPercentage = Math.round(((activeCueIndex + 1) / totalCues) * 100);

  return (
    <div className={styles.welcomeContainer}>
      {/* Ambient Lighting & Texture */}
      <div className={styles.ambientGlowOrange} />
      <div className={styles.ambientGlowCyan} />
      <div className={styles.gridTexture} />

      {/* Top Controls Bar */}
      <header className={styles.topBar}>
        <div className={styles.brandPill}>
          <span className={styles.brandDot} />
          <span>{siteConfig.name} CINEMATIC INTRO</span>
        </div>

        <WelcomeControls
          isMuted={isMuted}
          captionsEnabled={captionsEnabled}
          onToggleMute={toggleMute}
          onToggleCaptions={toggleCaptions}
          onReplay={replay}
          onSkip={handleSkip}
        />
      </header>

      {/* Center Cinematic Stage */}
      <main className={styles.stageWrapper}>
        <AnimatePresence mode="wait">
          {phase === 'logo' ? (
            <motion.div
              key="logo-reveal"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <LogoReveal />
            </motion.div>
          ) : (
            <motion.div
              key="leader-scene"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <LeaderScene
                activeCue={activeCue}
                captionsEnabled={captionsEnabled}
                isPlaying={isPlaying}
                needsUserGesture={needsUserGesture}
                onStartExperience={startExperience}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Progress Bar & Cue Tracker */}
      <footer className={styles.bottomTrack}>
        <div className={styles.cueProgressBar}>
          <div
            className={styles.cueProgressFill}
            style={{ width: `${phase === 'logo' ? 15 : progressPercentage}%` }}
          />
        </div>
        <span className={styles.progressLabel}>
          {phase === 'logo'
            ? 'Initializing experience...'
            : `Narration Sequence ${activeCueIndex + 1} of ${totalCues} • Press Esc to Skip`}
        </span>
      </footer>
    </div>
  );
};
