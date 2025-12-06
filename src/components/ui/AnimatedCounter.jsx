import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

export function AnimatedCounter({ 
  value, 
  duration = 2,
  suffix = '',
  prefix = '',
  className = '' 
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  const spring = useSpring(0, { 
    duration: duration * 1000,
    bounce: 0 
  });
  
  const display = useTransform(spring, (current) => {
    if (value >= 1000000) {
      return `${prefix}${(current / 1000000).toFixed(1)}M${suffix}`;
    }
    if (value >= 1000) {
      return `${prefix}${(current / 1000).toFixed(0)}K${suffix}`;
    }
    return `${prefix}${Math.floor(current)}${suffix}`;
  });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      spring.set(value);
      setHasAnimated(true);
    }
  }, [isInView, value, spring, hasAnimated]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}

export default AnimatedCounter;

