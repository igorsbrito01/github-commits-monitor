import React from 'react';
import {Field, reduxForm} from 'redux-form';


const FilterCommitForm = props => {
    const { handleSubmit, pristine, reset, submitting, repos } = props

    return(
        <div className="card filter-card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-5">   
                  <Field
                    className="form-control"
                    name="authorFilter"
                    component="input"
                    type="text"
                    placeholder="Author"
                    value="Igor"
                  />
                </div>
                <div className="col-5">
                  <Field className="form-control" name="repoNameFilter" component="select">
                    <option value=""> All Repositories </option>
                    {repos.map((repo, index) => (
                        <option value={repo.name} key={index}>{repo.name}</option>    
                    ))}
                  </Field>
                </div>
                <div className="col-2">
                <button type="submit" className="btn btn-primary">Filter Commits</button>
                </div>
              </div>
            </form>
          </div>
        </div>
    )
}

export default reduxForm({
  form: 'FilterCommitForm' // a unique identifier for this form
})(FilterCommitForm)