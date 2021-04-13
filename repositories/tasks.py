from django.utils import timezone

from .github import get_commits_from_repo
from .models import Repository, Commit
from githubmonitor.celery import app


@app.task
def get_repository_commits(repository_id):
    repository = Repository.objects.get(id=repository_id)
    repo_commits = get_commits_from_repo(repository.owner.username, repository.name)

    if repo_commits:
        commits_to_create = []
        for commit in repo_commits:
            commits_to_create.append(Commit(
                message=commit['commit']['message'],
                sha=commit['sha'],
                author=commit['commit']['author']['name'],
                url=commit['commit']['url'],
                date=commit['commit']['committer']['date'],
                avatar=commit['author']['avatar_url'] if commit.get('author') else '',
                repository=repository
            ))
            
        Commit.objects.bulk_create(commits_to_create)