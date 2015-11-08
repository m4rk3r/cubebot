from rest_framework import viewsets
from models import Solution
from serializers import SolutionSerializer


class SolutionViewSet(viewsets.ModelViewSet):
    queryset = Solution.objects.published()
    serializer_class = SolutionSerializer