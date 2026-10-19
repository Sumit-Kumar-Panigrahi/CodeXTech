import { useState, useEffect, useRef, useCallback } from 'react';

interface UseMemberSpeechOptions {
  memberId: string;
  gender: 'male' | 'female';
  subtitles: string[];
  spokenTexts: string[];
  onNarrationComplete: () => void;
  autoPlay?: boolean;
}

export function useMemberSpeech({
  memberId,
  gender,
  subtitles,
  spokenTexts,
  onNarrationComplete,
  autoPlay = true,
}: UseMemberSpeechOptions) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [captionsEnabled, setCaptionsEnabled] = useState<boolean>(true);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number>(0);
  const [needsUserGesture, setNeedsUserGesture] = useState<boolean>(false);
  const [selectedVoiceInfo, setSelectedVoiceInfo] = useState<string>('');

  // Persist callbacks and lists in refs to prevent unnecessary re-render invalidation
  const onCompleteRef = useRef(onNarrationComplete);
  onCompleteRef.current = onNarrationComplete;

  const subtitlesRef = useRef(subtitles);
  subtitlesRef.current = subtitles;

  const spokenTextsRef = useRef(spokenTexts);
  spokenTextsRef.current = spokenTexts;

  const activeIndexRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);
  const isMutedRef = useRef<boolean>(false);
  const isCanceledRef = useRef<boolean>(false);
  const timerRef = useRef<number | null>(null);

  isMutedRef.current = isMuted;
  isPlayingRef.current = isPlaying;

  const clearTimer = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // Full stop & cancel
  const stopAll = useCallback(() => {
    isCanceledRef.current = true;
    clearTimer();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    isPlayingRef.current = false;
  }, []);

  // Gender-aware voice resolver
  const getGenderVoice = useCallback((targetGender: 'male' | 'female'): SpeechSynthesisVoice | null => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    const femaleKeywords = ['heera', 'neerja', 'hazel', 'susan', 'zira', 'jenny', 'aria', 'sonia', 'female', 'woman'];
    const maleKeywords = ['ravi', 'george', 'david', 'mark', 'guy', 'male', 'man'];

    const targetKeywords = targetGender === 'female' ? femaleKeywords : maleKeywords;

    // 1. Indian English (en-IN) matching target gender
    const indianMatch = voices.find(
      (v) =>
        (v.lang === 'en-IN' || v.lang.toLowerCase().startsWith('en-in') || v.name.toLowerCase().includes('india')) &&
        targetKeywords.some((kw) => v.name.toLowerCase().includes(kw))
    );
    if (indianMatch) return indianMatch;

    // 2. British English (en-GB) matching target gender
    const britishMatch = voices.find(
      (v) =>
        (v.lang === 'en-GB' || v.lang.toLowerCase().startsWith('en-gb')) &&
        targetKeywords.some((kw) => v.name.toLowerCase().includes(kw))
    );
    if (britishMatch) return britishMatch;

    // 3. US English matching target gender (e.g. David for male, Zira for female)
    const usMatch = voices.find(
      (v) =>
        (v.lang.startsWith('en') || v.lang === 'en-US') &&
        targetKeywords.some((kw) => v.name.toLowerCase().includes(kw))
    );
    if (usMatch) return usMatch;

    // 4. Any English voice matching target gender
    const anyGenderMatch = voices.find(
      (v) => v.lang.startsWith('en') && targetKeywords.some((kw) => v.name.toLowerCase().includes(kw))
    );
    if (anyGenderMatch) return anyGenderMatch;

    // 5. Fallback to any high-quality English voice if gender voice is unavailable
    const anyEnglish = voices.find((v) => v.lang.startsWith('en'));
    if (anyEnglish) return anyEnglish;

    return voices[0] || null;
  }, []);

  // Speak sentence-by-sentence sequentially
  const speakSentence = useCallback(
    (index: number) => {
      clearTimer();
      const currentSubtitles = subtitlesRef.current;
      const currentSpoken = spokenTextsRef.current;

      // When all sentences finish
      if (index >= currentSubtitles.length) {
        setIsPlaying(false);
        isPlayingRef.current = false;
        timerRef.current = setTimeout(() => {
          if (!isCanceledRef.current) {
            onCompleteRef.current();
          }
        }, 600);
        return;
      }

      activeIndexRef.current = index;
      setActiveSentenceIndex(index);

      const textToSpeak = currentSpoken[index] || currentSubtitles[index];
      const hasSpeech = typeof window !== 'undefined' && 'speechSynthesis' in window;

      if (hasSpeech && !isMutedRef.current) {
        // Clean up previous utterances
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        const voice = getGenderVoice(gender);
        if (voice) {
          utterance.voice = voice;
          setSelectedVoiceInfo(`${voice.name} (${gender.toUpperCase()})`);
        }

        // Natural, measured speaking cadence
        utterance.rate = 0.90;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        let sentenceEnded = false;
        const advanceToNext = () => {
          if (sentenceEnded || isCanceledRef.current) return;
          sentenceEnded = true;
          // Natural breathing pause between sentences
          timerRef.current = setTimeout(() => {
            if (!isCanceledRef.current && isPlayingRef.current) {
              speakSentence(index + 1);
            }
          }, 320);
        };

        utterance.onend = () => {
          advanceToNext();
        };

        utterance.onerror = (e) => {
          if (e.error === 'not-allowed') {
            setNeedsUserGesture(true);
            setIsPlaying(false);
            isPlayingRef.current = false;
          } else if (e.error !== 'canceled') {
            advanceToNext();
          }
        };

        // Safety fallback timer if utterance stalls
        const maxDurationMs = Math.max(textToSpeak.split(' ').length * 650, 3600);
        timerRef.current = setTimeout(() => {
          if (!sentenceEnded && !isCanceledRef.current && isPlayingRef.current) {
            advanceToNext();
          }
        }, maxDurationMs + 2000);

        // Resume engine in case Chrome suspended it
        window.speechSynthesis.resume();

        // Speak utterance
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
        isPlayingRef.current = true;
      } else {
        // Subtitle timing fallback if muted or speech unsupported
        const words = textToSpeak.split(' ').length;
        const duration = Math.max(words * 400, 2600);

        timerRef.current = setTimeout(() => {
          if (!isCanceledRef.current && isPlayingRef.current) {
            speakSentence(index + 1);
          }
        }, duration);
      }
    },
    [gender, getGenderVoice]
  );

  // Start sequence from sentence 0
  const startSequence = useCallback(() => {
    isCanceledRef.current = false;
    setNeedsUserGesture(false);
    setIsPlaying(true);
    isPlayingRef.current = true;
    speakSentence(0);
  }, [speakSentence]);

  // Replay complete introduction from beginning
  const replay = useCallback(() => {
    stopAll();
    setTimeout(() => {
      startSequence();
    }, 60);
  }, [startSequence, stopAll]);

  // Toggle Mute / Unmute
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const willBeMuted = !prev;
      isMutedRef.current = willBeMuted;

      if (willBeMuted) {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
      } else {
        if (isPlayingRef.current) {
          speakSentence(activeIndexRef.current);
        }
      }
      return willBeMuted;
    });
  }, [speakSentence]);

  const toggleCaptions = useCallback(() => {
    setCaptionsEnabled((prev) => !prev);
  }, []);

  // Listen for voices changed if Chrome loads them asynchronously
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const handleVoicesChanged = () => {
      window.speechSynthesis.getVoices();
    };
    window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
    };
  }, []);

  // ONLY trigger on mount or when memberId changes
  useEffect(() => {
    if (autoPlay) {
      const initTimer = setTimeout(() => {
        startSequence();
      }, 120);
      return () => {
        clearTimeout(initTimer);
        stopAll();
      };
    }
    return () => {
      stopAll();
    };
  }, [memberId]); // Strictly depends only on memberId!

  return {
    isPlaying,
    isMuted,
    captionsEnabled,
    activeSentence: subtitles[activeSentenceIndex] || subtitles[0],
    activeSentenceIndex,
    totalSentences: subtitles.length,
    needsUserGesture,
    selectedVoiceInfo,
    startSequence,
    replay,
    toggleMute,
    toggleCaptions,
    stopAll,
  };
}
