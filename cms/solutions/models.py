from django.db import models

from cms.managers import PublishedManager


def img_path(o, f):
	return 'solutions/%s' %  f


class Solution(models.Model):
	published = models.BooleanField(default=True)
	title = models.CharField(max_length=255, blank=True, null=True)
	description = models.TextField(max_length=255,blank=True,null=True)

	objects = PublishedManager()

	def __unicode__(self):
		return 'Solution: %s' % self.title


class SolutionMedia(models.Model):
	solution = models.ForeignKey(Solution, related_name='media')
	photo = models.ImageField(upload_to=img_path,blank=True,null=True)
	caption = models.CharField(max_length=255,blank=True,null=True)
	order = models.PositiveIntegerField(default=0)

	def __unicode__(self):
		return '%s %s' % (self.solution.title, self.id)