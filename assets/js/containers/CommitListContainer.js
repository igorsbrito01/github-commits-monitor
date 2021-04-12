import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as commitAPI from '../api/CommitAPI';
import CommitList from '../components/CommitList';
import FilterCommitForm from '../components/FilterCommitsForm';

class CommitListContainer extends React.Component {
  componentDidMount() {
    commitAPI.getCommits('', '');
  }

  submit = (values, dispatch) => {
    
    if(values.authorFilter == undefined){
      values.authorFilter  = '';
    }
    if(values.repoNameFilter == undefined) {
      values.repoNameFilter = '';
    }

    commitAPI.getCommits(values.repoNameFilter, values.authorFilter);
  };

  paginationNext = (event) => {
    const {commitsNextUrl} = this.props;
    commitAPI.getCommitsByUrl(commitsNextUrl);
    event.preventDefault();
  }

  paginationPrevious = (event) => {
    const {commitsPreviousUrl} = this.props;
    commitAPI.getCommitsByUrl(commitsPreviousUrl);
    event.preventDefault();
  }

  render() {
    const {commits, repos, pageSize, commitsCount, commitsPreviousUrl, commitsNextUrl} = this.props;
    return (
      <div>
        <FilterCommitForm onSubmit={this.submit} repos={repos} />
        <div>
        </div>
        <CommitList 
          commits={commits} 
          pageSize={pageSize} 
          commitsCount={commitsCount} 
          commitsPreviousUrl={commitsPreviousUrl} 
          commitsNextUrl={commitsNextUrl}
          paginationNext={this.paginationNext}
          paginationPrevious={this.paginationPrevious}
        />
      </div>
    );
  }
}

CommitListContainer.propTypes = {
  commits: PropTypes.arrayOf(PropTypes.object).isRequired,
  repos: PropTypes.arrayOf(PropTypes.object),
  pageSize: PropTypes.number,
  commitsCount: PropTypes.number,
  commitsNextUrl: PropTypes.string,
  commitsPreviousUrl: PropTypes.string,
};

const mapStateToProps = store => ({
  commits: store.commitState.commits,
  repos: store.commitState.repos,
  pageSize: store.commitState.pageSize,
  commitsCount: store.commitState.commitsCount,
  commitsNextUrl: store.commitState.commitsNextUrl,
  commitsPreviousUrl: store.commitState.commitsPreviousUrl,
});

export default connect(mapStateToProps)(CommitListContainer);
