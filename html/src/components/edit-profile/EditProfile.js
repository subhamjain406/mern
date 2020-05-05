import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { createProfile, getCurrentProfile } from "../../actions/profileAction";
import classnames from "classnames";
import { Link, withRouter } from "react-router-dom";
import Spinner from "../common/spinner";
import isEmpty from "../../utility/empty";

const EditProfile = (props) => {
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

  useEffect(() => {
    setTimeout(() => {
      if (props.profile.profile) {
        const { profile } = props.profile;

        const skillsCSV = profile.skills.join();

        profile.company = !isEmpty(profile.company) ? profile.company : "";
        profile.website = !isEmpty(profile.website) ? profile.website : "";
        profile.location = !isEmpty(profile.location) ? profile.location : "";
        profile.githubusername = !isEmpty(profile.githubusername)
          ? profile.githubusername
          : "";
        profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
        profile.social = !isEmpty(profile.social) ? profile.social : {};
        profile.youtube = !isEmpty(profile.youtube) ? profile.youtube : "";
        profile.facebook = !isEmpty(profile.facebook) ? profile.facebook : "";
        profile.twitter = !isEmpty(profile.twitter) ? profile.twitter : "";
        profile.linkedin = !isEmpty(profile.linkedin) ? profile.linkedin : "";

        setState({
          ...state,
          handle: profile.handle,
          company: profile.company,
          website: profile.website,
          location: profile.location,
          status: profile.status,
          skills: skillsCSV,
          githubusername: profile.githubusername,
          bio: profile.bio,
          youtube: profile.youtube,
          facebook: profile.facebook,
          twitter: profile.twitter,
          linkedin: profile.linkedin,
        });
      }
    }, 1);
  }, []);

  useEffect(
    (state) => {
      setState({ ...state, errors: props.errors });
    },
    [props.errors]
  );

  const onSubmit = (e) => {
    e.preventDefault();
    const profileData = {
      ...state,
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
            value={state.twitter ? state.twitter : ""}
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
            value={state.facebook ? state.facebook : ""}
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
            value={state.linkedin ? state.linkedin : ""}
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
            value={state.youtube ? state.youtube : ""}
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
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Edit Your Profile</h1>
            <p className="lead text-center">
              Let's get some information to make your profile stand out
            </p>
            <small className="d-block pb-3">* = required field</small>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors && errors.handle,
                  })}
                  placeholder="* Profile handle"
                  name="handle"
                  onChange={onChangeField}
                  value={state.handle ? state.handle : ""}
                />
                <small className="form-text text-muted">
                  A unique handle for your profile URL. Your full name, company
                  name, nickname, etc (This CAN'T be changed later)
                </small>
                {errors && (
                  <div className="invalid-feedback">{errors.handle}</div>
                )}
              </div>
              <div className="form-group">
                <select
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors && errors.status,
                  })}
                  name="status"
                  onChange={onChangeField}
                  value={state.status ? state.status : "0"}
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
                {errors && (
                  <div className="invalid-feedback">{errors.status}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Company"
                  name="company"
                  onChange={onChangeField}
                  value={state.company ? state.company : ""}
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
                  value={state.website ? state.website : ""}
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
                  value={state.location ? state.location : ""}
                />
                <small className="form-text text-muted">
                  City & state suggested (eg. Boston, MA)
                </small>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors && errors.skills,
                  })}
                  placeholder="Skills"
                  name="skills"
                  onChange={onChangeField}
                  value={state.skills ? state.skills : ""}
                />
                <small className="form-text text-muted">
                  Please use comma separated values (eg.
                  HTML,CSS,JavaScript,PHP)
                </small>
                {errors && (
                  <div className="invalid-feedback">{errors.skills}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Github Username"
                  name="githubusername"
                  onChange={onChangeField}
                  value={state.githubusername ? state.githubusername : ""}
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
                  value={state.bio ? state.bio : ""}
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

EditProfile.propTypes = {
  profile: propTypes.object.isRequired,
  errors: propTypes.object.isRequired,
  getCurrentProfile: propTypes.func.isRequired,
  createProfile: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
