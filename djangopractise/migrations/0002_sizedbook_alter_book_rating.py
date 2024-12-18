# Generated by Django 4.2.16 on 2024-11-17 08:15

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('djangopractise', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='SizedBook',
            fields=[
                ('book_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='djangopractise.book')),
                ('size', models.PositiveIntegerField()),
            ],
            bases=('djangopractise.book',),
        ),
        migrations.AlterField(
            model_name='book',
            name='rating',
            field=models.FloatField(validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(5)]),
        ),
    ]
