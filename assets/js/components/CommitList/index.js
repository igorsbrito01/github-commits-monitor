import React from 'react';
import PropTypes from 'prop-types';

const CommitList = (props) => {
  const {
    commits, 
    pageSize, 
    commitsCount, 
    commitsPreviousUrl, 
    commitsNextUrl,
    paginationNext,
    paginationPrevious,
    filterCommitsBy 
  } = props;
  return (
    <div>
      {commits.length !== 0 && (
        <div>
          <div className="card card-outline-secondary my-4">
            <div className="card-header">
              Commit List
            </div>

            <div className="card-body">
              {commits.map((commit, index) => (
                <div key={commit.sha}>
                  <div className="avatar">
                    <img alt={commit.author} className="img-author" src={commit.avatar} />
                  </div>
                  <div className="commit-details">
                    <p>
                      {commit.message}
                    </p>
                    <small className="text-muted">
                      <a href="#author" onClick={filterCommitsBy}>{commit.author}</a>
                      {' '}
                      authored
                      {' '}
                      on
                      {' '}
                      <a href="#repository" onClick={filterCommitsBy}>{commit.repository}</a>
                      {' '}
                      at
                      {' '}
                      {commit.date}
                    </small>
                    {index !== commits.length - 1 && <hr />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

CommitList.propTypes = {
  commits: PropTypes.arrayOf(PropTypes.object).isRequired,
  filterCommitsBy: PropTypes.func,
};

export default CommitList;
