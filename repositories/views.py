from django_filters import rest_framework as rest_filters
from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .filters import ComitsFilter
from .github import repository_exits
from .models import Commit, Repository
from .serializers import CommitSerializer, RepositorySerializer

class CommitsList(generics.ListAPIView):
    queryset = Commit.objects.all()
    serializer_class = CommitSerializer
    permission_classes = [IsAuthenticated]
    filterset_class = ComitsFilter
    filter_backends = [rest_filters.DjangoFilterBackend]

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.filter(repository__in=self.request.user.repositories.all())

class RepositoryAPIView(generics.ListCreateAPIView):
    queryset = Repository.objects.all()
    serializer_class = RepositorySerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        repos = self.queryset.filter(owner=request.user)
        serializer = self.serializer_class(repos, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        if repository_exits(request.user.username, request.data['name']):
            repository, created = Repository.objects.get_or_create(owner=request.user, name=request.data['name'])
            serializer = self.serializer_class(repository)

            if created:
                repository.populate_commits()
                r_status = status.HTTP_201_CREATED 
            else:
                r_status = status.HTTP_200_OK
            

            return Response(serializer.data, status=r_status)
      
        return Response(status=status.HTTP_400_BAD_REQUEST)