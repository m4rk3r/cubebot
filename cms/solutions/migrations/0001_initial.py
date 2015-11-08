# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import solutions.models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Solution',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('published', models.BooleanField(default=True)),
                ('title', models.CharField(max_length=255, null=True, blank=True)),
                ('description', models.TextField(max_length=255, null=True, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='SolutionMedia',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('photo', models.ImageField(null=True, upload_to=solutions.models.img_path, blank=True)),
                ('caption', models.CharField(max_length=255, null=True, blank=True)),
                ('order', models.PositiveIntegerField(default=0)),
                ('solution', models.ForeignKey(related_name='media', to='solutions.Solution')),
            ],
        ),
    ]
