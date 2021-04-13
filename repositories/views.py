from django_filters import rest_framework as rest_filters
from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .filters import ComitsFilter
from .github import repository_exits
from .models import Commit, Repository
from .pagination import StandardResultsSetPagination
from .serializers import CommitSerializer, RepositorySerializer
from .tasks import get_repository_commits

class CommitsList(generics.ListAPIView):
    queryset = Commit.objects.all()
    serializer_class = CommitSerializer
    permission_classes = [IsAuthenticated]
    filterset_class = ComitsFilter
    filter_backends = [rest_filters.DjangoFilterBackend]
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.filter(repository__owner=self.request.user)


class RepositoryAPIView(generics.ListCreateAPIView):
    queryset = Repository.objects.all()
    serializer_class = RepositorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.filter(owner=self.request.user)

    def post(self, request, *args, **kwargs):
        if repository_exits(request.user.username, request.data['name']):
            repository, created = Repository.objects.get_or_create(owner=request.user, name=request.data['name'])
            serializer = self.serializer_class(repository)

            if created:
                get_repository_commits(repository.id)
                r_status = status.HTTP_201_CREATED 
            else:
                r_status = status.HTTP_200_OK

            return Response({'data': serializer.data, 'created': created}, status=r_status)
      
        return Response({'notExists': True}, status=status.HTTP_400_BAD_REQUEST)
