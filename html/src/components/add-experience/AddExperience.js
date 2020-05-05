import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import propTypes from "prop-types";
import classnames from "classnames";
import { addExperience } from "../../actions/profileAction";

const AddExperience = (props) => {
  const [state, setState] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    desc: "",
    errors: {},
    disabled: false,
  });

  useEffect(
    (state) => {
      setState({ ...state, errors: props.errors });
    },
    [props.errors]
  );

  const onChangeField = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const onChange = (e) => {
    setState({
      ...state,
      current: !state.current,
      disabled: !state.disabled,
    });
  };

  const sunbitForm = (e) => {
    e.preventDefault();

    const expData = {
      company: state.company,
      title: state.title,
      location: state.location,
      from: state.from,
      to: state.to,
      current: state.current,
      desc: state.desc,
    };

    props.addExperience(expData, props.history);
  };

  const { errors } = state;

  return (
    <div>
      <div className="section add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Experience</h1>
              <p className="lead text-center">
                Add any developer/programming positions that you have had in the
                past
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={sunbitForm}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors && errors.title,
                    })}
                    placeholder="* Job Title"
                    name="title"
                    onChange={onChangeField}
                  />
                  {errors && (
                    <div className="invalid-feedback">{errors.title}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors && errors.company,
                    })}
                    placeholder="* Company"
                    name="company"
                    onChange={onChangeField}
                  />
                  {errors && (
                    <div className="invalid-feedback">{errors.company}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Location"
                    name="location"
                    onChange={onChangeField}
                  />
                </div>
                <h6>From Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors && errors.from,
                    })}
                    name="from"
                    onChange={onChangeField}
                  />
                  {errors && (
                    <div className="invalid-feedback">{errors.from}</div>
                  )}
                </div>
                <h6>To Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="to"
                    onChange={onChangeField}
                    disabled={state.disabled}
                  />
                </div>
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="current"
                    value=""
                    id="current"
                    onChange={onChange}
                  />
                  <label className="form-check-label" for="current">
                    Current Job
                  </label>
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Job Description"
                    name="desc"
                    onChange={onChangeField}
                  ></textarea>
                  <small className="form-text text-muted">
                    Some of your responsabilities, etc
                  </small>
                </div>
                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4 mb-2"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AddExperience.propTypes = {
  profile: propTypes.object.isRequired,
  errors: propTypes.object.isRequired,
  addExperience: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { addExperience })(
  withRouter(AddExperience)
);
