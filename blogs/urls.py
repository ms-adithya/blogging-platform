from django.urls import path
from .views import BlogPostListCreate, BlogPostDetail, CommentListCreate, CommentDetail, home

urlpatterns = [
    path('blogposts/', BlogPostListCreate.as_view(), name='blogpost-list-create'),
    path('blogposts/<int:pk>/', BlogPostDetail.as_view(), name='blogpost-detail'),
    path('blogposts/<int:blogpost_id>/comments/', CommentListCreate.as_view(), name='comment-list-create'),
    path('blogposts/<int:blogpost_id>/comments/<int:pk>/', CommentDetail.as_view(), name='comment-detail'),
    path("", home, name="home"),
]
