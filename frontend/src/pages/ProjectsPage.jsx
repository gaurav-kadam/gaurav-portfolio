import { useDeferredValue, useEffect, startTransition, useState } from "react";
import { motion } from "framer-motion";
import { HiMagnifyingGlass } from "react-icons/hi2";

import Footer from "../components/Footer";
import LoadingSkeleton from "../components/LoadingSkeleton";
import SectionHeading from "../components/SectionHeading";
import {
  fallbackProfile,
  fallbackProjects,
  fetchProfile,
  fetchProjects,
} from "../services/api";


function ProjectsPage({ onSectionChange }) {
  const [profile, setProfile] = useState(fallbackProfile);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    let mounted = true;
    onSectionChange("projects");

    const loadPageData = async () => {
      const [projectsResult, profileResult] = await Promise.allSettled([
        fetchProjects(),
        fetchProfile(),
      ]);

      if (!mounted) {
        return;
      }

      startTransition(() => {
        setProjects(
          projectsResult.status === "fulfilled" ? projectsResult.value : fallbackProjects,
        );
        setProfile(
          profileResult.status === "fulfilled" ? profileResult.value : fallbackProfile,
        );
        setLoading(false);
      });
    };

    loadPageData();

    return () => {
      mounted = false;
    };
  }, [onSectionChange]);

  const filteredProjects = projects.filter((project) => {
    const searchValue = deferredQuery.toLowerCase().trim();
    if (!searchValue) {
      return true;
    }

    return (
      project.title.toLowerCase().includes(searchValue) ||
      project.description.toLowerCase().includes(searchValue) ||
      project.technologies.some((technology) =>
        technology.toLowerCase().includes(searchValue),
      )
    );
  });

  return (
    <main className="pt-32">
      <section className="section-shell pb-10">
        <div className="glass-card rounded-[2.5rem] p-6 sm:p-8">
          <SectionHeading
            eyebrow="Projects Archive"
            title="A broader look at the systems and interfaces I build."
            description="Explore the project catalog with a searchable view designed to highlight product thinking, technology choices, and implementation quality."
          />
          <div className="mt-8 max-w-xl">
            <label className="flex items-center gap-3 rounded-full border border-border/20 bg-white/5 px-5 py-4">
              <HiMagnifyingGlass className="text-lg text-muted" />
              <input
                type="text"
                value={query}
                onChange={(event) =>
                  startTransition(() => setQuery(event.target.value))
                }
                placeholder="Search by title, description, or technology"
                className="w-full bg-transparent outline-none placeholder:text-muted"
              />
            </label>
          </div>
        </div>
      </section>

      <section className="section-shell pb-24">
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2">
            <LoadingSkeleton className="h-[380px] w-full" />
            <LoadingSkeleton className="h-[380px] w-full" />
            <LoadingSkeleton className="h-[380px] w-full" />
            <LoadingSkeleton className="h-[380px] w-full" />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id || project.title}
                className="glass-card rounded-[2rem] p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: index * 0.05 }}
              >
                <div className="rounded-[1.7rem] border border-border/15 bg-gradient-to-br from-accent/15 via-white/5 to-secondary/10 p-6">
                  <p className="text-xs uppercase tracking-[0.28em] text-muted">
                    Featured Case
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-semibold">
                    {project.title}
                  </h3>
                  <p className="body-copy mt-4">{project.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span key={technology} className="pill">
                        {technology}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={project.github_link}
                      target="_blank"
                      rel="noreferrer"
                      className="button-secondary"
                    >
                      GitHub
                    </a>
                    <a
                      href={project.live_link}
                      target="_blank"
                      rel="noreferrer"
                      className="button-primary"
                    >
                      Live Demo
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      <Footer profile={profile} />
    </main>
  );
}


export default ProjectsPage;
