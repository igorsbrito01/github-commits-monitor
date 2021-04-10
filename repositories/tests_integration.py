import json
from datetime import timedelta

from django.contrib.auth.models import User
from django.test import Client, TestCase
from django.utils import timezone

from .models import Commit, Repository


class RepositoryTest(TestCase):
    def setUp(self):
        self.user_1 = User.objects.create(username='igorsbrito01', password='password123')
        self.user_2 = User.objects.create(username='user2', password='password123')

    def test_create_repository(self):
        client = Client()
        client.force_login(user=self.user_1)

        repos_count = self.user_1.repositories.all().count()

        self.assertEqual(repos_count, 0)

        response = client.post('/api/repositories/', json.dumps({'name':'github-commits-monitor'}), content_type='application/json')
        repo = self.user_1.repositories.all()

        self.assertEqual(response.status_code, 201)
        self.assertEqual(repo.count(), 1)
        self.assertEqual(repo[0].name, 'github-commits-monitor')
    
    def test_create_repository_not_repo_owner(self):
        client = Client()
        client.force_login(user=self.user_2)

        repos_count = self.user_1.repositories.all().count()

        self.assertEqual(repos_count, 0)

        response = client.post('/api/repositories/', json.dumps({'name':'github-commits-monitor'}), content_type='application/json')
        repo = self.user_1.repositories.all()

        self.assertEqual(response.status_code, 400)
        self.assertEqual(repo.count(), 0)

    def test_create_repository_repo_not_exits(self):
        client = Client()
        client.force_login(user=self.user_1)

        repos_count = self.user_1.repositories.all().count()

        self.assertEqual(repos_count, 0)

        response = client.post('/api/repositories/', json.dumps({'name':'github-commits'}), content_type='application/json')
        repo = self.user_1.repositories.all()

        self.assertEqual(response.status_code, 400)
        self.assertEqual(repo.count(), 0)


class CommitsView(TestCase):
    def setUp(self):
        self.user_1 = User.objects.create(username='user1', password='password123')
        self.user_2 = User.objects.create(username='user2', password='password123')
        repository_1 = Repository.objects.create(owner=self.user_1, name='repo_1')
        repository_2 = Repository.objects.create(owner=self.user_1, name='repo_2')
        Commit.objects.create(message='commit 1',
            sha='shasumtest1',
            author='user1',
            url='htttps://servertest.com/commit/',
            date='2021-04-01T13:30:00-03:00',
            avatar='htttps://servertest.com/avatar/',
            repository=repository_1
        )

        Commit.objects.create(message='commit 2',
            sha='shasumtest2',
            author='user11',
            url='htttps://servertest.com/commit/',
            date='2021-04-01T12:00:00-03:00',
            avatar='htttps://servertest.com/avatar/',
            repository=repository_2
        )
    
    def test_commit_list(self):
        client = Client()
        client.force_login(user=self.user_1)
        response = client.get('/api/commits/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['results'][0]['sha'], 'shasumtest1')
        self.assertEqual(response.json()['results'][1]['sha'], 'shasumtest2')
        self.assertEqual(response.json()['count'], 2)

    def test_commit_list_no_commits(self):        
        client = Client()
        client.force_login(user=self.user_2)
        response = client.get('/api/commits/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['count'], 0)
        self.assertEqual(len(response.json()['results']), 0)

    def test_commit_list_filter_by_repositoty(self):
        client = Client()
        client.force_login(user=self.user_1)
        response = client.get('/api/commits/?repo=repo_1')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['count'], 1)
        self.assertEqual(response.json()['results'][0]['sha'], 'shasumtest1')

        response = client.get('/api/commits/?repo=repo_3')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['count'], 0)
        self.assertEqual(len(response.json()['results']), 0)

    def test_commit_list_filter_by_author(self):
        client = Client()
        client.force_login(user=self.user_1)
        response = client.get('/api/commits/?author=user1')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['count'], 1)
        self.assertEqual(response.json()['results'][0]['sha'], 'shasumtest1')

        response = client.get('/api/commits/?repo=user3')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['count'], 0)
        self.assertEqual(len(response.json()['results']), 0)
    
    def test_commit_list_no_user(self):
        client = Client()
        response = client.get('/api/commits/')

        self.assertEqual(response.status_code, 403)
