/**
 * CODEXTECH SITE CONFIGURATION
 * 
 * ============================================================================
 * HOW TO EDIT SITE CONFIGURATION:
 * 1. Tagline & Description: Update tagline and description below.
 * 2. Official Contact: Enter your verified email address in `contactEmail`.
 * 3. Social Media Links: Paste verified URLs into `socialLinks` (leave empty if none).
 * 4. Studio Statistics: Replace [TBD] values with genuine metrics as they are achieved.
 * ============================================================================
 */

import type { SiteConfig } from '../types';

export const siteConfig: SiteConfig = {
  name: 'CODEXTECH',
  tagline: 'Creative Technology Studio & Engineering Collective',
  description:
    'A high-performance technology team building cinematic web experiences, robust software architectures, and modern digital products.',
  
  // Authentic Assets - preserved directly from original uploads
  logoUrl: '/assets/branding/codextech-logo.jpg',
  leaderPhotoUrl: '/assets/team/sumit-leader.jpg',

  // Official Verified Contact Information
  contactEmail: 'sksumitkumarpanigrahi@gmail.com',

  // Social & Studio Links (Leave blank until verified links are provided)
  socialLinks: {
    github: '',    // e.g. 'https://github.com/codextech'
    linkedin: '',  // e.g. 'https://linkedin.com/company/codextech'
    twitter: '',   // e.g. 'https://x.com/codextech'
    discord: '',   // e.g. 'https://discord.gg/yourlink'
  },

  // Studio Metrics Overview (Verified authentic details)
  stats: [
    { label: 'Core Members', value: '06', helper: 'Dedicated specialists' },
    { label: 'Founded', value: '12 Sep 2025', helper: 'Our journey began' },
    { label: 'Featured Projects', value: '02', helper: 'CyberGuard & Life RPG' },
    { label: 'Key Milestones', value: '02', helper: 'Formation & Hackathon Finalist' },
  ],
};
