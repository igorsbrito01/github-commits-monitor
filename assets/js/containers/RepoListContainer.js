import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import RepoList from '../components/RepoList';
import * as commitAPI from '../api/CommitAPI';

class RepoListContainer extends React.Component {

  componentDidMount() {
    commitAPI.getRepositories();
  }

  selectRepo(repoName, author) {
    commitAPI.getCommitsSaveFilters(repoName, author);
  }

  render() {
    const {repos, author} = this.props;
    return(
      <div>
        <RepoList repos={repos} author={author} selectRepo={this.selectRepo}/>
      </div>
    );
  }

}

RepoListContainer.propTypes = {
  repos: PropTypes.arrayOf(PropTypes.object),
  author: PropTypes.string,
};
  
const mapStateToProps = store => ({
  repos: store.commitState.repos,
  author: store.commitState.authorFilter,
});

export default connect(mapStateToProps)(RepoListContainer);
