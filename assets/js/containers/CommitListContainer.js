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

  render() {
    const {commits, repos} = this.props;
    return (
      <div>
        <FilterCommitForm onSubmit={this.submit} repos={repos} />
        <div>
        </div>
        <CommitList commits={commits} />
      </div>
    );
  }
}

CommitListContainer.propTypes = {
  commits: PropTypes.arrayOf(PropTypes.object).isRequired,
  repos: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = store => ({
  commits: store.commitState.commits,
  repos: store.commitState.repos,
});

export default connect(mapStateToProps)(CommitListContainer);
