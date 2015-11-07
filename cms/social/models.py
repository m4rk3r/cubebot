from django.db import models


class InstagramLikes(models.Model):
	url = models.URLField()
	caption = models.TextField(blank=True, null=True)
	user = models.CharField(max_length=255, blank=True, null=True)
	published = models.BooleanField(default=True)
	retreived = models.DateTimeField(auto_now_add=True)

	def __unicode__(self):
		return self.url


class YoutubeLikes(models.Model):
	url = models.URLField()
	description = models.TextField(blank=True, null=True)
	user = models.CharField(max_length=255, blank=True, null=True)
	published = models.BooleanField(default=True)
	retreived = models.DateTimeField(auto_now_add=True)

	def __unicode__(self):
		return self.url
