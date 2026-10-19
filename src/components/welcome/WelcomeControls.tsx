import React from 'react';
import { Volume2, VolumeX, Subtitles, RotateCcw, ArrowRight } from 'lucide-react';
import styles from './WelcomeScreen.module.css';

interface WelcomeControlsProps {
  isMuted: boolean;
  captionsEnabled: boolean;
  onToggleMute: () => void;
  onToggleCaptions: () => void;
  onReplay: () => void;
  onSkip: () => void;
}

export const WelcomeControls: React.FC<WelcomeControlsProps> = ({
  isMuted,
  captionsEnabled,
  onToggleMute,
  onToggleCaptions,
  onReplay,
  onSkip,
}) => {
  return (
    <div className={styles.controlsGroup} role="toolbar" aria-label="Welcome experience controls">
      {/* Replay Button */}
      <button
        type="button"
        className={styles.controlButton}
        onClick={onReplay}
        title="Replay Welcome Narration"
        aria-label="Replay Welcome Narration"
      >
        <RotateCcw size={14} />
        <span>Replay</span>
      </button>

      {/* Mute/Unmute Button */}
      <button
        type="button"
        className={`${styles.controlButton} ${isMuted ? styles.controlButtonActive : ''}`}
        onClick={onToggleMute}
        title={isMuted ? 'Unmute Narration' : 'Mute Narration'}
        aria-label={isMuted ? 'Unmute Narration' : 'Mute Narration'}
        aria-pressed={!isMuted}
      >
        {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        <span>{isMuted ? 'Muted' : 'Sound'}</span>
      </button>

      {/* Subtitles Toggle */}
      <button
        type="button"
        className={`${styles.controlButton} ${captionsEnabled ? styles.controlButtonActive : ''}`}
        onClick={onToggleCaptions}
        title={captionsEnabled ? 'Turn Off Captions' : 'Turn On Captions'}
        aria-label={captionsEnabled ? 'Turn Off Captions' : 'Turn On Captions'}
        aria-pressed={captionsEnabled}
      >
        <Subtitles size={14} />
        <span>{captionsEnabled ? 'CC On' : 'CC Off'}</span>
      </button>

      {/* Skip Intro Button */}
      <button
        type="button"
        className={styles.skipButton}
        onClick={onSkip}
        title="Skip Welcome Intro and Enter Website"
        aria-label="Skip Welcome Intro and Enter Website"
      >
        <span>Skip Intro</span>
        <ArrowRight size={14} />
      </button>
    </div>
  );
};
