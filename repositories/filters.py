from django_filters import rest_framework as filters

from .models import Commit

class ComitsFilter(filters.FilterSet):
    repo = filters.CharFilter(field_name='repository__name', lookup_expr='iexact')
    datetime = filters.DateTimeFromToRangeFilter(field_name="date")

    class Meta:
        model = Commit
        fields = ['repo', 'datetime']