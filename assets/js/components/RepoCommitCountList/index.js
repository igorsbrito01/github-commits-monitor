import React from 'react';
import PropTypes from 'prop-types';

const RepoCommitCountList = (props) =>{

    const {repoCommitCount} = props;
    return(
      <div className="repo-count-cards">
        {repoCommitCount.length > 0 ?(
            <div>
                {repoCommitCount.map((repoCount, index)=>(
                    <div className="card" key={index}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-6">
                                    {repoCount.name}
                                </div>
                                <div className="col-6">
                                    {repoCount.num_commit}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div>
                
            </div>
        )}
      </div>
    )
}

RepoCommitCountList.propTypes = {
    repoCommitCount: PropTypes.array
}

export default RepoCommitCountList;
