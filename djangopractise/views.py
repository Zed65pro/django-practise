from django.db.models import Prefetch, Count
from rest_framework import generics
from .models import Book, Genre, Publisher
from .serializers import BookSerializer, PublisherSerializer, GenreSerializer
from .filters import BookFilter


class BookListView(generics.ListAPIView):
    queryset = Book.objects.select_related('publisher').prefetch_related('genre')
    serializer_class = BookSerializer
    filterset_class = BookFilter
    search_fields = ['title', 'author']
    ordering_fields = ['title', 'publication_date', 'rating']
    ordering = ['title']


class BookDetailView(generics.RetrieveAPIView):
    queryset = Book.objects.select_related('publisher').prefetch_related('genre')
    serializer_class = BookSerializer
    lookup_field = 'pk'


class PublisherListView(generics.ListAPIView):
    queryset = Publisher.objects.annotate(num_books=Count('books'))
    serializer_class = PublisherSerializer
    search_fields = ['name', 'country']


class GenreListView(generics.ListAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    search_fields = ['name']


class BookUpdateView(generics.UpdateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    lookup_field = 'pk'
