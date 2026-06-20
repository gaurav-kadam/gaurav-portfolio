import { motion } from "framer-motion";
import { HiAcademicCap, HiSparkles } from "react-icons/hi2";

import { certificationsData } from "../services/api";
import useScrollAnimation from "../hooks/useScrollAnimation";
import SectionHeading from "./SectionHeading";
import { fadeInUp, staggerContainer } from "../animations/scrollAnimations";


function Certifications() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section
      id="certifications"
      data-section="certifications"
      ref={ref}
      className="py-24"
    >
      <motion.div
        className="section-shell"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <SectionHeading
          eyebrow={certificationsData.eyebrow}
          title={certificationsData.title}
          description={certificationsData.description}
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {certificationsData.items.map((certification, index) => (
            <motion.article
              key={`${certification.issuer}-${certification.title}`}
              className="glass-card group relative overflow-hidden rounded-[2rem] p-6"
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 150, damping: 18 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/12 via-white/5 to-secondary/10 opacity-80" />
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border/20 bg-white/10 text-xl text-accent">
                    {index === 0 ? <HiSparkles /> : <HiAcademicCap />}
                  </span>
                  <span className="pill">{certification.issuer}</span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold">
                  {certification.title}
                </h3>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}


export default Certifications;
