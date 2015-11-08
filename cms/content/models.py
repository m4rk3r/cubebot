from django.db import models

from cms.managers import PublishedManager


def img_path(o, f):
	return 'photography/%s' % f


class FlexibleContent(models.Model):
	""" raw html feed for non-fixed face display
	"""
	html = models.TextField(blank=True, null=True)
	featured = models.BooleanField(default=True, 
		help_text='Check to display, will uncheck currently selected item.')

	def __unicode__(self):
		return 'Flex Content %s' % self.id


class CaptionedPhotography(models.Model):
	published = models.BooleanField(default=True)
	photo = models.ImageField(upload_to=img_path, blank=True, null=True)
	caption = models.CharField(max_length=500, blank=True, null=True)

	objects = PublishedManager()

	def __unicode__(self):
		return 'Photo item %s' % self.id