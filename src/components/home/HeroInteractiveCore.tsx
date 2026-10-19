import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../../data/siteConfig';
import styles from './HeroInteractiveCore.module.css';

export const HeroInteractiveCore: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      className={styles.coreContainer}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="CODEXTECH Interactive Core"
    >
      {/* 3D Parallax Stage */}
      <motion.div
        className={styles.parallaxStage}
        animate={{
          rotateY: mousePos.x * 24,
          rotateX: -mousePos.y * 24,
        }}
        transition={{ type: 'spring', stiffness: 180, damping: 22 }}
      >
        {/* Ambient Radial Flare & Glow */}
        <div className={styles.ambientCoreGlow} />

        {/* Orbit Ring 1 (Outer Orange Glow Track) */}
        <div className={styles.orbitRingOuter}>
          <span className={`${styles.orbitNode} ${styles.orbitNodeOrange}`} />
          <span className={`${styles.orbitNode} ${styles.orbitNodeOrangeOpposite}`} />
        </div>

        {/* Orbit Ring 2 (Middle Cyan Dashed Track) */}
        <div className={styles.orbitRingMiddle}>
          <span className={`${styles.orbitNode} ${styles.orbitNodeCyan}`} />
        </div>

        {/* Orbit Ring 3 (Inner Tech Reticle) */}
        <div className={styles.orbitRingInner}>
          <span className={`${styles.orbitNode} ${styles.orbitNodeWhite}`} />
        </div>

        {/* Radar Crosshairs */}
        <div className={styles.crosshairs} />

        {/* Floating Central Emblem */}
        <div className={styles.emblemCore}>
          <img
            src={siteConfig.logoUrl}
            alt="CODEXTECH"
            className={styles.coreEmblemImg}
          />
          <div className={styles.emblemGlowShield} />
        </div>

        {/* Minimal Kinetic Energy Accents (No text, pure futuristic animation) */}
        <div className={`${styles.energyPill} ${styles.pillTop}`}>
          <span className={styles.pillPulseDot} />
          <span>CORE ENGINE</span>
        </div>

        <div className={`${styles.energyPill} ${styles.pillBottom}`}>
          <span className={styles.pillCyanDot} />
          <span>CYBERNETIC NEXUS</span>
        </div>
      </motion.div>
    </div>
  );
};
