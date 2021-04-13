from datetime import timedelta

from django.utils import timezone

from .models import Repository
from githubmonitor.celery import app


@app.task
def get_repository_commits(repository_id):
    repository = Repository.objects.get(id=repository_id)
    repository.populate_commits()

@app.task
def update_repository_commits(repository_id):
    last_allowed_date = timezone.now() - timedelta(days=30)

    repository = Repository.objects.get(id=repository_id)
    repository.commit_set.filter(date__lt=last_allowed_date).delete()
    repository.populate_commits()
