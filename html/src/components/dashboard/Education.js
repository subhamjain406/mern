import React from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profileAction";

const Education = (props) => {
  const onDeleteClick = (ed_id) => {
    props.deleteEducation(ed_id);
  };

  const education = props.education.map((ed) => (
    <tr key={ed._id}>
      <td>{ed.school}</td>
      <td>{ed.degree}</td>
      <td>
        <Moment format="YYYY/MM/DD">{ed.from}</Moment> -{" "}
        {ed.to === null ? (
          "Current"
        ) : (
          <Moment format="YYYY/MM/DD">{ed.to}</Moment>
        )}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => onDeleteClick(ed._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <div style={{ marginTop: "50px" }}>
      <h4 className="mb-2">Education Credentials</h4>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th>Degree</th>
            <th>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{education}</tbody>
      </table>
    </div>
  );
};

Education.propTypes = {
  deleteEducation: propTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
