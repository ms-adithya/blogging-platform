from rest_framework import generics, permissions
from .models import BlogPost, Comment
from .serializers import BlogPostSerializer, CommentSerializer
from .pagination import StandardResultsSetPagination  # Import pagination
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from .filters import BlogPostFilter


class IsOwnerOrReadOnly(permissions.BasePermission):
    """Custom permission to allow only authors to edit or delete their own posts"""

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:  # Allow GET requests
            return True
        return getattr(obj, "author", None) == request.user  # Safe attribute access

class BlogPostListCreate(generics.ListCreateAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = StandardResultsSetPagination  # Apply pagination
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    filterset_class = BlogPostFilter
    ordering_fields = ["created_at"]  # Allow ordering by created_at
    search_fields = ["title", "content"]  # Enable search by title and content

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)  # Assign logged-in user as author

class BlogPostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = [IsOwnerOrReadOnly]  # Restrict edit/delete

# List all comments or create a new one
class CommentListCreate(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = StandardResultsSetPagination  # Apply pagination

    def get_queryset(self):
        blogpost_id = self.kwargs['blogpost_id']  # Get blogpost ID from URL
        return Comment.objects.filter(blog_id=blogpost_id)  # Filter comments by blogpost

    def perform_create(self, serializer):
        blogpost_id = self.kwargs['blogpost_id']  # Get blogpost ID from URL
        blog = BlogPost.objects.get(id=blogpost_id)  # Fetch BlogPost instance
        serializer.save(user=self.request.user, blog=blog)  # Assign blog instance, not ID

class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsOwnerOrReadOnly]  # Restrict edit/delete to comment owner
