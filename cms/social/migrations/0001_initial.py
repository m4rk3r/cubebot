# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='InstagramLike',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('url', models.URLField()),
                ('photo', models.URLField()),
                ('insta_id', models.CharField(max_length=100, null=True, blank=True)),
                ('caption', models.TextField(null=True, blank=True)),
                ('user', models.CharField(max_length=255, null=True, blank=True)),
                ('published', models.BooleanField(default=True)),
                ('retreived', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='YoutubeLike',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('yt_id', models.CharField(max_length=11)),
                ('description', models.TextField(null=True, blank=True)),
                ('title', models.CharField(max_length=255, null=True, blank=True)),
                ('published', models.BooleanField(default=True)),
                ('retreived', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
