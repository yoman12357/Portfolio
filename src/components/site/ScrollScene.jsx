import { motion as Motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const INTENSITY_PRESETS = {
  subtle: {
    y: [26, 0, -14],
    scale: [0.982, 1, 0.992],
    opacity: [0.42, 1, 0.82],
  },
  medium: {
    y: [34, 0, -20],
    scale: [0.974, 1, 0.988],
    opacity: [0.34, 1, 0.76],
  },
};

export default function ScrollScene({
  children,
  className = '',
  intensity = 'subtle',
  offset = ['start 85%', 'end 12%'],
  ...props
}) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const preset = INTENSITY_PRESETS[intensity] ?? INTENSITY_PRESETS.subtle;

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

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const y = useTransform(scrollYProgress, [0, 0.35, 1], preset.y);
  const scale = useTransform(scrollYProgress, [0, 0.35, 1], preset.scale);
  const opacity = useTransform(scrollYProgress, [0, 0.22, 1], preset.opacity);

  return (
    <Motion.div
      ref={ref}
      className={className}
      style={
        enabled
          ? { y, scale, opacity, transformOrigin: 'center top' }
          : { y: 0, scale: 1, opacity: 1, transformOrigin: 'center top' }
      }
      {...props}
    >
      {children}
    </Motion.div>
  );
}
