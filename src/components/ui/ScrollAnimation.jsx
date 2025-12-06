import React from 'react';
import { motion } from 'framer-motion';

const ScrollAnimation = ({ 
  children, 
  variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  },
  transition = { duration: 0.6, ease: "easeOut" },
  className = "",
  viewport = { once: true, amount: 0.3 }
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={variants}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimation;
