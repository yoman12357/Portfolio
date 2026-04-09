import { motion as Motion, useReducedMotion } from 'framer-motion';
import { fadeIn, fadeUp, staggerContainer } from '../../animations/variants';

export default function TextReveal({
  as,
  className = '',
  text,
  items,
  split = 'words',
  renderItem,
  distance = 28,
  duration = 0.58,
  stagger = 0.05,
  delayChildren = 0,
  amount = 0.55,
  once = true,
  itemClassName = '',
  ...props
}) {
  const Element = as ?? Motion.div;
  const reduceMotion = useReducedMotion();
  const resolvedItems =
    items ??
    (typeof text === 'string'
      ? split === 'lines'
        ? text.split('\n').filter(Boolean)
        : text.split(/\s+/).filter(Boolean)
      : []);

  const itemVariants = reduceMotion ? fadeIn({ duration: 0.24 }) : fadeUp({ distance, duration });

  return (
    <Element
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={staggerContainer({
        staggerChildren: reduceMotion ? 0 : stagger,
        delayChildren,
      })}
      className={className}
      {...props}
    >
      {resolvedItems.map((item, index) => {
        if (renderItem) {
          return renderItem({
            item,
            index,
            key: `${item}-${index}`,
            variants: itemVariants,
          });
        }

        if (split === 'lines') {
          return (
            <span key={`${item}-${index}`} className="block overflow-hidden">
              <Motion.span variants={itemVariants} className={`block ${itemClassName}`.trim()}>
                {item}
              </Motion.span>
            </span>
          );
        }

        return (
          <span key={`${item}-${index}`} className="text-reveal-word-wrap">
            <Motion.span variants={itemVariants} className={`inline-block ${itemClassName}`.trim()}>
              {item}
            </Motion.span>
            <span className="text-reveal-space" aria-hidden="true">
              {' '}
            </span>
          </span>
        );
      })}
    </Element>
  );
}

