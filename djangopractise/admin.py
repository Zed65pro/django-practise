from django.contrib import admin
from .models import Book, Publisher, Genre


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
