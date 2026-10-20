/**
 * CODEXTECH PROJECTS DATA — STEP 7 SHOWCASE
 * 
 * ============================================================================
 * FEATURED PROJECTS:
 * 1. CyberGuard — India-First AI Defence & Personal Zero-Trust Shield
 *    Screenshot: /assets/projects/cyberguard-dashboard.png
 * 
 * 2. Life RPG — Your Life. Your Quest. Your Level.
 *    Screenshot: /assets/projects/life-rpg-dashboard.png
 * 
 * HOW TO ADD GITHUB REPO OR LIVE DEMO LINKS LATER:
 * - Set `repoUrl` to the full repository URL (e.g., 'https://github.com/codextech/cyberguard')
 * - Set `liveUrl` to the deployed website URL (e.g., 'https://cyberguard.codextech.dev')
 * - When these strings are empty (''), the respective buttons are automatically hidden.
 * ============================================================================
 */

import type { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'cyberguard',
    title: 'CyberGuard',
    tagline: 'India-First AI Defence & Personal Zero-Trust Shield',
    description:
      'An intelligent cybersecurity and threat analysis platform designed to connect attack chains, predict threats, and protect users through personal zero-trust defense and real-time security signals.',
    category: 'Cybersecurity & AI Defence',
    status: 'Live Production Sandbox',
    technologies: [
      'AI Security Assistant',
      'Zero-Trust Architecture',
      'Attack Chain Analysis',
      'Threat Sandbox',
      '1930 Emergency Shield',
    ],
    features: [
      'Personal Zero-Trust Shield analyzing live signals across messaging, web, and device sessions',
      'Integrated 1930 Emergency Shield and continuous threat monitoring center',
      'Multi-layered risk assessment tracking Human Risk Score and Technical Risk Score',
      'Attack chain storyline visualization & interactive mobile threat simulation sandbox',
    ],
    metrics: [
      { label: 'Protection', value: 'Zero-Trust' },
      { label: 'Response', value: '1930 Emergency' },
      { label: 'Analysis', value: 'Attack Chain' },
    ],
    thumbnailUrl: '/assets/projects/cyberguard-dashboard.png',
    liveUrl: '', // Add live website URL here later when available
    repoUrl: '', // Add GitHub repository URL here later when available
    featured: true,
  },
  {
    id: 'life-rpg',
    title: 'Life RPG',
    tagline: 'Your Life. Your Quest. Your Level.',
    description:
      'A gamified productivity and habit-tracking dashboard that transforms everyday routines and personal goals into an epic role-playing quest with XP progression and character leveling.',
    category: 'Gamified Productivity',
    status: 'Live Gamified Platform',
    technologies: [
      'Quest Engine',
      'XP Progression System',
      'Habit Streak Tracker',
      'Character Attributes',
      'Interactive Dashboard',
    ],
    features: [
      'Interactive quest board transforming habits into daily quests with XP rewards',
      'Multi-attribute leveling across Strength, Intellect, Discipline, and Creativity',
      'Day streak monitoring and progressive quest milestone tracking',
      'Gold, gems, and character inventory reward mechanisms',
    ],
    metrics: [
      { label: 'Progression', value: 'XP Engine' },
      { label: 'Tracking', value: 'Day Streak' },
      { label: 'Growth', value: 'Attributes' },
    ],
    thumbnailUrl: '/assets/projects/life-rpg-dashboard.png',
    liveUrl: '', // Add live website URL here later when available
    repoUrl: '', // Add GitHub repository URL here later when available
    featured: true,
  },
];
