import * as types from './ActionTypes';

export const createRepositorySuccess = (response, successMessage) => ({
  type: types.CREATE_REPOSITORY_SUCCESS,
  payload: {response, successMessage},
});

export const getCommitsSuccess = (data) => ({
  type: types.GET_COMMITS_SUCCESS,
  payload: data.results,
  count: data.count,
  next: data.next,
  previous: data.previous, 
});

export const getCommitsSuccessSavingParams = ( repoName, author, data) => ({
  type: types.GET_COMMITS_SUCCESS_SAVINIG_PARAMS,
  payload: data.results,
  count: data.count,
  next: data.next,
  previous: data.previous,
  repoName: repoName,
  author: author, 
});

export const getRepos = data => ({
  type: types.GET_REPOS_SUCCESS,
  payload: data
});
