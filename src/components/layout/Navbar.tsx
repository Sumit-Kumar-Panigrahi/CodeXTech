import React, { useState } from 'react';
import { Menu, X, Play } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import styles from './Navbar.module.css';

interface NavbarProps {
  onReplayIntro: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onReplayIntro }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Team', href: '#team' },
    { label: 'Projects', href: '#projects' },
    { label: 'Journey', href: '#journey' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={styles.navbar} role="navigation" aria-label="Main Navigation">
      <div className={`container ${styles.navContainer}`}>
        {/* Brand identity */}
        <a
          href="#home"
          className={styles.brand}
          onClick={(e) => handleLinkClick(e, '#home')}
        >
          <img
            src={siteConfig.logoUrl}
            alt="CODEXTECH Logo"
            className={styles.brandLogo}
          />
          <div className={styles.brandTextGroup}>
            <span className={styles.brandTitle}>{siteConfig.name}</span>
            <span className={styles.brandTagline}>Creative Tech Studio</span>
          </div>
        </a>

        {/* Desktop Links */}
        <ul className={styles.navLinks}>
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={styles.navLink}
                onClick={(e) => handleLinkClick(e, item.href)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions Group */}
        <div className={styles.actionsGroup}>
          <button
            type="button"
            className={styles.replayButton}
            onClick={onReplayIntro}
            title="Replay the cinematic welcome experience"
            aria-label="Replay the cinematic welcome experience"
          >
            <Play size={12} fill="currentColor" />
            <span>Replay Intro</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className={styles.mobileToggle}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={styles.mobileNavLink}
              onClick={(e) => handleLinkClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};
