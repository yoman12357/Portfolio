import { motion as Motion } from 'framer-motion';
import { fadeIn, fadeUp, MOTION_EASE } from '../../animations/variants';

export function RevealItem({
  as,
  className = '',
  distance = 18,
  duration = 0.58,
  variant = 'fadeUp',
  children,
  ...props
}) {
  const Element = as ?? Motion.div;
  const variants = variant === 'fadeIn' ? fadeIn({ duration }) : fadeUp({ distance, duration });

  return (
    <Element
      variants={variants}
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
  duration = 0.58,
  distance = 22,
  once = true,
  variant = 'fadeUp',
  children,
  ...props
}) {
  const Element = as ?? Motion.div;
  const hasStagger = staggerChildren > 0 || delayChildren > 0;
  const baseVariants = variant === 'fadeIn' ? fadeIn({ duration, delay }) : fadeUp({ distance, duration, delay });
  const variants = hasStagger
    ? {
        hidden: baseVariants.hidden,
        show: {
          ...baseVariants.show,
          transition: {
            ...baseVariants.show.transition,
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
      transition={hasStagger ? undefined : baseVariants.show.transition ?? { delay, duration, ease: MOTION_EASE }}
      className={className}
      {...props}
    >
      {children}
    </Element>
  );
}

Reveal.Item = RevealItem;
