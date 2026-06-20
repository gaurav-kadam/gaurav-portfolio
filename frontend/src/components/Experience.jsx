import { motion } from "framer-motion";
import { experienceData } from "../services/api";

import useScrollAnimation from "../hooks/useScrollAnimation";
import SectionHeading from "./SectionHeading";
import { fadeInUp, staggerContainer } from "../animations/scrollAnimations";


const timeline = experienceData.timeline;


function Experience() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="experience" data-section="experience" ref={ref} className="py-24">
      <motion.div
        className="section-shell"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <SectionHeading
          eyebrow={experienceData.eyebrow}
          title={experienceData.title}
          description={experienceData.description}
        />

        <div className="relative mt-14 pl-6 sm:pl-10">
          <div className="absolute left-2 top-0 h-full w-px bg-gradient-to-b from-accent via-secondary to-transparent sm:left-4" />
          <div className="space-y-8">
            {timeline.map((item) => (
              <motion.article
                key={`${item.company}-${item.title}`}
                className="glass-card relative rounded-[2rem] p-6"
                variants={fadeInUp}
              >
                <span className="absolute -left-[1.35rem] top-8 h-4 w-4 rounded-full border-4 border-background bg-accent sm:-left-[1.85rem]" />
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-display text-2xl font-semibold">{item.title}</p>
                    <p className="mt-2 text-sm uppercase tracking-[0.25em] text-muted">
                      {item.company}
                    </p>
                  </div>
                  <span className="pill w-fit">{item.duration}</span>
                </div>
                <p className="body-copy mt-5">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}


export default Experience;
