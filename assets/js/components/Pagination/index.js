import React from 'react';
import PropTypes from 'prop-types';


const Pagination = (props) =>{
    const {
      pageSize, 
      commitsCount, 
      commitsNextUrl, 
      commitsPreviousUrl, 
      commitsLength, 
      paginationPrevious, 
      paginationNext
    } = props;

    return(
      <div>
        {commitsCount > pageSize && (
          <div className="pagination-container">
            <ul className="pagination pagination-element">
            <li className={commitsPreviousUrl ? "page-item" : "page-item disabled"}>
                <a className="page-link" href="#" onClick={paginationPrevious}>Previous</a>
            </li>
            <li className="page-item disabled"><a className="page-link" href="#">Current Page</a></li>
            <li className={commitsNextUrl ? "page-item" : "page-item disabled"}>
                <a className="page-link" href="#" onClick={paginationNext}>Next</a>
            </li>
            </ul>
            <div className="pagination-number">
                {commitsLength} of {commitsCount}
            </div>
          </div>
        )}
      </div>
    )
}

Pagination.propTypes = {
    pageSize: PropTypes.number,
    commitsCount: PropTypes.number,
    commitsNextUrl: PropTypes.string,
    commitsPreviousUrl: PropTypes.string,
    commitsLength: PropTypes.number,
    paginationPrevious: PropTypes.func,
    paginationNext: PropTypes.func
}

export default Pagination;
