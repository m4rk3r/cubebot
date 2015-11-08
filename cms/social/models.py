from django.db import models


class InstagramLike(models.Model):
	url = models.URLField()
	photo = models.URLField()
	insta_id = models.CharField(max_length=100,blank=True,null=True)
	caption = models.TextField(blank=True, null=True)
	user = models.CharField(max_length=255, blank=True, null=True)
	published = models.BooleanField(default=True)
	retreived = models.DateTimeField(auto_now_add=True)

	def __unicode__(self):
		return self.url


class YoutubeLike(models.Model):
	yt_id = models.CharField(max_length=11)
	description = models.TextField(blank=True, null=True)
	title = models.CharField(max_length=255, blank=True, null=True)
	published = models.BooleanField(default=True)
	retreived = models.DateTimeField(auto_now_add=True)

	def __unicode__(self):
		return self.yt_id
