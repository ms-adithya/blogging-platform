from rest_framework import serializers
from .models import BlogPost, Comment

class BlogPostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')  # 👈 Fix here

    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'content', 'author', 'created_at']  # 👈 Explicitly define fields

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)  # Show username, but auto-assign
    blog = serializers.PrimaryKeyRelatedField(read_only=True)  # Auto-assign blog post

    class Meta:
        model = Comment
        fields = ['id', 'text', 'user', 'blog', 'created_at']