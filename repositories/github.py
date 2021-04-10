import requests
from datetime import timedelta

from django.utils import timezone

GITHUB_BASE_URL = 'https://api.github.com/repos'

def get_commits_from_repo(username, repo_name):
    date = (timezone.now() - timedelta(days=30)).isoformat()
    response = requests.get(GITHUB_BASE_URL + f'/{username}/{repo_name}/commits?since={date}')

    if response.status_code == 200:
        return response.json()

    return None

def repository_exits(username, repo_name):
    response = requests.get(GITHUB_BASE_URL + f'/{username}/{repo_name}')

    if response.status_code != 200:
            return False

    return True