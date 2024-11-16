from django.urls import path
from .views import BookListView, BookDetailView, BookUpdateView, PublisherListView, GenreListView, BookView, \
    BookCreateView, BookFormsetCreateView

urlpatterns = [
    path('books/', BookListView.as_view(), name='book-list'),
    path('books/<int:pk>/', BookDetailView.as_view(), name='book-detail'),
    path('books/<int:pk>/update/', BookUpdateView.as_view(), name='book-update'),
    path('publishers/', PublisherListView.as_view(), name='publisher-list'),
    path('genres/', GenreListView.as_view(), name='genre-list'),
    path('view/books/', BookView.as_view(), name='books-view'),
    path('add/books/', BookCreateView.as_view(), name='add_book'),
    path('add/books/new/', BookFormsetCreateView.as_view(), name='add_book_new'),
]
