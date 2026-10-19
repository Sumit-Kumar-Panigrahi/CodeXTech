import React from 'react';
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
