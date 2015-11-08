from rest_framework import viewsets

from models import FlexibleContent, CaptionedPhotography
from serializers import FlexibleContentSerializer, CaptionedPhotographySerializer


class FlexibleContentViewSet(viewsets.ModelViewSet):
    queryset = FlexibleContent.objects.all()
    serializer_class = FlexibleContentSerializer


class CaptionedPhotographyViewSet(viewsets.ModelViewSet):
    queryset = CaptionedPhotography.objects.published()
    serializer_class = CaptionedPhotographySerializer
