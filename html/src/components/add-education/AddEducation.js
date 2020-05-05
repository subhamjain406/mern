import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import classnames from "classnames";
import { addEducation } from "../../actions/profileAction";
import propTypes from "prop-types";

const AddEducation = (props) => {
  const [state, setState] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
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

    const edData = {
      school: state.school,
      degree: state.degree,
      fieldofstudy: state.fieldofstudy,
      from: state.from,
      to: state.to,
      current: state.current,
      desc: state.desc,
    };

    props.addEducation(edData, props.history);
  };

  const { errors } = state;
  return (
    <div>
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp, etc that you have attended
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={sunbitForm}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors && errors.school,
                    })}
                    placeholder="* School Or Bootcamp"
                    name="school"
                    onChange={onChangeField}
                  />
                  {errors && (
                    <div className="invalid-feedback">{errors.school}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors && errors.degree,
                    })}
                    placeholder="* Degree Or Certificate"
                    name="degree"
                    onChange={onChangeField}
                  />
                  {errors && (
                    <div className="invalid-feedback">{errors.degree}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Field Of Study"
                    name="fieldofstudy"
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
                    placeholder="Program Description"
                    name="desc"
                    onChange={onChangeField}
                  ></textarea>
                  <small className="form-text text-muted">
                    Tell us about your experience and what you learned
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

AddEducation.propTypes = {
  profile: propTypes.object.isRequired,
  errors: propTypes.object.isRequired,
  addEducation: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { addEducation })(
  withRouter(AddEducation)
);
