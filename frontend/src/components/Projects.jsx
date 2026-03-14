import { useState } from "react";
import { motion } from "framer-motion";
import { HiArrowTopRightOnSquare, HiCodeBracket } from "react-icons/hi2";
import { Link } from "react-router-dom";

import useScrollAnimation from "../hooks/useScrollAnimation";
import SectionHeading from "./SectionHeading";
import { fadeInUp, staggerContainer } from "../animations/scrollAnimations";


const projectGradients = [
  "from-sky-500/35 to-cyan-300/10",
  "from-emerald-500/30 to-teal-300/10",
  "from-fuchsia-500/30 to-indigo-300/10",
  "from-orange-500/30 to-amber-300/10",
];


function ProjectCard({ project, index }) {
  const [rotation, setRotation] = useState({ rotateX: 0, rotateY: 0 });

  const handleMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const rotateY = ((x / bounds.width) - 0.5) * 12;
    const rotateX = -((y / bounds.height) - 0.5) * 12;
    setRotation({ rotateX, rotateY });
  };

  return (
    <motion.article
      className="group glass-card relative overflow-hidden rounded-[2rem] p-5"
      variants={fadeInUp}
      style={{
        transformStyle: "preserve-3d",
        rotateX: rotation.rotateX,
        rotateY: rotation.rotateY,
      }}
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 140, damping: 18 }}
      onMouseMove={handleMove}
      onMouseLeave={() => setRotation({ rotateX: 0, rotateY: 0 })}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${projectGradients[index % projectGradients.length]} opacity-80`}
      />
      <div className="mesh-panel absolute inset-0 opacity-10" />
      <div className="relative z-10 rounded-[1.7rem] border border-white/10 bg-slate-950/35 p-5">
        <div className="flex aspect-[16/10] items-end rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-slate-950/20 via-slate-900/50 to-slate-800/10 p-5">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="h-full w-full rounded-[1.25rem] object-cover"
            />
          ) : (
            <div className="w-full">
              <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                Featured Build
              </p>
              <p className="mt-3 font-display text-3xl font-semibold text-white">
                {project.title}
              </p>
            </div>
          )}
        </div>
        <div className="mt-6">
          <h3 className="font-display text-2xl font-semibold">{project.title}</h3>
          <p className="body-copy mt-3">{project.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.technologies.map((item) => (
              <span key={item} className="pill border-white/15 bg-white/10">
                {item}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={project.github_link}
              className="button-secondary"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
              <HiCodeBracket className="ml-2 text-base" />
            </a>
            <a
              href={project.live_link}
              className="button-primary"
              target="_blank"
              rel="noreferrer"
            >
              Live Demo
              <HiArrowTopRightOnSquare className="ml-2 text-base" />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}


function Projects({ projects }) {
  const { ref, isInView } = useScrollAnimation();
  const featuredProjects = projects.slice(0, 3);

  return (
    <section id="projects" data-section="projects" ref={ref} className="py-24">
      <motion.div
        className="section-shell"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Projects"
            title="Selected work designed for scale and polish."
            description="Every project is framed as a product experience, with attention to performance, architecture, and interface quality."
          />
          <Link to="/projects" className="button-secondary w-fit">
            Explore All Projects
          </Link>
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id || project.title} project={project} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}


export default Projects;
