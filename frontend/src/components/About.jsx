import { motion } from "framer-motion";

import developerIllustration from "../assets/images/developer-illustration.svg";
import useScrollAnimation from "../hooks/useScrollAnimation";
import SectionHeading from "./SectionHeading";
import {
  slideInLeft,
  slideInRight,
  staggerContainer,
  fadeInUp,
} from "../animations/scrollAnimations";


const aboutCards = [
  {
    title: "Education",
    content:
      "Strong self-driven learning approach with consistent focus on modern frontend engineering, backend architecture, and cloud-ready delivery.",
  },
  {
    title: "Career Goals",
    content:
      "To contribute to product teams that value thoughtful user experience, high-quality engineering practices, and scalable system design.",
  },
  {
    title: "Developer Philosophy",
    content:
      "Build with clarity, ship with intention, and create interfaces that feel elegant while remaining practical and maintainable.",
  },
];


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
            eyebrow="About Me"
            title="Building products that feel polished at every layer."
            description="Gaurav Ravindra Kadam is a passionate full stack developer focused on building scalable backend systems and modern responsive web applications."
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
