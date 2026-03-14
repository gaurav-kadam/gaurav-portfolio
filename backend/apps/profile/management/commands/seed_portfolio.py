from django.core.management.base import BaseCommand

from apps.profile.models import Profile
from apps.projects.models import Project
from apps.skills.models import Skill


PROFILE_DATA = {
    "name": "Gaurav Ravindra Kadam",
    "title": "Full Stack Developer",
    "bio": (
        "Gaurav Ravindra Kadam is a passionate full stack developer focused on "
        "building scalable backend systems and modern responsive web applications."
    ),
    "email": "gauravkadam.dev@gmail.com",
    "github": "https://github.com/gauravkadam",
    "linkedin": "https://www.linkedin.com/in/gauravkadam",
}

PROJECTS_DATA = [
    {
        "title": "Portfolio Website",
        "description": (
            "A premium full stack developer portfolio with immersive animation, "
            "content-driven CMS APIs, and modern responsive storytelling."
        ),
        "technologies": ["React", "Tailwind CSS", "Framer Motion", "Django REST"],
        "github_link": "https://github.com/gauravkadam/portfolio",
        "live_link": "https://gaurav-portfolio.example.com",
    },
    {
        "title": "E-Commerce Platform",
        "description": (
            "A scalable commerce experience with product discovery, checkout flows, "
            "and an admin-first backend architecture."
        ),
        "technologies": ["React", "Django", "PostgreSQL", "Stripe"],
        "github_link": "https://github.com/gauravkadam/ecommerce-platform",
        "live_link": "https://ecommerce.example.com",
    },
    {
        "title": "Student Management System",
        "description": (
            "An operations dashboard for student lifecycle management, reporting, "
            "attendance tracking, and role-based workflows."
        ),
        "technologies": ["React", "Django REST", "PostgreSQL", "Chart.js"],
        "github_link": "https://github.com/gauravkadam/student-management-system",
        "live_link": "https://student-hub.example.com",
    },
    {
        "title": "REST API Backend System",
        "description": (
            "A cleanly layered API service with JWT authentication, modular services, "
            "and observability-ready patterns for production workloads."
        ),
        "technologies": ["Django REST", "Docker", "PostgreSQL", "AWS"],
        "github_link": "https://github.com/gauravkadam/rest-api-backend",
        "live_link": "https://api-suite.example.com",
    },
]

SKILLS_DATA = [
    ("Frontend", "HTML", 95),
    ("Frontend", "CSS", 92),
    ("Frontend", "JavaScript", 93),
    ("Frontend", "React", 94),
    ("Frontend", "Tailwind", 90),
    ("Backend", "Django", 95),
    ("Backend", "Node.js", 82),
    ("Backend", "REST APIs", 94),
    ("Database", "PostgreSQL", 90),
    ("Database", "MySQL", 84),
    ("Tools", "Git", 93),
    ("Tools", "GitHub", 92),
    ("Tools", "AWS", 78),
    ("Tools", "Docker", 85),
]


class Command(BaseCommand):
    help = "Seeds the portfolio database with profile, projects, and skills."

    def handle(self, *args, **options):
        Profile.objects.update_or_create(id=1, defaults=PROFILE_DATA)

        for project_data in PROJECTS_DATA:
            Project.objects.update_or_create(
                title=project_data["title"],
                defaults=project_data,
            )

        for category, name, proficiency in SKILLS_DATA:
            Skill.objects.update_or_create(
                category=category,
                name=name,
                defaults={"proficiency": proficiency},
            )

        self.stdout.write(self.style.SUCCESS("Portfolio data seeded successfully."))
