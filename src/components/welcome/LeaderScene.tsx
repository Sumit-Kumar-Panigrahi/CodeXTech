import React from 'react';
import { Volume2, Sparkles, UserCheck } from 'lucide-react';
import { welcomeNarrationData } from '../../data/welcomeData';
import { siteConfig } from '../../data/siteConfig';
import type { WelcomeNarrationCue } from '../../types';
import styles from './WelcomeScreen.module.css';

interface LeaderSceneProps {
  activeCue: WelcomeNarrationCue;
  captionsEnabled: boolean;
  isPlaying: boolean;
  needsUserGesture: boolean;
  onStartExperience: () => void;
}

export const LeaderScene: React.FC<LeaderSceneProps> = ({
  activeCue,
  captionsEnabled,
  isPlaying,
  needsUserGesture,
  onStartExperience,
}) => {
  const { leaderIntro } = welcomeNarrationData;

  return (
    <div className={styles.leaderScene}>
      {/* Authentic Leader Portrait — Clean, Unobscured Upper Body Presentation */}
      <div className={styles.portraitColumn}>
        <div className={styles.portraitFrame}>
          <img
            src={leaderIntro.photoUrl}
            alt={leaderIntro.speakerName}
            className={styles.portraitImage}
            loading="eager"
          />
          <div className={styles.portraitVignette} />
        </div>

        <div className={styles.portraitBadge}>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <span className={styles.portraitBadgeName}>{leaderIntro.speakerName}</span>
            <span className={styles.portraitBadgeRole}>{leaderIntro.speakerTitle}</span>
          </div>
          <UserCheck size={14} color="var(--color-accent-primary)" style={{ flexShrink: 0 }} />
        </div>
      </div>

      {/* Narrative Dialogue & Subtitles */}
      <div className={styles.dialogueContent}>
        <div className={styles.studioBrandingHeader}>
          <img
            src={siteConfig.logoUrl}
            alt="CODEXTECH Logo"
            className={styles.studioLogoMini}
          />
          <div>
            <h2 className={styles.studioTitle}>{siteConfig.name}</h2>
            <p className={styles.studioTagline}>{siteConfig.tagline}</p>
          </div>
        </div>

        {/* Subtitles Box */}
        {captionsEnabled ? (
          <div className={styles.subtitleBox} aria-live="polite">
            <div className={styles.subtitleSpeakerTag}>
              {isPlaying && <span className={styles.speakingIndicator} />}
              <Sparkles size={12} />
              <span>{activeCue.speaker || leaderIntro.speakerName}</span>
            </div>
            <p className={styles.subtitleText}>{activeCue.subtitle || activeCue.textToSpeak || activeCue.textHindiEnglish}</p>
          </div>
        ) : (
          <div className={styles.subtitleBox} style={{ opacity: 0.5, fontStyle: 'italic' }}>
            <p className={styles.subtitleText}>[Captions are currently turned off]</p>
          </div>
        )}

        {/* Autoplay blocked prompt */}
        {needsUserGesture && (
          <button
            type="button"
            className={styles.userGesturePrompt}
            onClick={onStartExperience}
          >
            <Volume2 size={15} />
            <span>Click here to play spoken narration</span>
          </button>
        )}
      </div>
    </div>
  );
};
