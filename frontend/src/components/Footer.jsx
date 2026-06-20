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
          {profile?.github ? (
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/20 bg-white/5"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
          ) : null}
          {profile?.linkedin ? (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/20 bg-white/5"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          ) : null}
          {footerData.twitter ? (
            <a
              href={footerData.twitter}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/20 bg-white/5"
              aria-label="Twitter"
            >
              <FaXTwitter />
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  );
}


export default Footer;
