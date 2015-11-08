# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import content.models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CaptionedPhotography',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('published', models.BooleanField(default=True)),
                ('photo', models.ImageField(null=True, upload_to=content.models.img_path, blank=True)),
                ('caption', models.CharField(max_length=500, null=True, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='FlexibleContent',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('html', models.TextField(null=True, blank=True)),
                ('featured', models.BooleanField(default=True, help_text=b'Check to display, will uncheck currently selected item.')),
            ],
        ),
    ]
