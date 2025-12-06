import { motion } from 'framer-motion';

export function GlassCard({ 
  children, 
  className = '', 
  hover = true,
  onClick,
  as = 'div',
  ...props 
}) {
  const Component = motion[as] || motion.div;
  
  return (
    <Component
      className={`
        bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl
        ${hover ? 'transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-glow-sm cursor-pointer' : ''}
        ${className}
      `}
      whileHover={hover ? { y: -4, scale: 1.02 } : {}}
      whileTap={hover && onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  );
}

export default GlassCard;

