import { motion as Motion } from 'framer-motion';
import { createRevealUp, createStaggerItem, MOTION_EASE } from './motion';

export function RevealItem({
  as,
  className = '',
  distance = 18,
  duration = 0.42,
  children,
  ...props
}) {
  const Element = as ?? Motion.div;

  return (
    <Element
      variants={createStaggerItem(distance, duration)}
      className={className}
      {...props}
    >
      {children}
    </Element>
  );
}

export default function Reveal({
  as,
  className = '',
  delay = 0,
  delayChildren = 0,
  staggerChildren = 0,
  amount = 0.24,
  duration = 0.48,
  distance = 22,
  once = true,
  children,
  ...props
}) {
  const Element = as ?? Motion.div;
  const hasStagger = staggerChildren > 0 || delayChildren > 0;
  const baseVariants = createRevealUp(distance);
  const variants = hasStagger
    ? {
        hidden: baseVariants.hidden,
        show: {
          ...baseVariants.show,
          transition: {
            delay,
            duration,
            ease: MOTION_EASE,
            staggerChildren,
            delayChildren,
          },
        },
      }
    : baseVariants;

  return (
    <Element
      initial="hidden"
      whileInView="show"
      variants={variants}
      viewport={{ once, amount }}
      transition={hasStagger ? undefined : { delay, duration, ease: MOTION_EASE }}
      className={className}
      {...props}
    >
      {children}
    </Element>
  );
}

Reveal.Item = RevealItem;
