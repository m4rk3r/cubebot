from django.core.management.base import BaseCommand, CommandError
from social.models import InstagramLike, YoutubeLike
from django.conf import settings

from instagram.client import InstagramAPI
import requests


def insta_auth():
    pass


class Command(BaseCommand):
    help = 'restock liked items from social accounts'

    def handle(self, *args, **options):
        
        self.stdout.write('Getting Youtube!')
        # get youtube vids
        videos = requests.get(
            settings.YT_URL.format(
                id=settings.YT_PLAYLIST,
                key=settings.YT_ACCESS_TOKEN,
            )
        ).json()

        for vid in videos['items']:
            yt_id = vid['snippet']['resourceId']['videoId']
            yt_desc = vid['snippet']['description']
            yt_title = vid['snippet']['title']

            v,c = YoutubeLike.objects.get_or_create(yt_id=yt_id)

            if c:
                v.description = yt_desc
                v.title = yt_title
                v.save()

        self.stdout.write('Getting Instagram!')
        # get insta likes
        api = InstagramAPI(access_token=settings.INSTA_ACCESS_TOKEN,
            client_secret=settings.INSTA_ACCESS_SECRET)

        _id = InstagramLike.objects.all().last()
        print _id.insta_id
        items = (api.user_liked_media(max_id=_id.insta_id) if _id else 
            api.user_liked_media())

        for item in items[0]:
            ig_pk = item.id
            ig_desc = item.caption.text if item.caption else ''
            ig_user = item.user.username
            ig_image = item.images['standard_resolution'].url
            ig_link = item.link

            ig,c = InstagramLike.objects.get_or_create(insta_id=ig_pk)

            if c:
                ig.caption = ig_desc
                ig.user = ig_user
                ig.url = ig_link
                ig.photo = ig_image
                ig.save()

        self.stdout.write('All set!')