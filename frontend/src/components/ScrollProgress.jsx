import { motion, useScroll, useSpring } from "framer-motion";


function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 22,
    mass: 0.2,
  });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-accent via-sky-400 to-secondary"
      style={{ scaleX }}
    />
  );
}


export default ScrollProgress;
