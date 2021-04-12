import React from 'react';
import PropTypes from 'prop-types';

const RepoList = (props) => {
  const {repos, selectRepo, author} = props;
  return(
    <div>
      {repos!= null && repos.length != 0 && (
        <div>
          <li className="body-title">
            Repositories
          </li>
          <hr className="divisor"/>
          { repos.map((repo, index) => (
            <li className="nav-item" key={index} onClick={() => selectRepo(repo.name, author)}>
                <a>{repo.name}</a>
            </li>
          ))}
        </div>
    )}   
    </div>
  )
}

RepoList.propTypes = {
   selectRepo: PropTypes.func,
   repos: PropTypes.arrayOf(PropTypes.object),
   author: PropTypes.string,
};

export default RepoList;