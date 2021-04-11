import axios from 'axios';
import {reset} from 'redux-form';
import store from '../store';
import {
  createRepositorySuccess, getCommitsSuccess, getRepos
} from '../actions/CommitActions';

export const getCommits = () => axios.get(`/api/commits/?author`)
  .then((response) => {
    store.dispatch(getCommitsSuccess({...response.data}));
  });

export const getCommitsFiltered = (repoName, author) => axios.get(`/api/commits/?repo=`+ repoName +`&author=`+author)
  .then((response) => {
    store.dispatch(getCommitsSuccess({...response.data}));
  });

export const getRepositories = () => axios.get('/api/repositories/')
 .then((response) => {
  console.log(response.data);
  store.dispatch(getRepos({...response.data}));
 });

export const createRepository = (values, headers, formDispatch) => axios.post('/api/repositories/', values, {headers})
  .then((response) => {
    store.dispatch(createRepositorySuccess(response.data, true));
    formDispatch(reset('repoCreate'));
    getRepositories();
    getCommits();
  }).catch((error) => {
    const err = error.response;
    console.log(err);
  });
