/**
 * CODEXTECH CORE TYPE DEFINITIONS
 * Shared TypeScript interfaces across data schemas and UI components
 */

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  bio: string;
  skills: string[];
  introScript: string;
  introSentences?: string[];
  spokenSentences?: string[];
  gender: 'male' | 'female';
  contributions?: string[];
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    email?: string;
  };
  isLeader?: boolean;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  technologies: string[];
  thumbnailUrl: string;
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  status?: string;
  features?: string[];
  metrics?: { label: string; value: string }[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  category: string;
  date?: string;
  year?: string;
  dateOrQuarter?: string;
  badge?: string;
  event?: string;
  institution?: string;
  achievement?: string;
}

export interface SiteStat {
  label: string;
  value: string;
  helper?: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  logoUrl: string;
  leaderPhotoUrl: string;
  contactEmail: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    discord?: string;
  };
  stats: SiteStat[];
}

export interface WelcomeNarrationCue {
  id: number;
  startSecond: number;
  endSecond: number;
  speaker: string;
  textHindiEnglish: string;
  subtitle: string;
  textToSpeak?: string;
}
