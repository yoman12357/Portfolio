export const MOTION_EASE = [0.22, 1, 0.36, 1];
export const MOTION_DURATION = 0.58;
export const MOTION_DISTANCE = 28;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function normalizeDuration(duration = MOTION_DURATION) {
  return clamp(duration, 0.5, 0.7);
}

function normalizeDistance(distance = MOTION_DISTANCE) {
  return clamp(distance, 20, 40);
}

export function fadeUp({
  distance = MOTION_DISTANCE,
  duration = MOTION_DURATION,
  delay = 0,
  blur = 0,
} = {}) {
  const resolvedDistance = normalizeDistance(distance);
  const resolvedDuration = normalizeDuration(duration);

  return {
    hidden: {
      opacity: 0,
      y: resolvedDistance,
      ...(blur ? { filter: `blur(${blur}px)` } : {}),
    },
    show: {
      opacity: 1,
      y: 0,
      ...(blur ? { filter: 'blur(0px)' } : {}),
      transition: {
        duration: resolvedDuration,
        delay,
        ease: MOTION_EASE,
      },
    },
    exit: {
      opacity: 0,
      y: Math.max(12, resolvedDistance * 0.45),
      transition: {
        duration: clamp(resolvedDuration * 0.62, 0.28, 0.42),
        ease: MOTION_EASE,
      },
    },
  };
}

export function fadeIn({ duration = MOTION_DURATION, delay = 0 } = {}) {
  const resolvedDuration = normalizeDuration(duration);

  return {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: resolvedDuration,
        delay,
        ease: MOTION_EASE,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: clamp(resolvedDuration * 0.58, 0.24, 0.4),
        ease: MOTION_EASE,
      },
    },
  };
}

export function staggerContainer({
  staggerChildren = 0.08,
  delayChildren = 0,
  delay = 0,
} = {}) {
  return {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren,
        delayChildren,
      },
    },
  };
}

export function scaleSoft({
  scale = 1.024,
  duration = 0.34,
  y = -6,
  borderGlow = false,
} = {}) {
  return {
    rest: {
      scale: 1,
      y: 0,
      filter: 'brightness(1)',
    },
    hover: {
      scale,
      y,
      filter: borderGlow ? 'brightness(1.015)' : 'brightness(1)',
      transition: {
        duration: clamp(duration, 0.24, 0.4),
        ease: MOTION_EASE,
      },
    },
    tap: {
      scale: 0.992,
      y: Math.min(0, y * 0.22),
      transition: {
        duration: 0.18,
        ease: MOTION_EASE,
      },
    },
  };
}

