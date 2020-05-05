import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { createProfile } from "../../actions/profileAction";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import Spinner from "../common/spinner";

const CreateProfile = (props) => {
  const [state, setState] = useState({
    displaySocialInputs: false,
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    youtube: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    errors: {},
  });

  useEffect(
    (state) => {
      setState({ ...state, errors: props.errors });
    },
    [props.errors]
  );

  const onSubmit = (e) => {
    e.preventDefault();
    const profileData = {
      handle: state.handle,
      company: state.company,
      website: state.website,
      location: state.location,
      status: state.status,
      skills: state.skills,
      githubusername: state.githubusername,
      bio: state.bio,
      youtube: state.youtube,
      facebook: state.facebook,
      twitter: state.twitter,
      linkedin: state.linkedin,
    };
    props.createProfile(profileData, props.history);
  };

  const onChangeField = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const toggle = (e) => {
    e.preventDefault();
    setState({ ...state, displaySocialInputs: !state.displaySocialInputs });
  };

  let socialForm;
  if (state.displaySocialInputs) {
    socialForm = (
      <div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fab fa-twitter"></i>
            </span>
          </div>
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Twitter Profile URL"
            name="twitter"
            onChange={onChangeField}
          />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fab fa-facebook"></i>
            </span>
          </div>
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Facebook Page URL"
            name="facebook"
            onChange={onChangeField}
          />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fab fa-linkedin"></i>
            </span>
          </div>
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Linkedin Profile URL"
            name="linkedin"
            onChange={onChangeField}
          />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fab fa-youtube"></i>
            </span>
          </div>
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="YouTube Channel URL"
            name="youtube"
            onChange={onChangeField}
          />
        </div>
      </div>
    );
  }

  const { errors } = state;

  return (
    <div className="create-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            {/* <a href="dashboard.html" className="btn btn-light">
              Go Back
            </a> */}
            <h1 className="display-4 text-center">Create Your Profile</h1>
            <p className="lead text-center">
              Let's get some information to make your profile stand out
            </p>
            <small className="d-block pb-3">* = required field</small>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.handle,
                  })}
                  placeholder="* Profile handle"
                  name="handle"
                  onChange={onChangeField}
                />
                <small className="form-text text-muted">
                  A unique handle for your profile URL. Your full name, company
                  name, nickname, etc (This CAN'T be changed later)
                </small>
                <div className="invalid-feedback">{errors.handle}</div>
              </div>
              <div className="form-group">
                <select
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.status,
                  })}
                  name="status"
                  onChange={onChangeField}
                >
                  <option value="0">* Select Professional Status</option>
                  <option value="Developer">Developer</option>
                  <option value="Junior Developer">Junior Developer</option>
                  <option value="Senior Developer">Senior Developer</option>
                  <option value="Manager">Manager</option>
                  <option value="Student or Learning">
                    Student or Learning
                  </option>
                  <option value="Instructor">Instructor or Teacher</option>
                  <option value="Intern">Intern</option>
                  <option value="Other">Other</option>
                </select>
                <small className="form-text text-muted">
                  Give us an idea of where you are at in your career
                </small>
                <div className="invalid-feedback">{errors.status}</div>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Company"
                  name="company"
                  onChange={onChangeField}
                />
                <small className="form-text text-muted">
                  Could be your own company or one you work for
                </small>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Website"
                  name="website"
                  onChange={onChangeField}
                />
                <small className="form-text text-muted">
                  Could be your own or a company website
                </small>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Location"
                  name="location"
                  onChange={onChangeField}
                />
                <small className="form-text text-muted">
                  City & state suggested (eg. Boston, MA)
                </small>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.skills,
                  })}
                  placeholder="Skills"
                  name="skills"
                  onChange={onChangeField}
                />
                <small className="form-text text-muted">
                  Please use comma separated values (eg.
                  HTML,CSS,JavaScript,PHP)
                </small>
                <div className="invalid-feedback">{errors.skills}</div>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Github Username"
                  name="githubusername"
                  onChange={onChangeField}
                />
                <small className="form-text text-muted">
                  If you want your latest repos and a Github link, include your
                  username
                </small>
              </div>
              <div className="form-group">
                <textarea
                  className="form-control form-control-lg"
                  placeholder="A short bio of yourself"
                  name="bio"
                  onChange={onChangeField}
                ></textarea>
                <small className="form-text text-muted">
                  Tell us a little about yourself
                </small>
              </div>

              <div className="mb-3">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={toggle}
                >
                  Add Social Network Links
                </button>
                <span className="text-muted ml-2">Optional</span>
              </div>
              {socialForm}
              <input
                type="submit"
                className="btn btn-info btn-block mt-4 mb-5"
              />
            </form>
          </div>
        </div>
      </div>
      {props.profile.loading ? <Spinner /> : ""}
    </div>
  );
};

CreateProfile.propTypes = {
  profile: propTypes.object.isRequired,
  errors: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
