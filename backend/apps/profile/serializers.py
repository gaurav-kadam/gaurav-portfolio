from rest_framework import serializers

from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    profile_image = serializers.SerializerMethodField()
    resume_file = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            "id",
            "name",
            "title",
            "bio",
            "profile_image",
            "resume_file",
            "email",
            "github",
            "linkedin",
        ]

    def get_profile_image(self, obj):
        request = self.context.get("request")
        if obj.profile_image and request:
            return request.build_absolute_uri(obj.profile_image.url)
        return obj.profile_image.url if obj.profile_image else ""

    def get_resume_file(self, obj):
        request = self.context.get("request")
        if obj.resume_file and request:
            return request.build_absolute_uri(obj.resume_file.url)
        return obj.resume_file.url if obj.resume_file else ""
