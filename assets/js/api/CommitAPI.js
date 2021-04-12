import axios from 'axios';
import {reset} from 'redux-form';
import store from '../store';
import {
  createRepositorySuccess, getCommitsSuccess, getRepos, getFilteredCommitsSucess
} from '../actions/CommitActions';

export const getCommits = (repoName, author) => axios.get(`/api/commits/?repo=`+ repoName +`&author=`+author)
  .then((response) => {
    store.dispatch(getCommitsSuccess({...response.data}));
  });

export const getRepositories = () => axios.get('/api/repositories/')
 .then((response) => {
  store.dispatch(getRepos({...response.data}));
 });

export const createRepository = (values, headers, formDispatch) => axios.post('/api/repositories/', values, {headers})
  .then((response) => {
    store.dispatch(createRepositorySuccess(response.data, true));
    formDispatch(reset('repoCreate'));
    getRepositories();
    getCommits('', '');
  }).catch((error) => {
    const err = error.response;
    console.log(err);
  });
