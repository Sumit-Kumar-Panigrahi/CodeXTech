/**
 * CODEXTECH TEAM MEMBERS DATA
 * 
 * ============================================================================
 * VERIFIED TEAM ROSTER:
 * 1. Sumit Kumar Panigrahi — Team Leader (Male voice, sumit-leader.jpg)
 * 2. Siriparapu Ritesh Kumar — Core Team Member (Male voice, ritesh.jpg)
 * 3. Priyanshu Behura — Core Team Member (Male voice, priyanshu.jpg)
 * 4. Pranab Kumar Jena — Core Team Member (Male voice, pranab.jpg)
 * 5. Supriya Panda — Core Team Member (Female voice, supriya.jpg)
 * 6. Adity Kumari — Core Team Member (Female voice, adity.jpg)
 * 
 * PRONUNCIATION RULE:
 * Brand name is spoken as "Code... X... Tech" with distinct natural pauses
 * so the browser never slurs it as "Codextech".
 * ============================================================================
 */

import type { TeamMember } from '../types';

export const teamMembers: TeamMember[] = [
  {
    id: 'sumit-kumar-panigrahi',
    name: 'Sumit Kumar Panigrahi',
    role: 'Team Leader',
    isLeader: true,
    gender: 'male',
    photoUrl: '/assets/team/sumit-leader.jpg',
    introScript:
      "Hey, I'm Sumit, team leader of CodeXTech. I believe in turning creative ideas into meaningful digital experiences. Welcome to my profile!",
    introSentences: [
      "Hey, I'm Sumit, team leader of CodeXTech.",
      "I believe in turning creative ideas into meaningful digital experiences.",
      "Welcome to my profile!",
    ],
    spokenSentences: [
      "Hey, I'm Sumit, team leader of Code... X... Tech.",
      "I believe in turning creative ideas into meaningful digital experiences.",
      "Welcome to my profile!",
    ],
    bio: '[Bio and technical vision to be supplied by Sumit]',
    skills: ['[Technical specialization to be supplied]'],
    contributions: ['[Key projects & leadership contributions to be supplied]'],
    socialLinks: {
      linkedin: '',
      github: '',
      email: '',
    },
  },
  {
    id: 'siriparapu-ritesh-kumar',
    name: 'Siriparapu Ritesh Kumar',
    role: 'Core Team Member',
    gender: 'male',
    photoUrl: '/assets/team/ritesh.jpg',
    introScript:
      "Hey, I'm Ritesh from CodeXTech. I believe great ideas grow through teamwork, curiosity, and continuous learning. Welcome to my profile!",
    introSentences: [
      "Hey, I'm Ritesh from CodeXTech.",
      "I believe great ideas grow through teamwork, curiosity, and continuous learning.",
      "Welcome to my profile!",
    ],
    spokenSentences: [
      "Hey, I'm Ritesh from Code... X... Tech.",
      "I believe great ideas grow through teamwork, curiosity, and continuous learning.",
      "Welcome to my profile!",
    ],
    bio: '[Bio and engineering background to be supplied]',
    skills: ['[Technical skills to be supplied]'],
    contributions: ['[Project contributions to be supplied]'],
    socialLinks: {
      linkedin: '',
      github: '',
      email: '',
    },
  },
  {
    id: 'priyanshu-behura',
    name: 'Priyanshu Behura',
    role: 'Core Team Member',
    gender: 'male',
    photoUrl: '/assets/team/priyanshu.jpg',
    introScript:
      "Hey, I'm Priyanshu from CodeXTech. I believe creativity and technology can turn imagination into reality. Let's get started!",
    introSentences: [
      "Hey, I'm Priyanshu from CodeXTech.",
      "I believe creativity and technology can turn imagination into reality.",
      "Let's get started!",
    ],
    spokenSentences: [
      "Hey, I'm Priyanshu from Code... X... Tech.",
      "I believe creativity and technology can turn imagination into reality.",
      "Let's get started!",
    ],
    bio: '[Bio and engineering background to be supplied]',
    skills: ['[Technical skills to be supplied]'],
    contributions: ['[Project contributions to be supplied]'],
    socialLinks: {
      linkedin: '',
      github: '',
      email: '',
    },
  },
  {
    id: 'pranab-kumar-jena',
    name: 'Pranab Kumar Jena',
    role: 'Core Team Member',
    gender: 'male',
    photoUrl: '/assets/team/pranab.jpg',
    introScript:
      "Hello, I'm Pranab from CodeXTech. I believe every challenge is an opportunity to learn and discover new possibilities. Welcome!",
    introSentences: [
      "Hello, I'm Pranab from CodeXTech.",
      "I believe every challenge is an opportunity to learn and discover new possibilities.",
      "Welcome!",
    ],
    spokenSentences: [
      "Hello, I'm Pranab from Code... X... Tech.",
      "I believe every challenge is an opportunity to learn and discover new possibilities.",
      "Welcome!",
    ],
    bio: '[Bio and engineering background to be supplied]',
    skills: ['[Technical skills to be supplied]'],
    contributions: ['[Project contributions to be supplied]'],
    socialLinks: {
      linkedin: '',
      github: '',
      email: '',
    },
  },
  {
    id: 'supriya-panda',
    name: 'Supriya Panda',
    role: 'Core Team Member',
    gender: 'female',
    photoUrl: '/assets/team/supriya.jpg',
    introScript:
      "Hey, I'm Supriya from CodeXTech. I believe fresh ideas and collaboration can create something meaningful. Glad you're here!",
    introSentences: [
      "Hey, I'm Supriya from CodeXTech.",
      "I believe fresh ideas and collaboration can create something meaningful.",
      "Glad you're here!",
    ],
    spokenSentences: [
      "Hey, I'm Supriya from Code... X... Tech.",
      "I believe fresh ideas and collaboration can create something meaningful.",
      "Glad you're here!",
    ],
    bio: '[Bio and engineering background to be supplied]',
    skills: ['[Technical skills to be supplied]'],
    contributions: ['[Project contributions to be supplied]'],
    socialLinks: {
      linkedin: '',
      github: '',
      email: '',
    },
  },
  {
    id: 'adity-kumari',
    name: 'Adity Kumari',
    role: 'Core Team Member',
    gender: 'female',
    photoUrl: '/assets/team/adity.jpg',
    introScript:
      "Hi, I'm Adity from CodeXTech. I believe in staying curious, learning together, and exploring new possibilities. Welcome!",
    introSentences: [
      "Hi, I'm Adity from CodeXTech.",
      "I believe in staying curious, learning together, and exploring new possibilities.",
      "Welcome!",
    ],
    spokenSentences: [
      "Hi, I'm Aditi from Code... X... Tech.",
      "I believe in staying curious, learning together, and exploring new possibilities.",
      "Welcome!",
    ],
    bio: '[Bio and engineering background to be supplied]',
    skills: ['[Technical skills to be supplied]'],
    contributions: ['[Project contributions to be supplied]'],
    socialLinks: {
      linkedin: '',
      github: '',
      email: '',
    },
  },
];
