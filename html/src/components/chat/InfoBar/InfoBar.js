import React from "react";
import onlineIcon from "../../../assets/img/onlineIcon.png";
import closeicon from "../../../assets/img/closeIcon.png";
import "./InfoBar.css";

const InfoBar = (props) => {
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} />
        <h3>{props.room}</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/">
          <img src={closeicon} alt="closeIcon"></img>
        </a>
      </div>
    </div>
  );
};

export default InfoBar;
