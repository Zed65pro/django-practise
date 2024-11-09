from django.urls import path
from .views import BookListView, BookDetailView, BookUpdateView, PublisherListView, GenreListView

urlpatterns = [
    path('books/', BookListView.as_view(), name='book-list'),
    path('books/<int:pk>/', BookDetailView.as_view(), name='book-detail'),
    path('books/<int:pk>/update/', BookUpdateView.as_view(), name='book-update'),
    path('publishers/', PublisherListView.as_view(), name='publisher-list'),
    path('genres/', GenreListView.as_view(), name='genre-list'),
]
