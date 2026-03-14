import { motion } from "framer-motion";

import useScrollAnimation from "../hooks/useScrollAnimation";
import SectionHeading from "./SectionHeading";
import { fadeInUp, staggerContainer } from "../animations/scrollAnimations";


function Skills({ skills }) {
  const { ref, isInView } = useScrollAnimation();
  const groups = skills.reduce((accumulator, skill) => {
    accumulator[skill.category] = [...(accumulator[skill.category] || []), skill];
    return accumulator;
  }, {});

  return (
    <section id="skills" data-section="skills" ref={ref} className="py-24">
      <motion.div
        className="section-shell"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <SectionHeading
          eyebrow="Skills"
          title="A stack tuned for modern product delivery."
          description="Frontend craftsmanship, backend reliability, database fluency, and the tooling that keeps teams shipping confidently."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {Object.entries(groups).map(([category, items]) => (
            <motion.article
              key={category}
              className="glass-card rounded-[2rem] p-6"
              variants={fadeInUp}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl font-semibold">{category}</h3>
                <span className="pill">{items.length} Skills</span>
              </div>
              <div className="mt-6 space-y-5">
                {items.map((skill) => (
                  <div
                    key={skill.id}
                    className="rounded-[1.5rem] border border-border/15 bg-white/5 p-4 transition duration-300 hover:border-accent/35 hover:shadow-glow"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-medium">{skill.name}</p>
                      <span className="text-sm text-muted">{skill.proficiency}%</span>
                    </div>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-accent to-secondary"
                        initial={{ width: 0 }}
                        animate={
                          isInView ? { width: `${skill.proficiency}%` } : { width: 0 }
                        }
                        transition={{ duration: 1, delay: 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}


export default Skills;
