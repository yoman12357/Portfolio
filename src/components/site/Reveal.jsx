import { motion as Motion } from 'framer-motion';
import { createRevealUp, MOTION_EASE } from './motion';

export default function Reveal({
  as,
  className = '',
  delay = 0,
  amount = 0.24,
  duration = 0.48,
  distance = 22,
  children,
  ...props
}) {
  const Element = as ?? Motion.div;

  return (
    <Element
      initial="hidden"
      whileInView="show"
      variants={createRevealUp(distance)}
      viewport={{ once: true, amount }}
      transition={{ delay, duration, ease: MOTION_EASE }}
      className={className}
      {...props}
    >
      {children}
    </Element>
  );
}
