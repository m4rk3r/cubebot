from django.db import models


def img_path(o, f):
	return 'solutions/%s/%s' % (o.id, f)


class Solution(models.Model):
	published = models.BooleanField(default=True)
	description = models.TextField(max_length=255,blank=True,null=True)


class Media(models.Model):
	solution = models.ForeignKey(Solution, related_name='media')
	photo = models.ImageField(upload_to=img_path,blank=True,null=True)
	order = models.PositiveIntegerField(default=0)