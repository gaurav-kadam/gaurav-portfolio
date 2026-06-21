import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiArrowDownTray,
  HiArrowLeft,
  HiDocumentText,
  HiPrinter,
  HiSparkles,
} from "react-icons/hi2";

import Footer from "../components/Footer";
import { fadeInUp, staggerContainer } from "../animations/scrollAnimations";
import { fallbackProfile, resumeData } from "../services/api";


function ResumePage({ onSectionChange }) {
  useEffect(() => {
    onSectionChange?.("resume");
  }, [onSectionChange]);

  const handlePrint = () => {
    const printWindow = window.open(resumeData.file, "_blank");

    if (!printWindow) {
      window.print();
      return;
    }

    printWindow.addEventListener("load", () => {
      printWindow.focus();
      printWindow.print();
    });
  };

  return (
    <main className="pt-32">
      <section className="section-shell pb-24">
        <motion.div
          className="grid gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="glass-card rounded-[2.5rem] p-6 sm:p-8"
            variants={fadeInUp}
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="pill">Resume</span>
                <h1 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                  Resume
                </h1>
                <p className="body-copy mt-4 max-w-2xl">
                  View, download, or print my latest professional resume.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/"
                  className="button-secondary"
                  aria-label="Back to portfolio home page"
                  onClick={() => onSectionChange?.("home")}
                >
                  <HiArrowLeft className="mr-2 text-base" />
                  Back to Portfolio
                </Link>
                <a
                  href={resumeData.file}
                  className="button-secondary"
                  download={resumeData.downloadName}
                  aria-label="Download resume document"
                >
                  <HiArrowDownTray className="mr-2 text-base" />
                  Download Resume
                </a>
                <button
                  type="button"
                  className="button-primary"
                  onClick={handlePrint}
                  aria-label="Print resume viewer page"
                >
                  <HiPrinter className="mr-2 text-base" />
                  Print Resume
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="glass-card rounded-[2.5rem] p-6 sm:p-8"
            variants={fadeInUp}
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/20 bg-white/5 text-xl text-accent">
                <HiSparkles />
              </span>
              <h2 className="font-display text-2xl font-semibold">Highlights</h2>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {resumeData.highlights.map((highlight) => (
                <span key={highlight} className="pill">
                  {highlight}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="glass-card resume-print-area overflow-hidden rounded-[2.5rem] p-4 sm:p-6"
            variants={fadeInUp}
          >
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/20 bg-white/5 text-xl text-accent">
                  <HiDocumentText />
                </span>
                <div>
                  <p className="font-display text-xl font-semibold">
                    Resume Preview
                  </p>
                  <p className="text-sm text-muted">
                    {resumeData.title}
                  </p>
                </div>
              </div>
              <span className="pill w-fit">PDF</span>
            </div>

            <div className="min-h-[72vh] overflow-hidden rounded-[1.75rem] border border-border/20 bg-white text-slate-950">
              <iframe
                src={`${resumeData.file}#view=FitH`}
                title={resumeData.title}
                className="h-[72vh] min-h-[560px] w-full"
                aria-label="Embedded PDF resume preview"
              />
            </div>
            <div className="mt-4 rounded-[1.5rem] border border-border/15 bg-white/5 p-4 text-sm text-muted">
              If the PDF preview is blocked by a browser setting, use Download
              Resume to open the file directly.
            </div>
          </motion.div>
        </motion.div>
      </section>

      <Footer profile={fallbackProfile} />
    </main>
  );
}


export default ResumePage;
