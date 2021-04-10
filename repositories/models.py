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

    def populate_commits(self):
        repo_commits = get_commits_from_repo(self.owner.username, self.name)
        commits_sha = self.commit_set.values_list('sha', flat=True)

        commits_to_create = []
        for commit in repo_commits:
            if commit['sha'] not in commits_sha:
                commits_to_create.append(
                    Commit(message=commit['commit']['message'],
                        sha=commit['sha'],
                        author=commit['commit']['author']['name'],
                        url=commit['commit']['url'],
                        date=commit['commit']['committer']['date'],
                        avatar=commit['author']['avatar_url'] if commit.get('author') else '',
                        repository=self
                    )
                )
            
        Commit.objects.bulk_create(commits_to_create)
    
    def update_commits(self):
        last_date = timezone.now() - timedelta(days=30)

        Commits.objects.filter(date__lt=last_date).delete()
        self.populate_commits()

    class Meta:
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
