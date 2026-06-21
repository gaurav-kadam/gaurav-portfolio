import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiBriefcase, HiEnvelope, HiLink, HiPaperAirplane } from "react-icons/hi2";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";

import { contactData, submitContactMessage } from "../services/api";
import useScrollAnimation from "../hooks/useScrollAnimation";
import SectionHeading from "./SectionHeading";
import { fadeInUp, staggerContainer } from "../animations/scrollAnimations";


const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};


const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


function Contact({ profile }) {
  const { ref, isInView } = useScrollAnimation();
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => ({ ...current, [name]: "" }));
    setStatus({ type: "", message: "" });
  };

  const validateForm = () => {
    const errors = {};
    const trimmedForm = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    if (!trimmedForm.name) {
      errors.name = "Please enter your name.";
    }

    if (!trimmedForm.email) {
      errors.email = "Please enter your email address.";
    } else if (!emailPattern.test(trimmedForm.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!trimmedForm.subject) {
      errors.subject = "Please enter a subject.";
    }

    if (!trimmedForm.message) {
      errors.message = "Please enter your message.";
    }

    setFieldErrors(errors);

    return {
      isValid: Object.keys(errors).length === 0,
      values: trimmedForm,
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validation = validateForm();

    if (!validation.isValid) {
      setStatus({
        type: "error",
        message: "Please check the highlighted fields and try again.",
      });
      return;
    }

    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await submitContactMessage(validation.values);
      setStatus({ type: "success", message: response.message });
      setFormData(initialForm);
      setFieldErrors({});
    } catch (error) {
      console.error(error);
      setStatus({
        type: "error",
        message: "Unable to send your message at the moment. Please try again later.",
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
            eyebrow={contactData.eyebrow}
            title={contactData.title}
            description={contactData.description}
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {contactData.availability.map((item) => (
              <div
                key={item}
                className="glass-card flex items-center gap-3 rounded-[1.5rem] p-4"
              >
                <HiBriefcase className="shrink-0 text-xl text-accent" />
                <span className="text-sm font-medium text-foreground/90">
                  {item}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-8 space-y-4">
            {contactData.links.map((link) => {
              const href =
                link.type === "email"
                  ? `mailto:${profile.email}`
                  : link.type === "github"
                  ? profile.github
                  : profile.linkedin;

              return (
                <a
                  key={link.label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${link.label} contact option`}
                  className="glass-card flex items-center gap-4 rounded-[1.75rem] p-5"
                >
                  {link.type === "email" ? (
                    <HiEnvelope className="text-2xl text-accent" />
                  ) : link.type === "github" ? (
                    <FaGithub className="text-2xl text-accent" />
                  ) : (
                    <FaLinkedinIn className="text-2xl text-accent" />
                  )}
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-muted">
                      {link.label}
                    </p>
                    <p className="mt-2">{link.description}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          className="glass-card rounded-[2.2rem] p-6 sm:p-8"
          variants={fadeInUp}
        >
          <form className="grid gap-5" onSubmit={handleSubmit} noValidate>
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
                  aria-label={field.label}
                  aria-invalid={Boolean(fieldErrors[field.name])}
                  aria-describedby={
                    fieldErrors[field.name] ? `${field.name}-error` : undefined
                  }
                  required
                  name={field.name}
                  type={field.type}
                  value={formData[field.name]}
                  onChange={handleChange}
                  disabled={submitting}
                  className={`rounded-[1.35rem] border bg-white/5 px-4 py-3 outline-none transition focus:border-accent/50 disabled:cursor-not-allowed disabled:opacity-70 ${
                    fieldErrors[field.name] ? "border-rose-500/50" : "border-border/20"
                  }`}
                />
                {fieldErrors[field.name] ? (
                  <span
                    id={`${field.name}-error`}
                    className="text-sm text-rose-200"
                  >
                    {fieldErrors[field.name]}
                  </span>
                ) : null}
              </label>
            ))}
            <label className="grid gap-2 text-sm">
              <span className="uppercase tracking-[0.22em] text-muted">Message</span>
              <textarea
                aria-label="Message"
                aria-invalid={Boolean(fieldErrors.message)}
                aria-describedby={fieldErrors.message ? "message-error" : undefined}
                required
                rows="6"
                name="message"
                value={formData.message}
                onChange={handleChange}
                disabled={submitting}
                className={`rounded-[1.35rem] border bg-white/5 px-4 py-3 outline-none transition focus:border-accent/50 disabled:cursor-not-allowed disabled:opacity-70 ${
                  fieldErrors.message ? "border-rose-500/50" : "border-border/20"
                }`}
              />
              {fieldErrors.message ? (
                <span id="message-error" className="text-sm text-rose-200">
                  {fieldErrors.message}
                </span>
              ) : null}
            </label>
            <button
              type="submit"
              className="button-primary mt-2 disabled:cursor-not-allowed disabled:opacity-75"
              disabled={submitting}
              aria-label={submitting ? "Sending message" : "Send message"}
            >
              {submitting ? (
                <span
                  className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950"
                  aria-hidden="true"
                />
              ) : null}
              {submitting ? "Sending..." : "Send Message"}
              {!submitting ? <HiPaperAirplane className="ml-2 text-base" /> : null}
            </button>
            <AnimatePresence mode="wait">
              {status.message ? (
                <motion.div
                  key={status.message}
                  role="status"
                  aria-live="polite"
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
