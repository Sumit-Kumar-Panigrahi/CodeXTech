import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WelcomeScreen } from './components/welcome/WelcomeScreen';
import { HomeDashboard } from './components/home/HomeDashboard';
import './App.css';

export default function App() {
  const [showWelcome, setShowWelcome] = useState<boolean>(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome ? (
          <motion.div
            key="welcome-experience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5 }}
          >
            <WelcomeScreen onComplete={() => setShowWelcome(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="home-dashboard"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HomeDashboard onReplayIntro={() => setShowWelcome(true)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
