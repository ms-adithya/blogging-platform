import django_filters
from .models import BlogPost

class BlogPostFilter(django_filters.FilterSet):
    author = django_filters.CharFilter(field_name="author__username", lookup_expr='iexact')  # Filter by author's username
    ordering = django_filters.OrderingFilter(fields=("created_at",))  # Allow ordering by created_at

    class Meta:
        model = BlogPost
        fields = ['author']
