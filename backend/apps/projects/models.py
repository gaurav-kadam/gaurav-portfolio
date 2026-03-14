from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()
    technologies = models.JSONField(default=list, blank=True)
    github_link = models.URLField(blank=True)
    live_link = models.URLField(blank=True)
    image = models.ImageField(upload_to="projects/", blank=True, null=True)

    class Meta:
        ordering = ["id"]

    def __str__(self) -> str:
        return self.title
