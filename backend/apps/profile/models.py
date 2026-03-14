from django.db import models


class Profile(models.Model):
    name = models.CharField(max_length=150)
    title = models.CharField(max_length=120)
    bio = models.TextField()
    profile_image = models.ImageField(upload_to="profile/", blank=True, null=True)
    resume_file = models.FileField(upload_to="resumes/", blank=True, null=True)
    email = models.EmailField()
    github = models.URLField()
    linkedin = models.URLField()

    class Meta:
        ordering = ["id"]

    def __str__(self) -> str:
        return self.name
