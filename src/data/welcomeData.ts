/**
 * CODEXTECH CINEMATIC WELCOME NARRATION DATA
 * 
 * ============================================================================
 * APPROVED NATURAL ENGLISH NARRATION SCRIPT:
 * "Hey everyone, A very warm welcome to you!
 *  I'm Sumit, and on behalf of my entire team, I'm delighted to welcome you.
 *  We believe every great idea begins with a simple thought. When creativity, technology, and teamwork come together, that thought can become reality.
 *  Today, we'd like to introduce our team, showcase our projects.
 *  So, let's explore what we've built.
 *  Welcome to CODE  X  TECH!"
 * ============================================================================
 */

import type { WelcomeNarrationCue } from '../types';

export interface WelcomeCueWithText extends WelcomeNarrationCue {
  textToSpeak: string;
}

export const welcomeNarrationData = {
  audioUrl: '/assets/audio/welcome-intro.mp3',
  leaderIntro: {
    speakerName: 'Sumit Kumar Panigrahi',
    speakerTitle: 'Team Leader, CODEXTECH',
    photoUrl: '/assets/team/sumit-leader.jpg',
  },
  
  fullApprovedScript:
    "Hey everyone, A very warm welcome to you! I'm Sumit, and on behalf of my entire team, I'm delighted to welcome you. We believe every great idea begins with a simple thought. When creativity, technology, and teamwork come together, that thought can become reality. Today, we'd like to introduce our team, showcase our projects. So, let's explore what we've built. Welcome to CodeXTech!",

  cues: [
    {
      id: 1,
      startSecond: 0,
      endSecond: 3.5,
      speaker: 'Sumit Kumar Panigrahi',
      textToSpeak: 'Hey everyone, A very warm welcome to you!',
      textHindiEnglish: 'Hey everyone, A very warm welcome to you!',
      subtitle: 'Hey everyone, A very warm welcome to you!',
    },
    {
      id: 2,
      startSecond: 3.5,
      endSecond: 8.5,
      speaker: 'Sumit Kumar Panigrahi',
      textToSpeak: "I'm Sumit, and on behalf of my entire team, I'm delighted to welcome you.",
      textHindiEnglish: "I'm Sumit, and on behalf of my entire team, I'm delighted to welcome you.",
      subtitle: "I'm Sumit, and on behalf of my entire team, I'm delighted to welcome you.",
    },
    {
      id: 3,
      startSecond: 8.5,
      endSecond: 17.5,
      speaker: 'Sumit Kumar Panigrahi',
      textToSpeak:
        'We believe every great idea begins with a simple thought. When creativity, technology, and teamwork come together, that thought can become reality.',
      textHindiEnglish:
        'We believe every great idea begins with a simple thought. When creativity, technology, and teamwork come together, that thought can become reality.',
      subtitle:
        'We believe every great idea begins with a simple thought. When creativity, technology, and teamwork come together, that thought can become reality.',
    },
    {
      id: 4,
      startSecond: 17.5,
      endSecond: 22.0,
      speaker: 'Sumit Kumar Panigrahi',
      textToSpeak: "Today, we'd like to introduce our team, showcase our projects.",
      textHindiEnglish: "Today, we'd like to introduce our team, showcase our projects.",
      subtitle: "Today, we'd like to introduce our team, showcase our projects.",
    },
    {
      id: 5,
      startSecond: 22.0,
      endSecond: 25.5,
      speaker: 'Sumit Kumar Panigrahi',
      textToSpeak: "So, let's explore what we've built.",
      textHindiEnglish: "So, let's explore what we've built.",
      subtitle: "So, let's explore what we've built.",
    },
    {
      id: 6,
      startSecond: 25.5,
      endSecond: 30.0,
      speaker: 'Sumit Kumar Panigrahi',
      textToSpeak: 'Welcome to Code... X... Tech!',
      textHindiEnglish: 'Welcome to CodeXTech!',
      subtitle: 'Welcome to CodeXTech!',
    },
  ] as (WelcomeNarrationCue & { textToSpeak: string })[],
};
