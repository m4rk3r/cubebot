from rest_framework import serializers

from content.models import FlexibleContent, CaptionedPhotography


class FlexibleContentSerializer(serializers.ModelSerializer):

	class Meta:
		model = FlexibleContent
		fields = ('html', )


class CaptionedPhotographySerializer(serializers.ModelSerializer):
	
	class Meta:
		model = CaptionedPhotography
		fields = ('photo', 'caption')