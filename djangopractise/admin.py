from django.contrib import admin
from .models import Book, Publisher, Genre, SizedBook, GoodBook


@admin.register(Publisher)
class PublisherAdmin(admin.ModelAdmin):
    list_display = ('name', 'country')
    search_fields = ('name', 'country')


@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'publication_date', 'rating', 'publisher')
    list_filter = ('publisher', 'genre', 'publication_date')
    search_fields = ('title', 'author')
    ordering = ('title',)
    filter_horizontal = ('genre',)


@admin.register(SizedBook)
class SizedBookAdmin(BookAdmin):
    list_display = ('size',)
    search_fields = ('size',)


@admin.register(GoodBook)
class ProxyBookAdmin(BookAdmin):
    pass
