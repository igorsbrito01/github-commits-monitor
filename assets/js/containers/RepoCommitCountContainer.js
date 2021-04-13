import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import RepoCommitCountList from '../components/RepoCommitCountList'
import * as commitAPI from '../api/CommitAPI';

class RepoCommitCountContainer extends React.Component {

    componentDidMount(){
        commitAPI.getRepositoryCommitCount();
    }

    render(){
        const {repoCommitCount} = this.props;
        return(
          <RepoCommitCountList repoCommitCount={repoCommitCount}/>      
        )
    }

}

RepoCommitCountContainer.propTypes = {
    repoCommitCount: PropTypes.array
}
RepoCommitCountContainer.defaultProps ={
    repoCommitCount: []
}

const mapStateToProps = store => ({
    repoCommitCount: store.commitState.repoCommitCount,
});

export default connect(mapStateToProps)(RepoCommitCountContainer);
