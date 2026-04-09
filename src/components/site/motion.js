export {
  MOTION_EASE,
  MOTION_DURATION,
  MOTION_DISTANCE,
  fadeIn,
  fadeUp,
  scaleSoft,
} from '../../animations/variants';

import { fadeUp, staggerContainer } from '../../animations/variants';

export function createRevealUp(distance = 28, duration) {
  return fadeUp({ distance, duration });
}

export function createStaggerContainer(staggerChildren = 0.08, delayChildren = 0, delay = 0) {
  return staggerContainer({ staggerChildren, delayChildren, delay });
}

export function createStaggerItem(distance = 28, duration) {
  return fadeUp({ distance, duration });
}
