import { useEffect, useEffectEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowUp } from "react-icons/hi";


function BackToTop() {
  const [visible, setVisible] = useState(false);

  const handleScroll = useEffectEvent(() => {
    setVisible(window.scrollY > 500);
  });

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-border/25 bg-surface/80 text-foreground shadow-card backdrop-blur-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <HiArrowUp className="text-lg" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}


export default BackToTop;
