import React from 'react';
import { Mail, Play, ChevronUp } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import styles from './Footer.module.css';

interface FooterProps {
  onReplayIntro: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReplayIntro }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const contactEmail = siteConfig.contactEmail || 'sksumitkumarpanigrahi@gmail.com';

  return (
    <footer className={styles.footer} role="contentinfo" aria-label="Website Footer">
      <div className="container">
        {/* Footer Main Columns */}
        <div className={styles.footerMain}>
          {/* Brand & Description Column */}
          <div className={styles.footerBrandCol}>
            <div className={styles.footerBrandRow}>
              <img
                src={siteConfig.logoUrl}
                alt="CODEXTECH Official Logo"
                className={styles.footerLogo}
              />
              <div className={styles.brandText}>
                <span className={styles.brandName}>{siteConfig.name}</span>
                <span className={styles.brandTagline}>Creative Technology Studio</span>
              </div>
            </div>

            <p className={styles.footerDesc}>{siteConfig.description}</p>

            <a
              href={`mailto:${contactEmail}`}
              className={styles.footerEmailLink}
              title="Send email to CODEXTECH"
            >
              <Mail size={14} color="var(--color-accent-primary)" />
              <span>{contactEmail}</span>
            </a>
          </div>

          {/* Navigation Directory Column */}
          <div className={styles.footerNavCol}>
            <h4>Directory</h4>
            <ul className={styles.footerNavList}>
              <li>
                <a href="#home" onClick={(e) => handleLinkClick(e, '#home')}>
                  Home
                </a>
              </li>
              <li>
                <a href="#team" onClick={(e) => handleLinkClick(e, '#team')}>
                  Team Showcase
                </a>
              </li>
              <li>
                <a href="#projects" onClick={(e) => handleLinkClick(e, '#projects')}>
                  Featured Projects
                </a>
              </li>
              <li>
                <a href="#journey" onClick={(e) => handleLinkClick(e, '#journey')}>
                  Journey & Milestones
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')}>
                  Contact Studio
                </a>
              </li>
            </ul>
          </div>

          {/* Studio Collective Info */}
          <div className={styles.footerNavCol}>
            <h4>Collective</h4>
            <ul className={styles.footerNavList}>
              <li>
                <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                  6 Core Technologists
                </span>
              </li>
              <li>
                <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                  Led by Sumit Kumar Panigrahi
                </span>
              </li>
              <li>
                <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                  Founded 12 September 2025
                </span>
              </li>
            </ul>
          </div>

          {/* Quick Actions & Experience */}
          <div className={styles.footerNavCol}>
            <h4>Experience</h4>
            <ul className={styles.footerNavList}>
              <li>
                <button
                  type="button"
                  onClick={onReplayIntro}
                  className={styles.actionBtn}
                  title="Replay cinematic welcome introduction"
                >
                  <Play size={13} fill="currentColor" color="var(--color-accent-primary)" />
                  <span>Replay Welcome Intro</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={scrollToTop}
                  className={styles.actionBtn}
                  title="Return to top of page"
                >
                  <ChevronUp size={14} />
                  <span>Scroll to Top</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className={styles.footerBottom}>
          <span>&copy; {new Date().getFullYear()} CODEXTECH. All rights reserved.</span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>Built By Sumit Kumar Panigrahi</span>

            <button
              type="button"
              onClick={scrollToTop}
              className={styles.backToTopBtn}
              title="Back to Top"
              aria-label="Back to Top"
            >
              <ChevronUp size={13} />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
