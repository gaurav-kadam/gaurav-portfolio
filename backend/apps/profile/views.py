from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Profile
from .serializers import ProfileSerializer


class ProfileDetailView(APIView):
    def get(self, request):
        profile = Profile.objects.first()
        if not profile:
            return Response(
                {"detail": "Profile not found. Run `python manage.py seed_portfolio`."},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = ProfileSerializer(profile, context={"request": request})
        return Response(serializer.data)
