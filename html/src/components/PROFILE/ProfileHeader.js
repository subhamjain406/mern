import React from "react";
import isEmpty from "../../utility/empty";
import propTypes from "prop-types";

const ProfileHeader = (props) => {
  const { profile } = props;
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-info text-white mb-3">
          <div className="row">
            <div className="col-4 col-md-3 m-auto">
              <img
                className="rounded-circle"
                src={profile.user.profile_img}
                alt=""
                style={{ width: "120px", height: "120px" }}
              />
            </div>
          </div>
          <div className="text-center">
            <h1 className="display-4 text-center">{profile.user.name}</h1>
            <p className="lead text-center">
              {profile.status}{" "}
              {!isEmpty(profile.company) ? null : (
                <span>at {profile.company}</span>
              )}
            </p>
            <p>
              {!isEmpty(profile.location) ? null : (
                <span>{profile.location}</span>
              )}
            </p>
            <p>
              {isEmpty(profile.website) ? null : (
                <a className="text-white p-2" href={profile.website}>
                  <i className="fas fa-globe fa-2x"></i>
                </a>
              )}

              {isEmpty(profile.social && profile.social.twitter) ? null : (
                <a className="text-white p-2" href={profile.social.twitter}>
                  <i className="fab fa-twitter fa-2x"></i>
                </a>
              )}

              {isEmpty(profile.social && profile.social.facebook) ? null : (
                <a className="text-white p-2" href={profile.social.facebook}>
                  <i className="fab fa-facebook fa-2x"></i>
                </a>
              )}

              {isEmpty(profile.social && profile.social.linkedin) ? null : (
                <a className="text-white p-2" href={profile.social.linkedin}>
                  <i className="fab fa-linkedin fa-2x"></i>
                </a>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileHeader.propTypes = {
  profile: propTypes.object.isRequired,
};

export default ProfileHeader;
