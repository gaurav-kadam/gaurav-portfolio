import { motion } from "framer-motion";

import { fadeInUp } from "../animations/scrollAnimations";


function SectionHeading({ eyebrow, title, description, align = "left" }) {
  const alignment = align === "center" ? "text-center" : "text-left";

  return (
    <motion.div className={alignment} variants={fadeInUp}>
      <p className="section-kicker">{eyebrow}</p>
      <h2 className="section-title mt-4">{title}</h2>
      <p className="body-copy mt-5 max-w-2xl text-balance">{description}</p>
    </motion.div>
  );
}


export default SectionHeading;
