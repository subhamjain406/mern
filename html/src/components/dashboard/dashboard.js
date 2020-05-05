import React, { useEffect } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { getCurrentProfile, deleteAccount } from "../../actions/profileAction";
import Spinner from "../common/spinner";
import { Link } from "react-router-dom";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = (props) => {
  useEffect(() => {
    props.getCurrentProfile();
  }, []);

  const { user } = props.auth;
  const { profile, loading } = props.profile;

  const deleteAccount = () => {
    props.deleteAccount();
  };

  let dashboardContent;

  if (profile === null || loading) {
    dashboardContent = <Spinner />;
  } else {
    if (Object.keys(profile).length > 0) {
      dashboardContent = (
        <div>
          <p className="lead text-muted">
            Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
          </p>
          <ProfileActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div style={{ marginTop: "60px" }}>
            <button className="btn btn-danger" onClick={deleteAccount}>
              Delete My Account
            </button>
          </div>
        </div>
      );
    } else {
      dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome {user.name}</p>
          <p>You have not setup a profile , Please add some info.</p>
          <Link to="/create-profile" className="btn btn-lg btn-info">
            Create Profile
          </Link>
        </div>
      );
    }
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4">Dashboard</h1>
            {dashboardContent}
          </div>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: propTypes.func.isRequired,
  profile: propTypes.object.isRequired,
  auth: propTypes.object.isRequired,
  deleteAccount: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
