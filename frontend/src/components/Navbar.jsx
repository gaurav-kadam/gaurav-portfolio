import { useEffect, useEffectEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { HiBars3, HiMiniMoon, HiMiniSun, HiXMark } from "react-icons/hi2";
import { navItems } from "../services/api";



function Navbar({ activeSection, darkMode, onToggleTheme }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const syncScrollState = useEffectEvent(() => {
    setScrolled(window.scrollY > 24);
  });

  useEffect(() => {
    syncScrollState();
    window.addEventListener("scroll", syncScrollState);
    return () => window.removeEventListener("scroll", syncScrollState);
  }, []);

  const focusContactForm = (attempt = 0) => {
    window.setTimeout(() => {
      const contactSection = document.getElementById("contact");
      const firstField = contactSection?.querySelector("input, textarea, button");

      if (!contactSection && attempt < 12) {
        focusContactForm(attempt + 1);
        return;
      }

      contactSection?.scrollIntoView({ behavior: "smooth", block: "start" });
      firstField?.focus({ preventScroll: true });
    }, 120);
  };

  const handleHireMe = () => {
    setOpen(false);

    if (location.pathname !== "/") {
      navigate("/#contact");
      focusContactForm();
      return;
    }

    focusContactForm();
  };

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-4 sm:px-6">
      <motion.nav
        className={`section-shell flex items-center justify-between rounded-full border px-4 py-3 transition-all duration-300 sm:px-6 ${
          scrolled
            ? "border-border/20 bg-surface/75 shadow-card backdrop-blur-2xl"
            : "border-transparent bg-transparent"
        }`}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Link to="/" className="font-display text-xl font-bold tracking-[0.18em]">
          Gaurav
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => {
            const isActive =
              location.pathname === "/projects"
                ? item.id === "projects"
                : activeSection === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                className="group relative rounded-full px-4 py-2 text-sm font-medium text-foreground/85 transition hover:text-foreground"
              >
                {item.label}
                <span
                  className={`absolute inset-x-4 bottom-1 h-px origin-left bg-gradient-to-r from-accent to-secondary transition-transform duration-300 ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="button-primary hidden px-5 py-2.5 lg:inline-flex"
            onClick={handleHireMe}
            aria-label="Hire me and jump to the contact section"
          >
            Hire Me
          </button>
          <button
            type="button"
            aria-label="Toggle dark mode"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/20 bg-white/5 text-lg"
            onClick={onToggleTheme}
          >
            {darkMode ? <HiMiniSun /> : <HiMiniMoon />}
          </button>
          <button
            type="button"
            aria-label="Toggle navigation"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/20 bg-white/5 text-xl lg:hidden"
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <HiXMark /> : <HiBars3 />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="section-shell lg:hidden"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
          >
            <div className="glass-card mt-3 rounded-[2rem] p-4">
              <div className="grid gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    className="rounded-2xl px-4 py-3 text-sm font-medium text-foreground/85 transition hover:bg-white/5 hover:text-foreground"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <button
                  type="button"
                  className="button-primary mt-2 w-full"
                  onClick={handleHireMe}
                  aria-label="Hire me and jump to the contact section"
                >
                  Hire Me
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}


export default Navbar;
