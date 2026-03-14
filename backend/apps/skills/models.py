from django.db import models


class Skill(models.Model):
    FRONTEND = "Frontend"
    BACKEND = "Backend"
    DATABASE = "Database"
    TOOLS = "Tools"

    CATEGORY_CHOICES = [
        (FRONTEND, "Frontend"),
        (BACKEND, "Backend"),
        (DATABASE, "Database"),
        (TOOLS, "Tools"),
    ]

    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    name = models.CharField(max_length=100)
    proficiency = models.PositiveSmallIntegerField(default=80)

    class Meta:
        ordering = ["category", "id"]

    def __str__(self) -> str:
        return f"{self.category} - {self.name}"
