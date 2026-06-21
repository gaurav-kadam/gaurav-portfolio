import emailjs from "@emailjs/browser";

import data from "../data.json";

export const fallbackProfile = data.profile;
export const fallbackProjects = data.projects;
export const fallbackSkills = data.skills;
export const navItems = data.navigation.items;
export const heroData = data.hero;
export const aboutData = data.about;
export const experienceData = data.experience;
export const certificationsData = data.certifications;
export const projectsSectionData = data.projectsSection;
export const projectsPageData = data.projectsPage;
export const contactData = data.contact;
export const footerData = data.footer;
export const resumeData = {
  file: data.profile.resume_file,
  title: "Gaurav Ravindra Kadam Resume",
  viewerPath: "/resume",
  downloadName: "Gaurav_Ravindra_Kadam_Resume.pdf",
  highlights: [
    "Software Developer Intern",
    "Backend Developer OJT",
    "Django REST Framework",
    "React.js",
    "PostgreSQL",
    "AWS",
    "Full Stack Development",
  ],
};

export async function fetchProfile() {
  return data.profile;
}

export async function fetchProjects() {
  return data.projects;
}

export async function fetchSkills() {
  return data.skills;
}

export async function submitContactMessage(payload) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error("EmailJS configuration is missing.");
  }

  await emailjs.send(
    serviceId,
    templateId,
    {
      from_name: payload.name,
      from_email: payload.email,
      subject: payload.subject,
      message: payload.message,
    },
    {
      publicKey,
    },
  );

  return {
    success: true,
    message: "Thank you for reaching out. Your message has been sent successfully.",
  };
}
