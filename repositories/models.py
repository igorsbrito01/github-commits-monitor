from datetime import timedelta

from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone

from .github import get_commits_from_repo


class Repository(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='repositories')

    def __str__(self):
        return self.name

    class Meta:
        unique_together = ('name', 'owner')
        verbose_name_plural = 'Repositories'


class Commit(models.Model):
    message = models.TextField()
    sha = models.CharField(max_length=100)
    author = models.CharField(max_length=50)
    url = models.URLField(max_length=200)
    date = models.DateTimeField()
    avatar = models.URLField(max_length=200, blank=True)

    repository = models.ForeignKey(Repository, on_delete=models.CASCADE)

    def __str__(self):
        return self.message

    class Meta:
        ordering = ('-date',)
