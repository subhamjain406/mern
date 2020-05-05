import React, { useEffect } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import Spinner from "../common/spinner";
import { getProfiles } from "../../actions/profileAction";
import ProfileItem from "./ProfileItem";

const Profiles = (props) => {
  useEffect(() => {
    props.getProfiles();
  }, []);

  const { profiles, loading } = props.profile;

  let profileItem;

  if (profiles === null || loading) {
    profileItem = <Spinner />;
  } else {
    if (profiles.length > 0) {
      profileItem = profiles.map((profile) => (
        <ProfileItem key={profile._id} profile={profile} />
      ));
    } else {
      profileItem = <h4>no profile is found</h4>;
    }
  }

  return (
    <div className="profiles">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Developer Profiles</h1>
            <p className="lead text-center">
              Browse and connect with developers
            </p>
            {profileItem}
          </div>
        </div>
      </div>
    </div>
  );
};

Profiles.propTypes = {
  getProfiles: propTypes.func.isRequired,
  profile: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
