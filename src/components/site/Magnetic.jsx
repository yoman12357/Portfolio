import { motion as Motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const INTERACTION_QUERY = '(hover: hover) and (pointer: fine) and (min-width: 1024px)';

export default function Magnetic({ children, className = '', strength = 7 }) {
  const elementRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  const springConfig = { stiffness: 220, damping: 24, mass: 0.48 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springScale = useSpring(scale, { stiffness: 200, damping: 22, mass: 0.42 });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia(INTERACTION_QUERY);
    const updateEnabled = () => setEnabled(mediaQuery.matches);

    updateEnabled();

    mediaQuery.addEventListener('change', updateEnabled);
    return () => mediaQuery.removeEventListener('change', updateEnabled);
  }, []);

  const isInteractive = enabled && !prefersReducedMotion;

  const resetPosition = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  const setPressScale = () => {
    scale.set(isInteractive ? 0.996 : 0.99);
  };

  const setRestingScale = () => {
    scale.set(isInteractive ? 1.008 : 1);
  };

  const handleMouseMove = (event) => {
    if (!isInteractive || !elementRef.current) {
      return;
    }

    const bounds = elementRef.current.getBoundingClientRect();
    const offsetX = event.clientX - (bounds.left + bounds.width / 2);
    const offsetY = event.clientY - (bounds.top + bounds.height / 2);

    x.set((offsetX / bounds.width) * strength * 2);
    y.set((offsetY / bounds.height) * strength * 2);
    scale.set(1.008);
  };

  return (
    <Motion.div
      ref={elementRef}
      className={`magnetic-shell ${className}`.trim()}
      style={isInteractive ? { x: springX, y: springY, scale: springScale } : undefined}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        if (isInteractive) {
          scale.set(1.008);
        }
      }}
      onMouseLeave={resetPosition}
      onPointerDownCapture={setPressScale}
      onPointerUpCapture={setRestingScale}
      onPointerCancel={resetPosition}
      onFocusCapture={resetPosition}
      onBlurCapture={resetPosition}
    >
      {children}
    </Motion.div>
  );
}
