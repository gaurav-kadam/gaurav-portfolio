import { useEffect, startTransition, useState } from "react";
import { motion } from "framer-motion";

import About from "../components/About";
import Contact from "../components/Contact";
import Experience from "../components/Experience";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import LoadingSkeleton from "../components/LoadingSkeleton";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import {
  fallbackProfile,
  fallbackProjects,
  fallbackSkills,
  fetchProfile,
  fetchProjects,
  fetchSkills,
} from "../services/api";


function Home({ onSectionChange }) {
  const [profile, setProfile] = useState(fallbackProfile);
  const [projects, setProjects] = useState(fallbackProjects);
  const [skills, setSkills] = useState(fallbackSkills);
  const [loading, setLoading] = useState(true);
  const [apiNotice, setApiNotice] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        const [profileResult, projectResult, skillResult] = await Promise.allSettled([
          fetchProfile(),
          fetchProjects(),
          fetchSkills(),
        ]);

        if (!mounted) {
          return;
        }

        startTransition(() => {
          setProfile(
            profileResult.status === "fulfilled" ? profileResult.value : fallbackProfile,
          );
          setProjects(
            projectResult.status === "fulfilled" ? projectResult.value : fallbackProjects,
          );
          setSkills(skillResult.status === "fulfilled" ? skillResult.value : fallbackSkills);
          setApiNotice(
            [profileResult, projectResult, skillResult].some(
              (result) => result.status === "rejected",
            )
              ? "Backend API is currently unavailable, so fallback portfolio content is being shown."
              : "",
          );
          setLoading(false);
        });
      } catch {
        if (mounted) {
          setApiNotice(
            "Backend API is currently unavailable, so fallback portfolio content is being shown.",
          );
          setLoading(false);
        }
      }
    };

    loadData();
    onSectionChange("home");

    return () => {
      mounted = false;
    };
  }, [onSectionChange]);

  useEffect(() => {
    const sections = document.querySelectorAll("section[data-section]");
    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (activeEntry?.target?.dataset?.section) {
          onSectionChange(activeEntry.target.dataset.section);
        }
      },
      { threshold: [0.2, 0.45, 0.7], rootMargin: "-15% 0px -25% 0px" },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [loading, onSectionChange]);

  if (loading) {
    return (
      <main>
        <div className="section-shell pt-36">
          <LoadingSkeleton className="h-[520px] w-full" />
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <LoadingSkeleton className="h-64 w-full" />
            <LoadingSkeleton className="h-64 w-full" />
            <LoadingSkeleton className="h-64 w-full" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {apiNotice ? (
        <div className="section-shell pt-28">
          <div className="rounded-full border border-amber-400/20 bg-amber-300/10 px-4 py-3 text-sm text-amber-100">
            {apiNotice}
          </div>
        </div>
      ) : null}
      <Hero profile={profile} />
      <About />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Experience />
      <Contact profile={profile} />
      <Footer profile={profile} />
    </motion.main>
  );
}


export default Home;
