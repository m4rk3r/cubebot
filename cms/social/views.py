from rest_framework import viewsets
from models import InstagramLike, YoutubeLike
from serializers import InstagramSerializer, YoutubeSerializer


class InstagramViewSet(viewsets.ModelViewSet):
    queryset = InstagramLike.objects.published()
    serializer_class = InstagramSerializer


class YoutubeViewSet(viewsets.ModelViewSet):
    queryset = YoutubeLike.objects.published()
    serializer_class = YoutubeSerializer
