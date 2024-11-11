from django import template

register = template.Library()


@register.filter(is_safe=True)
def star_rating(value):
    return '⭐' * int(value) + '☆' * (5 - int(value))
