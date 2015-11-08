from rest_framework import serializers

from solutions.models import Solution, SolutionMedia


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SolutionMedia
        fields = ('photo', 'caption', )
        ordering = ['order',]


class SolutionSerializer(serializers.ModelSerializer):
	media = MediaSerializer(many=True)

	class Meta:
		model = Solution
		fields = ('title', 'description', 'media')
