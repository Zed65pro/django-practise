from django import forms
from .models import Book, Genre


class BookForm(forms.ModelForm):
    genre = forms.ModelMultipleChoiceField(
        queryset=Genre.objects.all(),
        widget=forms.CheckboxSelectMultiple,
        required=True,
        label="Genres"
    )

    class Meta:
        model = Book
        fields = ['title', 'author', 'publication_date', 'rating', 'genre', 'publisher']
        widgets = {
            'publication_date': forms.DateInput(attrs={'type': 'date'}),
        }
