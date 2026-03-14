import { motion } from "framer-motion";

import useScrollAnimation from "../hooks/useScrollAnimation";
import SectionHeading from "./SectionHeading";
import { fadeInUp, staggerContainer } from "../animations/scrollAnimations";


const timeline = [
  {
    title: "Full Stack Developer",
    company: "Independent Projects",
    duration: "2024 - Present",
    description:
      "Designing premium web experiences, API-driven platforms, and deployment-ready applications with a strong focus on responsive UI and maintainable architecture.",
  },
  {
    title: "Backend Engineer",
    company: "Scalable Web Systems",
    duration: "2023 - 2024",
    description:
      "Built REST APIs, data models, and operational backend workflows with Django, PostgreSQL, and clean modular service boundaries.",
  },
  {
    title: "Frontend Developer",
    company: "Modern Product Interfaces",
    duration: "2022 - 2023",
    description:
      "Delivered polished component systems, motion-rich landing pages, and responsive dashboards centered around real product usability.",
  },
];


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
          eyebrow="Experience"
          title="A timeline shaped by building and shipping."
          description="A development journey centered on production-focused engineering, thoughtful interface design, and scalable implementation."
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
