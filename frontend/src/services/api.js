import data from "../data.json";

export const fallbackProfile = data.profile;
export const fallbackProjects = data.projects;
export const fallbackSkills = data.skills;
export const navItems = data.navigation.items;
export const heroData = data.hero;
export const aboutData = data.about;
export const experienceData = data.experience;
export const projectsSectionData = data.projectsSection;
export const projectsPageData = data.projectsPage;
export const contactData = data.contact;
export const footerData = data.footer;

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
  // Contact form still uses backend if available, otherwise this is a stub.
  return {
    success: true,
    message: "Contact form submission is disabled in fallback mode.",
    payload,
  };
}
