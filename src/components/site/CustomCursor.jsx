import { motion as Motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const INTERACTION_QUERY = '(hover: hover) and (pointer: fine) and (min-width: 768px)';

const CURSOR_VARIANTS = {
  default: {
    ringScale: 1,
    glowScale: 1,
    ringOpacity: 0.88,
    glowOpacity: 0.12,
    coreScale: 1,
  },
  interactive: {
    ringScale: 1.28,
    glowScale: 1.18,
    ringOpacity: 0.98,
    glowOpacity: 0.16,
    coreScale: 0.92,
  },
  panel: {
    ringScale: 1.42,
    glowScale: 1.26,
    ringOpacity: 0.94,
    glowOpacity: 0.14,
    coreScale: 0.86,
  },
};

function getCursorVariant(target) {
  if (!(target instanceof Element)) {
    return 'default';
  }

  if (
    target.closest(
      'a, button, .project-details-trigger, input:not([type="hidden"]), textarea, select, summary, [data-cursor="interactive"]'
    )
  ) {
    return 'interactive';
  }

  if (target.closest('.project-card-shell, .interactive-outline, [role="button"]')) {
    return 'panel';
  }

  return 'default';
}

export default function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia(INTERACTION_QUERY);
    const updateEnabled = () => setEnabled(mediaQuery.matches && !prefersReducedMotion);

    updateEnabled();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateEnabled);
      return () => mediaQuery.removeEventListener('change', updateEnabled);
    }

    mediaQuery.addListener(updateEnabled);
    return () => mediaQuery.removeListener(updateEnabled);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const root = document.documentElement;

    if (enabled) {
      root.classList.add('has-custom-cursor');
    } else {
      root.classList.remove('has-custom-cursor');
    }

    return () => root.classList.remove('has-custom-cursor');
  }, [enabled]);

  return enabled ? <CursorLayer /> : null;
}

function CursorLayer() {
  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState('default');
  const [pressed, setPressed] = useState(false);
  const variantRef = useRef('default');
  const visibleRef = useRef(false);

  const pointerX = useMotionValue(-120);
  const pointerY = useMotionValue(-120);

  const glowX = useSpring(pointerX, { stiffness: 540, damping: 38, mass: 0.11 });
  const glowY = useSpring(pointerY, { stiffness: 540, damping: 38, mass: 0.11 });

  useEffect(() => {
    const updateVariant = (target) => {
      const nextVariant = getCursorVariant(target);

      if (variantRef.current !== nextVariant) {
        variantRef.current = nextVariant;
        setVariant(nextVariant);
      }
    };

    const handlePointerMove = (event) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);

      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }

      updateVariant(event.target);
    };

    const handlePointerDown = (event) => {
      setPressed(true);
      updateVariant(event.target);
    };

    const handlePointerUp = () => setPressed(false);

    const handlePointerLeave = () => {
      visibleRef.current = false;
      setVisible(false);
      setPressed(false);
      variantRef.current = 'default';
      setVariant('default');
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('blur', handlePointerLeave);
    document.documentElement.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('blur', handlePointerLeave);
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, [pointerX, pointerY]);

  const activeVariant = CURSOR_VARIANTS[variant] ?? CURSOR_VARIANTS.default;
  const ringScale = pressed ? activeVariant.ringScale * 0.9 : activeVariant.ringScale;
  const glowScale = pressed ? activeVariant.glowScale * 0.92 : activeVariant.glowScale;
  const coreScale = pressed ? activeVariant.coreScale * 0.84 : activeVariant.coreScale;

  return (
    <>
      <Motion.div
        aria-hidden="true"
        className="custom-cursor-glow pointer-events-none fixed left-0 top-0 z-[120] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ x: glowX, y: glowY }}
        animate={{
          opacity: visible ? activeVariant.glowOpacity : 0,
          scale: visible ? glowScale : 0.72,
        }}
        transition={{ duration: 0.1, ease: 'easeOut' }}
      />

      <Motion.div
        aria-hidden="true"
        className="custom-cursor-ring pointer-events-none fixed left-0 top-0 z-[121] flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
        style={{ x: pointerX, y: pointerY }}
        animate={{
          opacity: visible ? activeVariant.ringOpacity : 0,
          scale: visible ? ringScale : 0.82,
        }}
        transition={{ duration: 0.08, ease: 'easeOut' }}
      >
        <Motion.span
          className="custom-cursor-core h-2 w-2 rounded-full"
          animate={{
            scale: visible ? coreScale : 0.7,
            opacity: visible ? 1 : 0,
          }}
          transition={{ duration: 0.08, ease: 'easeOut' }}
        />
      </Motion.div>
    </>
  );
}
