import { motion as Motion } from 'framer-motion';
import { createStaggerContainer } from './motion';

export default function StaggerGroup({
  as,
  className = '',
  children,
  stagger = 0.08,
  delayChildren = 0,
  amount = 0.2,
  once = true,
  ...props
}) {
  const Element = as ?? Motion.div;

  return (
    <Element
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={createStaggerContainer(stagger, delayChildren)}
      className={className}
      {...props}
    >
      {children}
    </Element>
  );
}
