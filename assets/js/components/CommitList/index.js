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
    paginationPrevious 
  } = props;
  return (
    <div>
      {commits.length !== 0 && (
        <div>
          {commitsCount > pageSize && (
            <div className="pagination-container">
              <ul className="pagination">
                <li className={commitsPreviousUrl ? "page-item" : "page-item disabled"}>
                  <a className="page-link" href="#" onClick={paginationPrevious}>Previous</a>
                </li>
                <li className="page-item disabled"><a className="page-link" href="#">Current</a></li>
                <li className={commitsNextUrl ? "page-item" : "page-item disabled"}>
                  <a className="page-link" href="#" onClick={paginationNext}>Next</a>
                </li>
              </ul>
            </div>
          )}
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
                      {commit.author}
                      {' '}
                      authored
                      {' '}
                      on
                      {' '}
                      {commit.repository}
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
  pageSize: PropTypes.number,
  commitsCount: PropTypes.number,
  commitsNextUrl: PropTypes.string,
  commitsPreviousUrl: PropTypes.string
};

export default CommitList;
