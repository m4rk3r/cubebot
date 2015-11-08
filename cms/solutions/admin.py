from django.contrib import admin
from models import *


class SolutionMediaInline(admin.StackedInline):
	model = SolutionMedia


class SolutionAdmin(admin.ModelAdmin):
	inlines = [SolutionMediaInline,]


admin.site.register(Solution, SolutionAdmin)
