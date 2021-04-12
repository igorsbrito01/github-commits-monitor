import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as commitAPI from '../api/CommitAPI';
import CommitList from '../components/CommitList';

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

  filterCommitsBy = (event) => {
    const {repoNameFilter, authorFilter} =  this.props;
    var filterField  = event.target.href.split('#')[1];

    if(filterField == 'author'){
      commitAPI.getCommitsSaveFilters(repoNameFilter, event.target.text);
    }else if(filterField == 'repository'){
      commitAPI.getCommitsSaveFilters(event.target.text, authorFilter);
    }
    event.preventDefault();
  }

  cleanFilter = (event) => {
    commitAPI.getCommitsSaveFilters('', '');
    event.preventDefault();
  }

  render() {
    const {commits, repos, pageSize, commitsCount, commitsPreviousUrl, commitsNextUrl, repoNameFilter, authorFilter} = this.props;
    return (
      <div>
        {repoNameFilter == '' && authorFilter == '' ? (
          <div></div>
        ): (
          <div className="card filter-component">
            <div className="card-header row filter-header">
              <div className="filter-info row col-10">
                {repoNameFilter != '' && (
                  <div className="col-6 filter-item"> 
                    <span className="align-middle"> <strong>Repository: </strong> {repoNameFilter}</span>
                  </div>
                )}
                {authorFilter != '' && (
                  <div className="col-6 filter-item">
                    <span className="align-middle"> <strong>Author: </strong> {authorFilter}</span>
                  </div>
                )}
              </div>
              <div className="col-2">
                <button type="button" class="btn btn-danger" onClick={this.cleanFilter}>Remove Filters</button>
              </div>
            </div>
          </div>
        )}
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
          filterCommitsBy={this.filterCommitsBy}
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
  repoNameFilter: PropTypes.string,
  authorFilter: PropTypes.string,
};

const mapStateToProps = store => ({
  commits: store.commitState.commits,
  repos: store.commitState.repos,
  pageSize: store.commitState.pageSize,
  commitsCount: store.commitState.commitsCount,
  commitsNextUrl: store.commitState.commitsNextUrl,
  commitsPreviousUrl: store.commitState.commitsPreviousUrl,
  repoNameFilter: store.commitState.repoNameFilter,
  authorFilter: store.commitState.authorFilter,
});

export default connect(mapStateToProps)(CommitListContainer);
