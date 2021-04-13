import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as commitAPI from '../api/CommitAPI';
import Form from '../components/RepoCreateForm';

class RepoCreateContainer extends React.Component {
  submit = (values, dispatch) => {
    const token = document.getElementById('main').dataset.csrftoken;
    const name = values.name.split('/')[1];
    const v = {...values, name};
    return commitAPI.createRepository(v, {'X-CSRFToken': token}, dispatch);
  };

  render() {
    const {successMessage, created, failMessage, notExists} = this.props;
    return <Form 
      onSubmit={this.submit} 
      successMessage={successMessage} 
      created={created} 
      failMessage={failMessage} 
      notExists={notExists}
    />;
  }
}

RepoCreateContainer.propTypes = {
  successMessage: PropTypes.bool.isRequired,
  created: PropTypes.bool.isRequired,
  failMessage: PropTypes.bool.isRequired,
  notExists: PropTypes.bool.isRequired,
};

const mapStateToProps = store => ({
  successMessage: store.commitState.successMessage,
  created: store.commitState.created,
  failMessage: store.commitState.failMessage,
  notExists: store.commitState.notExists,
});

export default connect(mapStateToProps)(RepoCreateContainer);
