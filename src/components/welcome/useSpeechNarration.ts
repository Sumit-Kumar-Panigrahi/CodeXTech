import { useState, useEffect, useRef, useCallback } from 'react';
import { welcomeNarrationData } from '../../data/welcomeData';

interface UseSpeechNarrationOptions {
  onComplete?: () => void;
  autoPlay?: boolean;
}

export function useSpeechNarration({ onComplete, autoPlay = true }: UseSpeechNarrationOptions = {}) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [captionsEnabled, setCaptionsEnabled] = useState<boolean>(true);
  const [activeCueIndex, setActiveCueIndex] = useState<number>(0);
  const [needsUserGesture, setNeedsUserGesture] = useState<boolean>(false);
  const [isAudioLoaded, setIsAudioLoaded] = useState<boolean>(false);

  const cues = welcomeNarrationData.cues;
  const audioSrc = welcomeNarrationData.audioUrl;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef<boolean>(false);
  const isMutedRef = useRef<boolean>(false);
  const isCanceledRef = useRef<boolean>(false);
  const fallbackTimerRef = useRef<number | null>(null);
  const activeCueIndexRef = useRef<number>(0);

  isMutedRef.current = isMuted;
  isPlayingRef.current = isPlaying;

  const clearFallbackTimer = () => {
    if (fallbackTimerRef.current !== null) {
      window.clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  };

  // Stop all audio playback cleanly
  const stopAll = useCallback(() => {
    isCanceledRef.current = true;
    clearFallbackTimer();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    isPlayingRef.current = false;
  }, []);

  // Sync subtitle cues according to current audio time
  const handleTimeUpdate = useCallback(() => {
    if (!audioRef.current || isCanceledRef.current) return;
    const currentTime = audioRef.current.currentTime;

    const matchedIndex = cues.findIndex(
      (c) => currentTime >= c.startSecond && currentTime < c.endSecond
    );

    if (matchedIndex !== -1 && matchedIndex !== activeCueIndexRef.current) {
      activeCueIndexRef.current = matchedIndex;
      setActiveCueIndex(matchedIndex);
    }
  }, [cues]);

  // Timed fallback progression if audio is muted or blocked by browser autoplay policy
  const startFallbackProgression = useCallback(
    (fromIndex = 0) => {
      clearFallbackTimer();
      let cur = fromIndex;
      activeCueIndexRef.current = cur;
      setActiveCueIndex(cur);

      const step = () => {
        if (isCanceledRef.current) return;
        if (cur < cues.length - 1) {
          cur += 1;
          activeCueIndexRef.current = cur;
          setActiveCueIndex(cur);
          const duration = (cues[cur].endSecond - cues[cur].startSecond) * 1000;
          fallbackTimerRef.current = window.setTimeout(step, Math.max(duration, 3000));
        } else {
          setIsPlaying(false);
          isPlayingRef.current = false;
          if (onComplete) {
            window.setTimeout(onComplete, 1200);
          }
        }
      };

      const initialDuration = (cues[cur].endSecond - cues[cur].startSecond) * 1000;
      fallbackTimerRef.current = window.setTimeout(step, Math.max(initialDuration, 3500));
    },
    [cues, onComplete]
  );

  // Start fixed audio playback
  const startExperience = useCallback(
    (resumeFromCue?: number) => {
      isCanceledRef.current = false;
      clearFallbackTimer();
      setNeedsUserGesture(false);

      if (!audioRef.current) {
        const audio = new Audio(audioSrc);
        audio.preload = 'auto';
        audioRef.current = audio;
      }

      const audio = audioRef.current;
      audio.muted = isMutedRef.current;

      const targetCue = typeof resumeFromCue === 'number' ? resumeFromCue : 0;
      const startTime = cues[targetCue]?.startSecond || 0;

      try {
        audio.currentTime = startTime;
      } catch {
        // Safe guard if metadata not fully loaded yet
      }

      activeCueIndexRef.current = targetCue;
      setActiveCueIndex(targetCue);

      audio.ontimeupdate = handleTimeUpdate;

      audio.onended = () => {
        if (isCanceledRef.current) return;
        setIsPlaying(false);
        isPlayingRef.current = false;
        if (onComplete) {
          setTimeout(onComplete, 800);
        }
      };

      audio.onerror = () => {
        console.warn('[CODEXTECH Audio] Audio file load warning, using timed cue progression.');
        startFallbackProgression(activeCueIndexRef.current);
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (!isCanceledRef.current) {
              setIsPlaying(true);
              isPlayingRef.current = true;
              clearFallbackTimer();
            }
          })
          .catch((err) => {
            if (err.name === 'NotAllowedError') {
              // Autoplay was restricted by the browser before user interaction
              setNeedsUserGesture(true);
              setIsPlaying(false);
              isPlayingRef.current = false;
              // Keep subtitles advancing smoothly so screen does not get stuck
              startFallbackProgression(activeCueIndexRef.current);
            }
          });
      }
    },
    [audioSrc, cues, handleTimeUpdate, onComplete, startFallbackProgression]
  );

  // Replay complete introduction from 0.0s
  const replay = useCallback(() => {
    stopAll();
    setTimeout(() => {
      startExperience(0);
    }, 60);
  }, [startExperience, stopAll]);

  // Toggle Mute / Unmute
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const willBeMuted = !prev;
      isMutedRef.current = willBeMuted;
      if (audioRef.current) {
        audioRef.current.muted = willBeMuted;
      }
      return willBeMuted;
    });
  }, []);

  const toggleCaptions = useCallback(() => {
    setCaptionsEnabled((prev) => !prev);
  }, []);

  // Preload audio asset on mount
  useEffect(() => {
    const audio = new Audio(audioSrc);
    audio.preload = 'auto';
    audio.oncanplaythrough = () => setIsAudioLoaded(true);
    audioRef.current = audio;

    let initTimer: number | null = null;
    if (autoPlay) {
      // Start experience matching narration scene reveal
      initTimer = window.setTimeout(() => {
        startExperience(0);
      }, 2800);
    }

    return () => {
      if (initTimer !== null) clearTimeout(initTimer);
      stopAll();
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, [audioSrc, autoPlay, startExperience, stopAll]);

  return {
    isPlaying,
    isMuted,
    captionsEnabled,
    activeCue: cues[activeCueIndex] || cues[0],
    activeCueIndex,
    totalCues: cues.length,
    isSpeechSupported: true,
    isAudioLoaded,
    needsUserGesture,
    selectedVoiceName: 'Fixed Studio Audio (Sumit — Male)',
    startExperience: () => startExperience(activeCueIndexRef.current),
    replay,
    toggleMute,
    toggleCaptions,
    stopAll,
  };
}
