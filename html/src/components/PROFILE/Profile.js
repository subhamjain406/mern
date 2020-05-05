import React, { useEffect } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileCreds from "./ProfileCreds";
import ProfileAbout from "./ProfileAbout";
import ProfileGit from "./ProfileGit";
import Spinner from "../common/spinner";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { getProfileFromHandle } from "../../actions/profileAction";

const Profile = (props) => {
  useEffect(() => {
    if (props.match.params.handle) {
      props.getProfileFromHandle(props.match.params.handle);
    }
  }, []);

  const { profile, loading } = props.profile;

  let profileContent;

  if (profile === null || loading) {
    profileContent = <Spinner />;
  } else {
    if (Object.keys(profile).length > 0) {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
            </div>
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds
            experience={profile.experience}
            education={profile.education}
          />
          {profile.githubusername ? (
            <ProfileGit username={profile.githubusername} />
          ) : null}
        </div>
      );
    }
  }

  return (
    <div className="profile">
      <div className="container">
        <div className="row">
          <div className="col-md-12">{profileContent}</div>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  profile: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileFromHandle })(Profile);
