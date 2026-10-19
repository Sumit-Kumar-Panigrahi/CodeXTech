import React from 'react';
import { siteConfig } from '../../data/siteConfig';

interface LogoRevealProps {
  onRevealComplete?: () => void;
}

export const LogoReveal: React.FC<LogoRevealProps> = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'var(--space-8)',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '160px',
          height: '160px',
          marginBottom: 'var(--space-6)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: '0 0 60px rgba(255, 78, 38, 0.3), 0 0 40px rgba(38, 208, 206, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          background: '#000',
        }}
      >
        <img
          src={siteConfig.logoUrl}
          alt="CODEXTECH"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>

      <h1
        style={{
          fontSize: 'var(--font-size-4xl)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          background: 'linear-gradient(135deg, #FFFFFF 30%, #FF663D 80%, #26D0CE 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: 'var(--space-2)',
        }}
      >
        {siteConfig.name}
      </h1>

      <p
        style={{
          fontSize: 'var(--font-size-md)',
          color: 'var(--color-text-secondary)',
          letterSpacing: '0.04em',
          maxWidth: '500px',
        }}
      >
        {siteConfig.tagline}
      </p>
    </div>
  );
};
