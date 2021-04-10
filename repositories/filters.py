from django_filters import rest_framework as filters

from .models import Commit

class ComitsFilter(filters.FilterSet):
    repo = filters.CharFilter(field_name='repository__name', lookup_expr='iexact')

    class Meta:
        model = Commit
        fields = ['repo', 'author']
