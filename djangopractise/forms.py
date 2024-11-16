from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Field, Column, Row
from django import forms
from django.forms import modelformset_factory

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


class NewBookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = ['title', 'author', 'publication_date', 'rating', 'genre', 'publisher']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_tag = False
        self.helper.layout = Layout(
            Row(
                Column(Field('title'), css_class='col-md-6'),
                Column(Field('author'), css_class='col-md-6'),
            ),
            Row(
                Column(Field('publication_date'), css_class='col-md-4'),
                Column(Field('rating'), css_class='col-md-4'),
                Column(Field('publisher'), css_class='col-md-4'),
            ),
            Row(
                Field('genre', css_class='form-select'),
            ),
        )


BookFormSet = modelformset_factory(
    Book,
    form=BookForm,
    can_delete=False,
    extra=1
)
