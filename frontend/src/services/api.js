import axios from "axios";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fallbackProfile = {
  name: "Gaurav Kadam",
  title: "Full Stack Developer",
  bio: "Gaurav Ravindra Kadam is a passionate full stack developer focused on building scalable backend systems and modern responsive web applications.",
  profile_image: "",
  resume_file: "",
  email: "gauravkadam6026@gmail.com",
  github: "https://github.com/gaurav-kadam",
  linkedin: "https://www.linkedin.com/in/gaurav-kadam-286b37283/",
};

export const fallbackProjects = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A premium portfolio experience blending elegant motion, glassmorphism UI, and a Django-powered content API.",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Django REST"],
    github_link: "https://github.com/gaurav-kadam/portfolio",
    live_link: "https://gaurav-portfolio.example.com",
    image: "",
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "A production-style commerce platform with fast storefront experiences, API-first architecture, and operational dashboards.",
    technologies: ["React", "Django", "PostgreSQL", "Stripe"],
    github_link: "https://github.com/gaurav-kadam/ecommerce-platform",
    live_link: "https://ecommerce.example.com",
    image: "",
  },
  {
    id: 3,
    title: "Student Management System",
    description: "A workflow-focused education management product that streamlines records, reporting, attendance, and communication.",
    technologies: ["React", "Django REST", "PostgreSQL", "Charts"],
    github_link: "https://github.com/gaurav-kadam/student-management-system",
    live_link: "https://student-hub.example.com",
    image: "",
  },
  {
    id: 4,
    title: "REST API Backend System",
    description: "A service-oriented backend foundation with modular endpoints, clean architecture, and deployment-ready practices.",
    technologies: ["Django REST", "Docker", "PostgreSQL", "AWS"],
    github_link: "https://github.com/gaurav-kadam/rest-api-backend",
    live_link: "https://api-suite.example.com",
    image: "",
  },
];

export const fallbackSkills = [
  { id: 1, category: "Frontend", name: "HTML", proficiency: 95 },
  { id: 2, category: "Frontend", name: "CSS", proficiency: 92 },
  { id: 3, category: "Frontend", name: "JavaScript", proficiency: 93 },
  { id: 4, category: "Frontend", name: "React", proficiency: 94 },
  { id: 5, category: "Frontend", name: "Tailwind", proficiency: 90 },
  { id: 6, category: "Backend", name: "Django", proficiency: 95 },
  { id: 7, category: "Backend", name: "Node.js", proficiency: 82 },
  { id: 8, category: "Backend", name: "REST APIs", proficiency: 94 },
  { id: 9, category: "Database", name: "PostgreSQL", proficiency: 90 },
  { id: 10, category: "Database", name: "MySQL", proficiency: 84 },
  { id: 11, category: "Tools", name: "Git", proficiency: 93 },
  { id: 12, category: "Tools", name: "GitHub", proficiency: 92 },
  { id: 13, category: "Tools", name: "AWS", proficiency: 78 },
  { id: 14, category: "Tools", name: "Docker", proficiency: 85 },
];

export async function fetchProfile() {
  const response = await api.get("/profile/");
  return response.data;
}

export async function fetchProjects() {
  const response = await api.get("/projects/");
  return response.data;
}

export async function fetchSkills() {
  const response = await api.get("/skills/");
  return response.data;
}

export async function submitContactMessage(payload) {
  const response = await api.post("/contact/", payload);
  return response.data;
}

export default api;
