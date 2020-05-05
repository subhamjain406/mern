import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../../actions/authAction";
import classnames from "classnames";
import Spinner from "../../common/spinner";

const Login = (props) => {
  const [state, setstate] = useState({
    email: "",
    password: "",
    error: {},
  });

  const { errors } = props;
  useEffect(() => {
    if (errors) {
      setstate({ ...state, error: errors });
    }
  }, [errors, props.auth]);

  const { auth } = props;
  useEffect(() => {
    if (auth.isAuthenticate) {
      props.history.push("/dashboard");
    }
  }, [auth.isAuthenticate]);

  useEffect(() => {
    if (auth.isAuthenticate) {
      props.history.push("/dashboard");
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: state.email,
      password: state.password,
    };

    props.loginUser(user);
  };

  const onChangeField = (e) => {
    const { name, value } = e.target;
    setstate({
      ...state,
      [name]: value,
      error: { ...state.error, [name]: "" },
    });
    console.log(state);
  };

  const errorsToDisplay = state.error;

  return (
    <div>
      {auth.loading ? (
        <Spinner />
      ) : (
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center">
                  Sign in to your DevConnector account
                </p>
                <form onSubmit={onSubmit}>
                  <div className="form-group">
                    <input
                      type="email"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errorsToDisplay.email,
                      })}
                      placeholder="Email Address"
                      name="email"
                      onChange={onChangeField}
                      value={state.email}
                    />
                    <div className="invalid-feedback">
                      {errorsToDisplay.email}
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errorsToDisplay.password,
                      })}
                      placeholder="Password"
                      name="password"
                      onChange={onChangeField}
                      value={state.password}
                    />
                    <div className="invalid-feedback">
                      {errorsToDisplay.password}
                    </div>
                  </div>
                  <input
                    type="submit"
                    className="btn btn-dark btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Login.propTypes = {
  loginUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
