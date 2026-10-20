import { useState, useEffect, useRef, useCallback } from 'react';

interface UseMemberSpeechOptions {
  memberId: string;
  gender: 'male' | 'female';
  audioUrl?: string;
  subtitles: string[];
  spokenTexts?: string[];
  onNarrationComplete: () => void;
  autoPlay?: boolean;
}

// Fixed audio mapping for each team member
const MEMBER_AUDIO_MAP: Record<string, string> = {
  'sumit-kumar-panigrahi': '/assets/audio/team/sumit.mp3',
  'siriparapu-ritesh-kumar': '/assets/audio/team/ritesh.mp3',
  'priyanshu-behura': '/assets/audio/team/priyanshu.mp3',
  'pranab-kumar-jena': '/assets/audio/team/pranab.mp3',
  'supriya-panda': '/assets/audio/team/supriya.mp3',
  'adity-kumari': '/assets/audio/team/adity.mp3',
};

// Sentence split boundary timestamps (in seconds) for each member's narration
const MEMBER_SENTENCE_TIMINGS: Record<string, number[]> = {
  'sumit-kumar-panigrahi': [0, 5.2, 9.2],
  'siriparapu-ritesh-kumar': [0, 5.2],
  'priyanshu-behura': [0, 6.2],
  'pranab-kumar-jena': [0, 6.2],
  'supriya-panda': [0, 5.8],
  'adity-kumari': [0, 6.0],
};

export function useMemberSpeech({
  memberId,
  gender,
  audioUrl,
  subtitles,
  spokenTexts: _spokenTexts,
  onNarrationComplete,
  autoPlay = true,
}: UseMemberSpeechOptions) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [captionsEnabled, setCaptionsEnabled] = useState<boolean>(true);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number>(0);
  const [needsUserGesture, setNeedsUserGesture] = useState<boolean>(false);
  const [selectedVoiceInfo, setSelectedVoiceInfo] = useState<string>('');

  const onCompleteRef = useRef(onNarrationComplete);
  onCompleteRef.current = onNarrationComplete;

  const subtitlesRef = useRef(subtitles);
  subtitlesRef.current = subtitles;

  const activeIndexRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);
  const isMutedRef = useRef<boolean>(false);
  const isCanceledRef = useRef<boolean>(false);
  const fallbackTimerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  isMutedRef.current = isMuted;
  isPlayingRef.current = isPlaying;

  const resolvedAudioSrc = audioUrl || MEMBER_AUDIO_MAP[memberId] || `/assets/audio/team/${memberId}.mp3`;

  const clearFallbackTimer = useCallback(() => {
    if (fallbackTimerRef.current !== null) {
      window.clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  }, []);

  // Full stop & cancel playback immediately without triggering false onerror
  const stopAll = useCallback(() => {
    isCanceledRef.current = true;
    clearFallbackTimer();
    if (audioRef.current) {
      audioRef.current.ontimeupdate = null;
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    isPlayingRef.current = false;
  }, [clearFallbackTimer]);

  // Update active subtitle sentence based on audio time
  const handleTimeUpdate = useCallback(() => {
    if (!audioRef.current || isCanceledRef.current) return;
    const currentT = audioRef.current.currentTime;
    const timings = MEMBER_SENTENCE_TIMINGS[memberId];

    let sentenceIdx = 0;
    if (timings && timings.length > 0) {
      for (let i = timings.length - 1; i >= 0; i--) {
        if (currentT >= timings[i]) {
          sentenceIdx = i;
          break;
        }
      }
    } else {
      const dur = audioRef.current.duration || 8;
      const count = subtitlesRef.current.length;
      sentenceIdx = Math.min(Math.floor((currentT / dur) * count), count - 1);
    }

    if (sentenceIdx !== activeIndexRef.current) {
      activeIndexRef.current = sentenceIdx;
      setActiveSentenceIndex(sentenceIdx);
    }
  }, [memberId]);

  // Start fixed audio playback
  const startSequence = useCallback(() => {
    isCanceledRef.current = false;
    clearFallbackTimer();
    setNeedsUserGesture(false);

    if (!audioRef.current) {
      const audio = new Audio(resolvedAudioSrc);
      audio.preload = 'auto';
      audioRef.current = audio;
    }

    const audio = audioRef.current;
    audio.src = resolvedAudioSrc;
    audio.muted = isMutedRef.current;
    audio.currentTime = 0;
    activeIndexRef.current = 0;
    setActiveSentenceIndex(0);

    setSelectedVoiceInfo(
      gender === 'female' ? 'Fixed Studio Audio (Female)' : 'Fixed Studio Audio (Male)'
    );

    audio.ontimeupdate = handleTimeUpdate;

    audio.onended = () => {
      if (isCanceledRef.current) return;
      setIsPlaying(false);
      isPlayingRef.current = false;
      window.setTimeout(() => {
        if (!isCanceledRef.current) {
          onCompleteRef.current();
        }
      }, 500);
    };

    const advanceFallback = () => {
      if (isCanceledRef.current) return;
      const count = subtitlesRef.current.length;
      let cur = activeIndexRef.current;
      if (cur < count - 1) {
        cur += 1;
        activeIndexRef.current = cur;
        setActiveSentenceIndex(cur);
        fallbackTimerRef.current = window.setTimeout(advanceFallback, 3500);
      } else {
        setIsPlaying(false);
        isPlayingRef.current = false;
        window.setTimeout(() => {
          if (!isCanceledRef.current) onCompleteRef.current();
        }, 600);
      }
    };

    audio.onerror = () => {
      if (isCanceledRef.current || !audio.src) return;
      fallbackTimerRef.current = window.setTimeout(advanceFallback, 3500);
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
            setNeedsUserGesture(true);
            setIsPlaying(false);
            isPlayingRef.current = false;
            fallbackTimerRef.current = window.setTimeout(advanceFallback, 3500);
          }
        });
    }
  }, [clearFallbackTimer, gender, handleTimeUpdate, memberId, resolvedAudioSrc]);

  // Replay complete introduction from 0.0s
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
      if (audioRef.current) {
        audioRef.current.muted = willBeMuted;
      }
      return willBeMuted;
    });
  }, []);

  const toggleCaptions = useCallback(() => {
    setCaptionsEnabled((prev) => !prev);
  }, []);

  // Preload and autoplay lifecycle
  useEffect(() => {
    const audio = new Audio(resolvedAudioSrc);
    audio.preload = 'auto';
    audioRef.current = audio;

    let initTimer: number | null = null;
    if (autoPlay) {
      initTimer = window.setTimeout(() => {
        startSequence();
      }, 150);
    }

    return () => {
      if (initTimer !== null) clearTimeout(initTimer);
      if (audioRef.current) {
        audioRef.current.ontimeupdate = null;
        audioRef.current.onended = null;
        audioRef.current.onerror = null;
        audioRef.current.pause();
        audioRef.current = null;
      }
      clearFallbackTimer();
    };
  }, [resolvedAudioSrc, memberId, autoPlay, clearFallbackTimer, startSequence]);

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
