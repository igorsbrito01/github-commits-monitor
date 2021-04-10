from django.urls import path

from .views import CommitsList, RepositoryAPIView

app_name = 'repositories'

urlpatterns = [
    path('api/commits/', CommitsList.as_view(), name='commits-list'),
    path('api/repositories/', RepositoryAPIView.as_view(), name='repositories-create'),
]
