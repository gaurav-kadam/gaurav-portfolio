import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowRight, HiDocumentText } from "react-icons/hi2";

import gauravProfileImage from "../assets/images/gaurav-kadam.png";
import profilePlaceholder from "../assets/images/profile-placeholder.svg";
import { heroData, resumeData } from "../services/api";
import {
  fadeInUp,
  slideInLeft,
  slideInRight,
  staggerContainer,
} from "../animations/scrollAnimations";


const technologies = heroData.technologies;

function Hero({ profile }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 110]);
  const [techIndex, setTechIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [heroImageSrc, setHeroImageSrc] = useState(gauravProfileImage);

  useEffect(() => {
    const currentWord = technologies[techIndex];
    let frame = 0;

    const interval = window.setInterval(() => {
      frame += 1;
      setTypedText(currentWord.slice(0, frame));

      if (frame >= currentWord.length) {
        window.clearInterval(interval);
        window.setTimeout(() => {
          setTypedText("");
          setTechIndex((current) => (current + 1) % technologies.length);
        }, 1200);
      }
    }, 110);

    return () => window.clearInterval(interval);
  }, [techIndex]);

  const handleHireMe = () => {
    const contactSection = document.getElementById("contact");
    const firstField = contactSection?.querySelector("input, textarea, button");

    contactSection?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => firstField?.focus({ preventScroll: true }), 450);
  };

  return (
    <section
      id="home"
      data-section="home"
      className="relative overflow-hidden pt-28 sm:pt-32"
    >
      <div className="absolute inset-0 -z-10 bg-hero-radial" />
      <div className="section-shell relative">
        <motion.div
          className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={slideInLeft}>
            <span className="pill">{heroData.eyebrow}</span>
            <h1 className="mt-8 font-display text-5xl font-bold leading-none tracking-tight sm:text-6xl lg:text-7xl">
              {profile.name}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-foreground/85 sm:text-xl">
              {profile.title}
            </p>
            <p className="body-copy mt-4 max-w-2xl">
              {heroData.description}
            </p>

            <div className="mt-8 flex min-h-[3.5rem] items-center gap-3">
              <span className="text-sm uppercase tracking-[0.3em] text-muted">
                Focused on
              </span>
              <span className="font-display text-2xl font-semibold text-accent sm:text-3xl">
                {typedText}
                <span className="ml-1 inline-block h-7 w-px animate-pulse bg-accent align-middle" />
              </span>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                className="button-primary"
                onClick={handleHireMe}
                aria-label="Hire me and jump to the contact form"
              >
                Hire Me
                <HiArrowRight className="ml-2 text-base" />
              </button>
              <Link
                to={resumeData.viewerPath}
                className="button-secondary"
                aria-label="Open resume viewer"
              >
                View Resume
                <HiDocumentText className="ml-2 text-base" />
              </Link>
            </div>

            <motion.div
              className="mt-12 grid gap-4 sm:grid-cols-3"
              variants={staggerContainer}
            >
              {heroData.highlights.map((item) => (
                <motion.div
                  key={item.label}
                  className="glass-card rounded-[1.6rem] p-5"
                  variants={fadeInUp}
                >
                  <p className="text-xs uppercase tracking-[0.26em] text-muted">
                    {item.label}
                  </p>
                  <p className="mt-3 font-display text-xl font-semibold">
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div className="relative" style={{ y }} variants={slideInRight}>
            <div className="absolute -left-4 top-8 h-32 w-32 rounded-full bg-accent/25 blur-3xl" />
            <div className="absolute bottom-8 right-0 h-40 w-40 rounded-full bg-secondary/20 blur-3xl" />
            <motion.div
              className="glass-card relative overflow-hidden rounded-[2.5rem] p-6"
              whileHover={{ y: -8, rotateX: 4, rotateY: -4 }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
            >
              <div className="mesh-panel absolute inset-0 opacity-20" />
              <motion.div
                className="absolute left-6 top-6 h-24 w-24 rounded-full bg-accent/20 blur-2xl"
                animate={{ y: [0, -12, 0], opacity: [0.55, 0.8, 0.55] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 6 }}
              />
              <img
                src={heroImageSrc}
                alt="Gaurav Kadam - Software Developer"
                width="520"
                height="640"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="relative z-10 mx-auto aspect-[4/5] w-full max-w-md rounded-[2rem] object-cover object-center shadow-glow"
                onError={() => setHeroImageSrc(profilePlaceholder)}
              />
              <motion.div
                className="glass-card absolute -bottom-4 right-4 z-20 rounded-[1.5rem] px-5 py-4"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5 }}
              >
                <p className="text-xs uppercase tracking-[0.28em] text-muted">
                  Available for
                </p>
                <p className="mt-2 font-display text-lg font-semibold">
                  Full stack roles
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


export default Hero;
