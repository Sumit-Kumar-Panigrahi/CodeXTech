import React, { useEffect } from 'react';
import { Navbar } from '../layout/Navbar';
import { Footer } from '../layout/Footer';
import { HeroSection } from './HeroSection';
import { MetricsSection } from './MetricsSection';
import { ProjectsSection } from '../projects/ProjectsSection';
import { TeamSection } from '../team/TeamSection';
import { TimelineSection } from '../timeline/TimelineSection';
import { ContactSection } from '../contact/ContactSection';
import { TechBackgroundCanvas } from '../common/TechBackgroundCanvas';
import styles from './HomeDashboard.module.css';

interface HomeDashboardProps {
  onReplayIntro: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({ onReplayIntro }) => {
  // Play subtle cinematic futuristic reveal sound effect once on entrance
  useEffect(() => {
    let sfx: HTMLAudioElement | null = new Audio('/assets/audio/dashboard-reveal.mp3');
    sfx.preload = 'auto';
    sfx.volume = 0.5; // Tasteful, balanced volume

    // Synchronize slightly with the 120ms entrance motion
    const timer = window.setTimeout(() => {
      if (sfx) {
        sfx.play().catch(() => {
          // Handled gracefully if browser policy restricts unmuted sound
        });
      }
    }, 120);

    return () => {
      window.clearTimeout(timer);
      if (sfx) {
        sfx.pause();
        sfx.src = '';
        sfx = null;
      }
    };
  }, []); // Strictly once per dashboard mount

  return (
    <div className={styles.dashboardWrapper}>
      {/* High-Performance Interactive Particle & Constellation Background */}
      <TechBackgroundCanvas />

      {/* Top Navbar */}
      <Navbar onReplayIntro={onReplayIntro} />

      {/* Main Content Sections */}
      <main id="main-content" style={{ position: 'relative' }}>
        <HeroSection />
        <MetricsSection />
        <ProjectsSection />
        <TeamSection />
        <TimelineSection />
        <ContactSection />
      </main>

      {/* Footer & Contact CTA */}
      <Footer onReplayIntro={onReplayIntro} />
    </div>
  );
};
