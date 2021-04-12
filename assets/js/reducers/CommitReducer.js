import * as types from '../actions/ActionTypes';

const initialState = {
  commits: [],
  pageSize: 10,
  commitsCount: 0,
  commitsNextUrl: '',
  commitsPreviousUrl:'',
  repos: [],
  successMessage: false,
  repoNameFilter: '',
  authorFilter: '',
};

const commitReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COMMITS_SUCCESS:
      return {
        ...state,
        commits: Object.values(action.payload),
        commitsCount: action.count,
        commitsNextUrl: action.next,
        commitsPreviousUrl: action.previous,
        repoNameFilter: '',
        authorFilter: '',
      };
    case types.GET_COMMITS_SUCCESS_SAVINIG_PARAMS:
      return {
        ...state,
        commits: Object.values(action.payload),
        commitsCount: action.count,
        commitsNextUrl: action.next,
        commitsPreviousUrl: action.previous,
        repoNameFilter: action.repoName,
        authorFilter: action.author,
      }
    case types.CREATE_REPOSITORY_SUCCESS:
      return {...state, successMessage: action.payload.successMessage};
    case types.GET_REPOS_SUCCESS:
      return {
        ...state,
        repos: Object.values(action.payload)
      }
    default:
      return state;
  }
};

export default commitReducer;
