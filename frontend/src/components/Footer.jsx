import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { footerData } from "../services/api";


function Footer({ profile }) {
  return (
    <footer className="border-t border-border/10 py-8">
      <div className="section-shell flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-2xl font-semibold">
            {profile?.name || "Gaurav Ravindra Kadam"}
          </p>
          <p className="mt-2 text-sm text-muted">
            {footerData.copyright}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={profile?.github || "https://github.com/Gaurav Kadam"}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/20 bg-white/5"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href={profile?.linkedin || "https://www.linkedin.com/in/gaurav-kadam6026-286b37283/"}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/20 bg-white/5"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
          <a
            href={footerData.twitter}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/20 bg-white/5"
            aria-label="Twitter"
          >
            <FaXTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
}


export default Footer;
