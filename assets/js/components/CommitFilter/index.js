import React from 'react';
import PropTypes from 'prop-types';

const CommitFilter = (props) => {
    const {authorFilter, repoNameFilter, cleanFilter} = props;
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
                <button type="button" class="btn btn-danger" onClick={cleanFilter}>Remove Filters</button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
}

CommitFilter.propTypes = {
    authorFilter: PropTypes.string,
    repoNameFilter: PropTypes.string,
    cleanFilter: PropTypes.func
  };

export default CommitFilter;
