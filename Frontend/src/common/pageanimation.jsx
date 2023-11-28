import React from "react";
import { AnimatePresence, motion } from 'framer-motion';

export default function AnimationWrapper({ children,keyVal, initial = { opacity: 0 }, 
  animate = { opacity: 1 },transition={duration:1},className}) {
  return (
    <AnimatePresence>
    <motion.div
    key={keyVal}
      initial={initial}
      animate={animate}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
    </AnimatePresence>
  );
}

