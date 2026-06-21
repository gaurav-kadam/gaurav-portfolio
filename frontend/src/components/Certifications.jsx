import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  HiAcademicCap,
  HiArrowDownTray,
  HiArrowTopRightOnSquare,
  HiDocumentText,
  HiSparkles,
  HiXMark,
} from "react-icons/hi2";

import { certificationsData } from "../services/api";
import useScrollAnimation from "../hooks/useScrollAnimation";
import SectionHeading from "./SectionHeading";
import { fadeInUp, staggerContainer } from "../animations/scrollAnimations";


function Certifications() {
  const { ref, isInView } = useScrollAnimation();
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [previewError, setPreviewError] = useState(false);
  const closeButtonRef = useRef(null);
  const triggerButtonRef = useRef(null);

  useEffect(() => {
    if (!selectedCertificate) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedCertificate(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    window.setTimeout(() => closeButtonRef.current?.focus(), 100);

    let cancelled = false;

    if (selectedCertificate.filePath) {
      fetch(selectedCertificate.filePath, { method: "HEAD" })
        .then((response) => {
          if (!cancelled && !response.ok) {
            setPreviewError(true);
          }
        })
        .catch(() => {
          if (!cancelled) {
            setPreviewError(true);
          }
        });
    }

    return () => {
      cancelled = true;
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCertificate]);

  const openCertificate = (certification, triggerButton) => {
    triggerButtonRef.current = triggerButton;
    setPreviewError(!certification.filePath);
    setSelectedCertificate(certification);
  };

  const closeCertificate = () => {
    setSelectedCertificate(null);
    window.setTimeout(() => triggerButtonRef.current?.focus(), 0);
  };

  return (
    <section
      id="certifications"
      data-section="certifications"
      ref={ref}
      className="py-24"
    >
      <motion.div
        className="section-shell"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <SectionHeading
          eyebrow={certificationsData.eyebrow}
          title={certificationsData.title}
          description={certificationsData.description}
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {certificationsData.items.map((certification, index) => (
            <motion.button
              type="button"
              key={`${certification.issuer}-${certification.title}`}
              className="glass-card group relative overflow-hidden rounded-[2rem] p-6 text-left outline-none transition focus-visible:ring-2 focus-visible:ring-accent/70"
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 150, damping: 18 }}
              onClick={(event) => openCertificate(certification, event.currentTarget)}
              aria-label={`View certificate: ${certification.title}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/12 via-white/5 to-secondary/10 opacity-80" />
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border/20 bg-white/10 text-xl text-accent">
                    {index === 0 ? <HiSparkles /> : <HiAcademicCap />}
                  </span>
                  <span className="pill">{certification.issuer}</span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold">
                  {certification.title}
                </h3>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-accent">
                    Click to View
                  </span>
                  <HiDocumentText className="text-2xl text-accent" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedCertificate ? (
          <CertificateModal
            certificate={selectedCertificate}
            previewError={previewError}
            onPreviewError={() => setPreviewError(true)}
            onClose={closeCertificate}
            closeButtonRef={closeButtonRef}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}


function CertificateModal({
  certificate,
  previewError,
  onPreviewError,
  onClose,
  closeButtonRef,
}) {
  const hasFile = Boolean(certificate.filePath);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/75 px-4 py-6 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-modal-title"
      onMouseDown={onClose}
    >
      <motion.div
        className="glass-card flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem]"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 170, damping: 20 }}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex flex-col gap-4 border-b border-border/15 p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6">
          <div>
            <p className="section-kicker">{certificate.issuer}</p>
            <h3
              id="certificate-modal-title"
              className="mt-3 font-display text-2xl font-semibold sm:text-3xl"
            >
              {certificate.title}
            </h3>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border/20 bg-white/5 text-xl transition hover:border-accent/50 hover:bg-white/10"
            onClick={onClose}
            aria-label="Close certificate preview"
          >
            <HiXMark />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden p-4 sm:p-6">
          {hasFile && !previewError ? (
            <iframe
              src={`${certificate.filePath}#view=FitH`}
              title={`${certificate.title} certificate preview`}
              className="h-[64vh] min-h-[420px] w-full rounded-[1.5rem] border border-border/20 bg-white"
              aria-label={`${certificate.title} PDF certificate preview`}
              onError={onPreviewError}
            />
          ) : (
            <div className="flex h-[64vh] min-h-[420px] flex-col items-center justify-center rounded-[1.5rem] border border-border/20 bg-white/5 px-6 text-center">
              <HiDocumentText className="text-5xl text-accent" />
              <p className="mt-5 font-display text-2xl font-semibold">
                Certificate preview is unavailable.
              </p>
              <p className="body-copy mt-3 max-w-xl">
                The certificate file could not be loaded. You can still try
                opening it in a new tab or downloading it if the file exists.
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 border-t border-border/15 p-5 sm:flex-row sm:items-center sm:justify-end sm:p-6">
          {hasFile ? (
            <>
              <a
                href={certificate.filePath}
                className="button-secondary"
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${certificate.title} certificate in a new tab`}
              >
                View Full Certificate
                <HiArrowTopRightOnSquare className="ml-2 text-base" />
              </a>
              <a
                href={certificate.filePath}
                className="button-secondary"
                download={certificate.downloadName || `${certificate.title}.pdf`}
                aria-label={`Download ${certificate.title} certificate`}
              >
                Download Certificate
                <HiArrowDownTray className="ml-2 text-base" />
              </a>
            </>
          ) : null}
          <button type="button" className="button-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}


export default Certifications;
