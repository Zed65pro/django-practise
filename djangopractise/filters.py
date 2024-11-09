import django_filters
from .models import Book


class BookFilter(django_filters.FilterSet):
    min_publication_date = django_filters.DateFilter(field_name="publication_date", lookup_expr='gte')
    max_publication_date = django_filters.DateFilter(field_name="publication_date", lookup_expr='lte')
    genre = django_filters.CharFilter(field_name="genre__name", lookup_expr='icontains')

    class Meta:
        model = Book
        fields = ['genre', 'publisher', 'min_publication_date', 'max_publication_date']
