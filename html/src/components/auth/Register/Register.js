import React from "react";
import { useState, useEffect } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../../actions/authAction";
import propsTypes from "prop-types";
import { withRouter } from "react-router-dom";

const Register = (props) => {
  const [state, setstate] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    profileImage: "",
    errors: {},
    passwordMatch: true,
  });

  useEffect(() => {
    if (props.errors) {
      setstate({ ...state, errors: props.errors });
    }
  }, [props.errors]);

  useEffect(() => {
    if (props.auth.isAuthenticate) {
      props.history.push("/dashboard");
    }
  }, []);

  const onChangeField = (e) => {
    const { name, value } = e.target;
    setstate({
      ...state,
      [name]: value,
      errors: { ...state.errors, [name]: "" },
    });
  };

  const checkPassword = (e) => {
    if (state.password !== state.password2) {
      setstate({
        ...state,
        errors: {
          ...state.errors,
          password2: "password Does not match",
          passwordMatch: false,
        },
      });
    } else {
      setstate({
        ...state,
        errors: { ...state.errors, password2: "" },
        passwordMatch: true,
      });
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    const user = {
      name: state.name,
      email: state.email,
      password: state.password,
      password2: state.password2,
      profile_img: state.profileImage,
    };
    if (state.passwordMatch) {
      props.registerUser(user, props.history);
    }
  };

  const openFileUPloader = (e) => {
    e.preventDefault();
    document.getElementById("file-upload").click();
  };

  const fileUploader = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (item) => {
        document.getElementById("profile-pic").src = reader.result;
        setstate({ ...state, profileImage: reader.result });
      };
    }
  };

  const { errors } = state;

  return (
    <div>
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DeveloperConnector account
              </p>
              <form onSubmit={submitForm}>
                <div className="form-group">
                  <div className="avatar-wrapper">
                    <img className="profile-pic" id="profile-pic" src="" />
                    <div className="upload-button" onClick={openFileUPloader}>
                      <i
                        className="fa fa-arrow-circle-up"
                        aria-hidden="true"
                      ></i>
                    </div>
                    <input
                      className="file-upload"
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={fileUploader}
                    />
                  </div>
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.name,
                    })}
                    placeholder="Name"
                    name="name"
                    value={state.name}
                    onChange={onChangeField}
                  />
                  <div className="invalid-feedback">{errors.name}</div>
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email,
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={state.email}
                    onChange={onChangeField}
                  />
                  <div className="invalid-feedback">{errors.email}</div>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password,
                    })}
                    placeholder="Password"
                    name="password"
                    value={state.password}
                    onChange={onChangeField}
                  />
                  <div className="invalid-feedback">{errors.password}</div>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password2,
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    value={state.password2}
                    onChange={onChangeField}
                    onKeyUp={checkPassword}
                  />
                  <div className="invalid-feedback">{errors.password2}</div>
                </div>
                <input type="submit" className="btn btn-dark btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Register.propsTypes = {
  registerUser: propsTypes.func.isRequired,
  auth: propsTypes.object.isRequired,
  errors: propsTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
