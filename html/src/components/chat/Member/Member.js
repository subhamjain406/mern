import React from "react";
import classnames from "classnames";

const Member = (props) => {
  const { user, click, selected } = props;
  const dualEvent = (user, event) => {
    click(user, event);
  };
  return (
    <div>
      <a
        className={classnames(
          "list-group-item list-group-item-action list-group-item-light rounded-0",
          {
            active: selected,
          }
        )}
        onClick={(event) => dualEvent(user, event)}
        id={user._id}
      >
        <div className="media">
          <img
            src={user.profile_img}
            alt="user"
            width="100px"
            height="100px"
            className="rounded-circle w-25"
          />
          <div className="media-body ml-4 my-auto">
            <div className="d-flex align-items-center justify-content-between mb-1">
              <h6 className="mb-0">{user.name}</h6>
              {/* <small className="small font-weight-bold text-success">
                Online
              </small> */}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Member;
