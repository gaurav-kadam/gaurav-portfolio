from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/profile/", include("apps.profile.urls")),
    path("api/projects/", include("apps.projects.urls")),
    path("api/skills/", include("apps.skills.urls")),
    path("api/contact/", include("apps.contact.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
