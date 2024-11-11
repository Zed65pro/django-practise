from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models


class Publisher(models.Model):
    name = models.CharField(max_length=100)
    country = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.name} ({self.country})'


class Genre(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=100)
    publication_date = models.DateField()
    rating = models.FloatField(
        validators=[MinValueValidator(0), MaxValueValidator(5)]
    )
    genre = models.ManyToManyField(Genre, related_name='books')
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE, related_name='books')

    def __str__(self):
        return f'{self.title} by {self.author} ({self.publisher.name})'
