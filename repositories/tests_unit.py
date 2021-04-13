from django.contrib.auth.models import User
from django.test import TestCase

from .github import repository_exits, get_commits_from_repo
from .models import Repository


class GithubAPITest(TestCase):
    def test_repository_exists(self):
        exists = repository_exits('igorsbrito01', 'github-commits-monitor')
        self.assertEqual(exists, True)

    def test_repository_exists_wrong_repository_name(self):
        exists = repository_exits('igorsbrito01', 'github-commits')
        self.assertEqual(exists, False)

    def test_repository_exists_wrong_username(self):
        exists = repository_exits('igorsbrito', 'github-commits-monitor')
        self.assertEqual(exists, False)
    
    def test_get_commits_from_repo(self):
        commits = get_commits_from_repo('igorsbrito01', 'github-commits-monitor')
        self.assertEqual(type(commits), list)

    def test_get_commits_from_repo_wrong_repository_name(self):
        commits = get_commits_from_repo('igorsbrito01', 'github-commits')
        self.assertEqual(commits, None)
    
    def test_get_commits_from_repo_wrong_username(self):
        commits = get_commits_from_repo('igorsbrito', 'github-commits-monitor')
        self.assertEqual(commits, None)
