import { motion } from "framer-motion";
import { aboutData } from "../services/api";

import developerIllustration from "../assets/images/developer-illustration.svg";
import useScrollAnimation from "../hooks/useScrollAnimation";
import SectionHeading from "./SectionHeading";
import {
  slideInLeft,
  slideInRight,
  staggerContainer,
  fadeInUp,
} from "../animations/scrollAnimations";


const aboutCards = aboutData.cards;


function About() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="about" data-section="about" ref={ref} className="py-24">
      <motion.div
        className="section-shell grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div variants={slideInLeft}>
          <SectionHeading
            eyebrow={aboutData.eyebrow}
            title={aboutData.title}
            description={aboutData.description}
          />
          <div className="mt-10 grid gap-5">
            {aboutCards.map((card) => (
              <motion.article
                key={card.title}
                className="glass-card rounded-[2rem] p-6"
                variants={fadeInUp}
              >
                <h3 className="font-display text-2xl font-semibold">{card.title}</h3>
                <p className="body-copy mt-3">{card.content}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>

        <motion.div variants={slideInRight}>
          <div className="glass-card relative overflow-hidden rounded-[2.5rem] p-5">
            <div className="absolute -right-8 top-8 h-32 w-32 rounded-full bg-accent/20 blur-3xl" />
            <img
              src={developerIllustration}
              alt="Developer illustration"
              loading="lazy"
              className="relative z-10 w-full rounded-[2rem]"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}


export default About;
