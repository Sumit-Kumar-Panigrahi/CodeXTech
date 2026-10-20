import React, { useState, useEffect } from 'react';
import { Menu, X, Play } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import styles from './Navbar.module.css';

interface NavbarProps {
  onReplayIntro: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onReplayIntro }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Team', href: '#team' },
    { label: 'Projects', href: '#projects' },
    { label: 'Journey', href: '#journey' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll spy detection
      const sections = ['home', 'team', 'projects', 'journey', 'contact'];
      const scrollPos = window.scrollY + 160;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={styles.navbarWrapper}>
      <nav
        className={`${styles.navbarPill} ${scrolled ? styles.navbarScrolled : ''}`}
        role="navigation"
        aria-label="Main Navigation"
      >
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
            <span className={styles.brandTagline}>Studio</span>
          </div>
        </a>

        {/* Desktop Links */}
        <ul className={styles.navLinks}>
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                  onClick={(e) => handleLinkClick(e, item.href)}
                >
                  {item.label}
                  {isActive && <span className={styles.activeDot} />}
                </a>
              </li>
            );
          })}
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
            <Play size={11} fill="currentColor" />
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
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Floating Drawer */}
      {mobileMenuOpen && (
        <div className={styles.mobileDrawer} role="menu">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.label}
                href={item.href}
                className={`${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`}
                onClick={(e) => handleLinkClick(e, item.href)}
                role="menuitem"
              >
                <span>{item.label}</span>
                {isActive && <span className={styles.mobileActiveBadge}>Active</span>}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
};
