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
  const [isSpeechSupported, setIsSpeechSupported] = useState<boolean>(true);
  const [needsUserGesture, setNeedsUserGesture] = useState<boolean>(false);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>('Standard English Voice');

  const cues = welcomeNarrationData.cues;

  const activeCueIndexRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);
  const isMutedRef = useRef<boolean>(false);
  const isCanceledRef = useRef<boolean>(false);
  const timerRef = useRef<number | null>(null);
  const gapTimerRef = useRef<number | null>(null);
  const hasStartedRef = useRef<boolean>(false);
  const selectedVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

  // Sync ref values
  isMutedRef.current = isMuted;
  isPlayingRef.current = isPlaying;

  // Clear all pending timers
  const clearAllTimers = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (gapTimerRef.current !== null) {
      window.clearTimeout(gapTimerRef.current);
      gapTimerRef.current = null;
    }
  }, []);

  // Cancel and stop all audio & progression
  const stopAll = useCallback(() => {
    isCanceledRef.current = true;
    clearAllTimers();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    isPlayingRef.current = false;
  }, [clearAllTimers]);

  // Voice selection: prioritize en-IN -> en-GB -> en-US
  const findBestVoice = useCallback((): SpeechSynthesisVoice | null => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    // 1. Prioritize Indian English (en-IN)
    const indianVoice = voices.find(
      (v) =>
        v.lang === 'en-IN' ||
        v.lang === 'en_IN' ||
        v.lang.toLowerCase().startsWith('en-in') ||
        v.name.toLowerCase().includes('india') ||
        v.name.toLowerCase().includes('heera') ||
        v.name.toLowerCase().includes('neerja') ||
        v.name.toLowerCase().includes('ravi')
    );
    if (indianVoice) return indianVoice;

    // 2. Prioritize British English (en-GB)
    const britishVoice = voices.find(
      (v) =>
        v.lang === 'en-GB' ||
        v.lang === 'en_GB' ||
        v.lang.toLowerCase().startsWith('en-gb') ||
        v.name.toLowerCase().includes('george') ||
        v.name.toLowerCase().includes('hazel') ||
        v.name.toLowerCase().includes('susan')
    );
    if (britishVoice) return britishVoice;

    // 3. Natural / Online US English (en-US)
    const naturalUsVoice = voices.find(
      (v) =>
        (v.lang.startsWith('en') || v.lang === 'en-US') &&
        (v.name.includes('Natural') || v.name.includes('Online') || v.name.includes('Neural'))
    );
    if (naturalUsVoice) return naturalUsVoice;

    // 4. Any English Voice
    const anyEnglish = voices.find((v) => v.lang.startsWith('en'));
    if (anyEnglish) return anyEnglish;

    // 5. Default device voice
    return voices[0] || null;
  }, []);

  // Update selected voice reference
  const refreshVoices = useCallback(() => {
    const voice = findBestVoice();
    if (voice) {
      selectedVoiceRef.current = voice;
      setSelectedVoiceName(`${voice.name} (${voice.lang})`);
    }
  }, [findBestVoice]);

  // Speak and advance cue-by-cue
  const playCue = useCallback(
    (index: number) => {
      clearAllTimers();
      isCanceledRef.current = false;

      // When all cues are finished
      if (index >= cues.length) {
        setIsPlaying(false);
        isPlayingRef.current = false;
        // Pause briefly on final cue, then notify completion
        timerRef.current = window.setTimeout(() => {
          if (!isCanceledRef.current && onComplete) {
            onComplete();
          }
        }, 1400);
        return;
      }

      activeCueIndexRef.current = index;
      setActiveCueIndex(index);

      const cue = cues[index];
      const text = cue.textToSpeak || cue.subtitle || cue.textHindiEnglish;

      const supportsSpeech = typeof window !== 'undefined' && 'speechSynthesis' in window;

      // Handle speech playback if supported and not muted
      if (supportsSpeech && !isMutedRef.current) {
        // Ensure previous speech is canceled cleanly
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        const voice = selectedVoiceRef.current || findBestVoice();
        if (voice) {
          utterance.voice = voice;
        }

        // Set natural speech rate and clear pitch
        utterance.rate = 0.92;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        let hasAdvanced = false;
        const advanceToNext = () => {
          if (hasAdvanced || isCanceledRef.current) return;
          hasAdvanced = true;
          // Natural slight pause between sentences
          gapTimerRef.current = window.setTimeout(() => {
            if (!isCanceledRef.current && isPlayingRef.current) {
              playCue(index + 1);
            }
          }, 320);
        };

        // When current sentence finishes speaking, advance to next cue
        utterance.onend = () => {
          advanceToNext();
        };

        utterance.onerror = (e) => {
          if (e.error === 'not-allowed') {
            setNeedsUserGesture(true);
            setIsPlaying(false);
            isPlayingRef.current = false;
          } else if (e.error !== 'canceled') {
            // If synthesis errors unexpectedly, advance via fallback timing
            advanceToNext();
          }
        };

        // Safety fallback timer in case speech utterance hangs
        const estimatedDurationMs = Math.max(text.split(' ').length * 550, 3200);
        timerRef.current = window.setTimeout(() => {
          if (!hasAdvanced && !isCanceledRef.current && isPlayingRef.current) {
            advanceToNext();
          }
        }, estimatedDurationMs + 2000);

        // Small timeout before speak to prevent Chrome utterance drops
        setTimeout(() => {
          if (!isCanceledRef.current && !isMutedRef.current) {
            window.speechSynthesis.speak(utterance);
          }
        }, 40);
      } else {
        // Subtitles-only fallback (muted or speech unsupported)
        const wordCount = text.split(' ').length;
        const displayDuration = Math.max(wordCount * 420, 2600);

        timerRef.current = window.setTimeout(() => {
          if (!isCanceledRef.current && isPlayingRef.current) {
            playCue(index + 1);
          }
        }, displayDuration);
      }
    },
    [clearAllTimers, cues, findBestVoice, onComplete]
  );

  // Start experience from beginning
  const startExperience = useCallback(() => {
    stopAll();
    hasStartedRef.current = true;
    setNeedsUserGesture(false);
    setIsPlaying(true);
    isPlayingRef.current = true;
    refreshVoices();
    playCue(0);
  }, [playCue, refreshVoices, stopAll]);

  // Replay from beginning
  const replay = useCallback(() => {
    startExperience();
  }, [startExperience]);

  // Mute / Unmute handler
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const willBeMuted = !prev;
      isMutedRef.current = willBeMuted;

      if (willBeMuted) {
        // Mute stops current audible speech without advancing or resetting
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
      } else {
        // Unmuting speaks current cue without restarting from sentence 1
        if (isPlayingRef.current) {
          playCue(activeCueIndexRef.current);
        }
      }
      return willBeMuted;
    });
  }, [playCue]);

  // Captions Toggle
  const toggleCaptions = useCallback(() => {
    setCaptionsEnabled((prev) => !prev);
  }, []);

  // Initialize and listen to voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSpeechSupported(false);
      return;
    }

    refreshVoices();

    const handleVoicesChanged = () => {
      refreshVoices();
    };

    window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
    };
  }, [refreshVoices]);

  // Autoplay trigger on mount
  useEffect(() => {
    if (autoPlay && !hasStartedRef.current) {
      const timer = setTimeout(() => {
        startExperience();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, startExperience]);

  // Unmount cleanup
  useEffect(() => {
    return () => {
      stopAll();
    };
  }, [stopAll]);

  return {
    isPlaying,
    isMuted,
    captionsEnabled,
    activeCue: cues[activeCueIndex] || cues[0],
    activeCueIndex,
    totalCues: cues.length,
    isSpeechSupported,
    needsUserGesture,
    selectedVoiceName,
    startExperience,
    replay,
    toggleMute,
    toggleCaptions,
    stopAll,
  };
}
