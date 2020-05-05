import React from "react";
import propTypes from "prop-types";
import isEmpty from "../../utility/empty";

const ProfileAbout = (props) => {
  const { profile } = props;

  const firstname = profile.user.name.trim().split(" ")[0];

  const skills = profile.skills.map((skill, index) => (
    <div className="p-3" key={index}>
      <i className="fa fa-check"></i> {skill}
    </div>
  ));
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-light mb-3">
          {isEmpty(profile.bio) ? null : (
            <span>
              (<h3 className="text-center text-info">{firstname}'s Bio</h3>
              <p className="lead">{profile.bio}</p>
              <hr />)
            </span>
          )}
          <h3 className="text-center text-info">Skill Set</h3>
          <div className="row">
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {skills}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: propTypes.object.isRequired,
};

export default ProfileAbout;
