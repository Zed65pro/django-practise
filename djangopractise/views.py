from django.contrib.messages.views import SuccessMessageMixin
from django.db.models import Prefetch, Count
from django.shortcuts import redirect, render
from django.urls import reverse_lazy
from django.views import View
from django.views.generic import ListView, CreateView, UpdateView
from rest_framework import generics

from .forms import BookForm, BookFormSet, NewBookForm
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
    queryset = Publisher.objects.all()
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


class BookView(ListView):
    template_name = 'books.html'
    model = Book
    context_object_name = 'books'
    paginate_by = 4


class BookCreateView(SuccessMessageMixin, CreateView):
    model = Book
    form_class = BookForm
    template_name = 'add_book.html'
    success_url = reverse_lazy('books-view')
    success_message = "Book '%(title)s' added successfully!"


class BookFormsetCreateView(SuccessMessageMixin, CreateView):
    form_class = NewBookForm
    template_name = 'new_book_form.html'
    success_url = reverse_lazy('books-view')
    success_message = "Book '%(title)s' added successfully!"
    model = Book
