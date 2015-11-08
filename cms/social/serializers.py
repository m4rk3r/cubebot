from rest_framework import serializers

from social.models import InstagramLike, YoutubeLike


class InstagramSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstagramLike
        fields = ('url', 'photo', 'caption', 'user')


class YoutubeSerializer(serializers.ModelSerializer):
    class Meta:
        model = YoutubeLike
        fields = ('yt_id', 'description', 'title')