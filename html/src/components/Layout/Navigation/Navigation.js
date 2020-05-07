import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { logoutUser } from "../../../actions/authAction";
import { clearCurrentProfile } from "../../../actions/profileAction";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

const Navigation = (props) => {
  const { isAuthenticate, user } = props.auth;

  const logout = (event) => {
    event.preventDefault();
    props.clearCurrentProfile();
    props.logoutUser(props.history);
  };

  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Sign Up
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
    </ul>
  );

  const authLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/chat">
          Chat
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/feed">
          Post Feed
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/dashboard">
          Dashboard
        </Link>
      </li>
      <li className="nav-item">
        <a className="nav-link" onClick={logout}>
          <img
            src={user.profile_img}
            className="avatar-profile-image"
            alt={user.name}
          />
          Logout
        </a>
      </li>
    </ul>
  );

  return (
    <nav
      className="navbar navbar-expand-sm navbar-dark bg-dark mb-4"
      id="navigation"
    >
      <div className="container">
        <Link
          className={classnames("navbar-brand", {
            noPointer: isAuthenticate,
          })}
          to="/"
        >
          DeveloperConnector
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/profiles">
                {" "}
                Developers
              </Link>
            </li>
          </ul>
          {isAuthenticate ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  );
};

Navigation.propTypes = {
  logoutUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  withRouter(Navigation)
);
