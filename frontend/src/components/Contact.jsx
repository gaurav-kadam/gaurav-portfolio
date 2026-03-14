import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiEnvelope, HiLink, HiPaperAirplane } from "react-icons/hi2";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";

import { submitContactMessage } from "../services/api";
import useScrollAnimation from "../hooks/useScrollAnimation";
import SectionHeading from "./SectionHeading";
import { fadeInUp, staggerContainer } from "../animations/scrollAnimations";


const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};


function Contact({ profile }) {
  const { ref, isInView } = useScrollAnimation();
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await submitContactMessage(formData);
      setStatus({ type: "success", message: response.message });
      setFormData(initialForm);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.response?.data?.detail || "Unable to send your message right now.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" data-section="contact" ref={ref} className="py-24">
      <motion.div
        className="section-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div variants={fadeInUp}>
          <SectionHeading
            eyebrow="Contact"
            title="Let’s build something modern, scalable, and memorable."
            description="Reach out for full stack opportunities, product collaboration, or engineering work that needs both strong architecture and refined UI execution."
          />
          <div className="mt-8 space-y-4">
            <a
              href={`mailto:${profile.email}`}
              className="glass-card flex items-center gap-4 rounded-[1.75rem] p-5"
            >
              <HiEnvelope className="text-2xl text-accent" />
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-muted">Email</p>
                <p className="mt-2">{profile.email}</p>
              </div>
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="glass-card flex items-center gap-4 rounded-[1.75rem] p-5"
            >
              <FaGithub className="text-2xl text-accent" />
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-muted">GitHub</p>
                <p className="mt-2">Open source work and repositories</p>
              </div>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="glass-card flex items-center gap-4 rounded-[1.75rem] p-5"
            >
              <FaLinkedinIn className="text-2xl text-accent" />
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-muted">LinkedIn</p>
                <p className="mt-2">Professional experience and networking</p>
              </div>
            </a>
          </div>
        </motion.div>

        <motion.div
          className="glass-card rounded-[2.2rem] p-6 sm:p-8"
          variants={fadeInUp}
        >
          <form className="grid gap-5" onSubmit={handleSubmit}>
            {[
              { name: "name", label: "Name", type: "text" },
              { name: "email", label: "Email", type: "email" },
              { name: "subject", label: "Subject", type: "text" },
            ].map((field) => (
              <label key={field.name} className="grid gap-2 text-sm">
                <span className="uppercase tracking-[0.22em] text-muted">
                  {field.label}
                </span>
                <input
                  required
                  name={field.name}
                  type={field.type}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="rounded-[1.35rem] border border-border/20 bg-white/5 px-4 py-3 outline-none transition focus:border-accent/50"
                />
              </label>
            ))}
            <label className="grid gap-2 text-sm">
              <span className="uppercase tracking-[0.22em] text-muted">Message</span>
              <textarea
                required
                rows="6"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="rounded-[1.35rem] border border-border/20 bg-white/5 px-4 py-3 outline-none transition focus:border-accent/50"
              />
            </label>
            <button type="submit" className="button-primary mt-2" disabled={submitting}>
              {submitting ? "Sending..." : "Send Message"}
              <HiPaperAirplane className="ml-2 text-base" />
            </button>
            <AnimatePresence mode="wait">
              {status.message ? (
                <motion.div
                  key={status.message}
                  className={`rounded-[1.35rem] border px-4 py-3 text-sm ${
                    status.type === "success"
                      ? "border-secondary/30 bg-secondary/10 text-foreground"
                      : "border-rose-500/30 bg-rose-500/10 text-foreground"
                  }`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                >
                  <div className="flex items-center gap-3">
                    <HiLink className="text-base" />
                    <span>{status.message}</span>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
}


export default Contact;
