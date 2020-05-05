import React from "react";
import Moment from "react-moment";

const ProfileCreds = (props) => {
  const { experience, education } = props;

  const expList = experience.map((exp) => (
    <li className="list-group-item" key={exp._id}>
      <h4>{exp.company}</h4>
      <p>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
        {exp.to === null ? (
          "Current"
        ) : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </p>
      <p>
        <strong>Position:</strong> {exp.title}
      </p>
      <p>
        {exp.location === null ? null : (
          <span>
            <strong>Location: </strong>
            {exp.location}
          </span>
        )}
      </p>
      <p>
        {exp.desc === "" ? null : (
          <span>
            <strong>Description: </strong>
            {exp.desc}
          </span>
        )}
      </p>
    </li>
  ));

  const eduList = education.map((ed) => (
    <li className="list-group-item" key={ed._id}>
      <h4>{ed.school}</h4>
      <p>
        <Moment format="YYYY/MM/DD">{ed.from}</Moment> -{" "}
        {ed.to === null ? (
          <span>Current</span>
        ) : (
          <Moment format="YYYY/MM/DD">{ed.to}</Moment>
        )}
      </p>
      <p>
        <strong>Degree: </strong>
        {ed.degree}
      </p>
      <p>
        {ed.fieldofstudy === null ? null : (
          <span>
            {" "}
            <strong>Field Of Study: </strong>
            {ed.fieldofstudy}
          </span>
        )}
      </p>
      <p>
        {ed.desc === "" ? null : (
          <span>
            <strong>Description:</strong>
            {ed.desc}
          </span>
        )}
      </p>
    </li>
  ));

  return (
    <div className="row">
      <div className="col-md-6">
        <h3 className="text-center text-info">Experience</h3>
        <ul className="list-group">{expList}</ul>
      </div>
      <div className="col-md-6">
        <h3 className="text-center text-info">Education</h3>
        <ul className="list-group">{eduList}</ul>
      </div>
    </div>
  );
};

export default ProfileCreds;
