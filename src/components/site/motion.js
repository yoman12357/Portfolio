export const MOTION_EASE = [0.22, 1, 0.36, 1];

export function createRevealUp(distance = 22) {
  return {
    hidden: { opacity: 0, y: distance },
    show: { opacity: 1, y: 0 },
  };
}

export function createStaggerContainer(staggerChildren = 0.08, delayChildren = 0) {
  return {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
}

export function createStaggerItem(distance = 20, duration = 0.48) {
  return {
    hidden: { opacity: 0, y: distance },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: MOTION_EASE,
      },
    },
  };
}
