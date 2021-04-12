import * as types from './ActionTypes';

export const createRepositorySuccess = (response, successMessage) => ({
  type: types.CREATE_REPOSITORY_SUCCESS,
  payload: {response, successMessage},
});

export const getCommitsSuccess = (data) => ({
  type: types.GET_COMMITS_SUCCESS,
  payload: data.results,
});

export const getRepos = data => ({
  type: types.GET_REPOS_SUCCESS,
  payload: data
});
