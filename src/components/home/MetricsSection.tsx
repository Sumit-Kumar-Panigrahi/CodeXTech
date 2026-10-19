import React from 'react';
import { siteConfig } from '../../data/siteConfig';
import styles from './HomeDashboard.module.css';

export const MetricsSection: React.FC = () => {
  return (
    <section className={styles.metricsSection} aria-label="Studio Overview Metrics">
      <div className="container">
        <div className={styles.metricsGrid}>
          {siteConfig.stats.map((stat, idx) => (
            <div key={idx} className={styles.metricCard}>
              <div className={styles.metricValue}>{stat.value}</div>
              <div className={styles.metricLabel}>{stat.label}</div>
              {stat.helper && <div className={styles.metricHelper}>{stat.helper}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
