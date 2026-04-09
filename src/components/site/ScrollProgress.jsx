import { memo, useEffect, useState } from 'react';
import { motion as Motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    mass: 0.24,
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const updateEnabled = () => setEnabled(mediaQuery.matches && !reduceMotion);

    updateEnabled();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateEnabled);
      return () => mediaQuery.removeEventListener('change', updateEnabled);
    }

    mediaQuery.addListener(updateEnabled);
    return () => mediaQuery.removeListener(updateEnabled);
  }, [reduceMotion]);

  if (!enabled) {
    return null;
  }

  return (
    <div aria-hidden="true" className="scroll-progress-shell">
      <Motion.div className="scroll-progress-bar" style={{ scaleX }} />
    </div>
  );
}

export default memo(ScrollProgress);
