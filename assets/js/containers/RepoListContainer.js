import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import RepoList from '../components/RepoList';
import * as commitAPI from '../api/CommitAPI';

class RepoListContainer extends React.Component {

  componentDidMount() {
    commitAPI.getRepositories();
  }

  selectRepo(repoName) {
    commitAPI.getCommits(repoName, '');
  }

  render() {
    const {repos} = this.props;;
    return(
      <div>
        <RepoList repos={repos} selectRepo={this.selectRepo}/>
      </div>
    );
  }

}

RepoListContainer.propTypes = {
  repos: PropTypes.arrayOf(PropTypes.object),
};
  
const mapStateToProps = store => ({
  repos: store.commitState.repos,
});

export default connect(mapStateToProps)(RepoListContainer);
