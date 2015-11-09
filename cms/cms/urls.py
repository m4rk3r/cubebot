from django.conf.urls import include, url
from django.contrib import admin
from rest_framework import routers

from content.views import FlexibleContentViewSet, CaptionedPhotographyViewSet
from social.views import InstagramViewSet, YoutubeViewSet
from solutions.views import SolutionViewSet


router = routers.DefaultRouter()
router.register(r'instagram', InstagramViewSet)
router.register(r'youtube', YoutubeViewSet)
router.register(r'solutions',SolutionViewSet)
router.register(r'flex-content',FlexibleContentViewSet)
router.register(r'photography',CaptionedPhotographyViewSet)


urlpatterns = [
	url(r'^api/', include(router.urls)),
	url(r'^admin/', include(admin.site.urls)),
]