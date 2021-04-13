import axios from 'axios';
import {reset} from 'redux-form';
import store from '../store';
import {
  createRepositorySuccess, 
  getCommitsSuccess, 
  getRepos, 
  getCommitsSuccessSavingParams,
  createRepositoryFail,
  cleanMessages
} from '../actions/CommitActions';

export const getCommits = (repoName, author) => axios.get(`/api/commits/?repo=`+ repoName +`&author=`+author)
  .then((response) => {
    store.dispatch(getCommitsSuccess({...response.data}));
  });

export const getCommitsSaveFilters = (repoName, author) => axios.get(`/api/commits/?repo=`+ repoName +`&author=`+author)
  .then((response) => {
    store.dispatch(getCommitsSuccessSavingParams(repoName, author, {...response.data}));
  });  


export const getCommitsByUrl = (url) => axios.get(url)
  .then((response) => {
    store.dispatch(getCommitsSuccess({...response.data}));
  });

export const getRepositories = () => axios.get('/api/repositories/')
 .then((response) => {
  store.dispatch(getRepos({...response.data}));
 });

export const createRepository = (values, headers, formDispatch) => axios.post('/api/repositories/', values, {headers})
  .then((response) => {
    store.dispatch(createRepositorySuccess(response.data.data, response.data.created, true, false));
    formDispatch(reset('repoCreate'));
    getRepositories();
    getCommits('', '');

    setTimeout(()=>{
      store.dispatch(cleanMessages());
    }, 10000);
  }).catch((error) => {
    const err = error.response;
    store.dispatch(createRepositoryFail(err.data, true));

    setTimeout(()=>{
      store.dispatch(cleanMessages());
    }, 10000);
  });
