import { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import BackToTop from "./components/BackToTop";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import { fadeInUp } from "./animations/scrollAnimations";


const Home = lazy(() => import("./pages/Home"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));


function App() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("home");
  const [darkMode, setDarkMode] = useState(() => {
    const storedTheme = window.localStorage.getItem("portfolio-theme");
    return storedTheme ? storedTheme === "dark" : true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    window.localStorage.setItem("portfolio-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <ScrollProgress />
      <Navbar
        activeSection={location.pathname === "/projects" ? "projects" : activeSection}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode((current) => !current)}
      />
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader key={location.pathname} />}>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <Home
                  activeSection={activeSection}
                  onSectionChange={setActiveSection}
                />
              }
            />
            <Route
              path="/projects"
              element={<ProjectsPage onSectionChange={setActiveSection} />}
            />
          </Routes>
        </Suspense>
      </AnimatePresence>
      <BackToTop />
    </div>
  );
}


function PageLoader() {
  return (
    <motion.div
      className="flex min-h-screen items-center justify-center"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={fadeInUp}
    >
      <div className="glass-card flex items-center gap-4 rounded-full px-6 py-4">
        <div className="h-3 w-3 animate-pulse rounded-full bg-accent" />
        <p className="text-sm uppercase tracking-[0.35em] text-muted">
          Loading experience
        </p>
      </div>
    </motion.div>
  );
}


export default App;
