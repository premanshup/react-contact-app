import React from "react";
import User from "../images/user.png";
import { Link } from "react-router-dom";

const ContactCard = (props) => {
  const { id, name, email } = props.contact;
  return (
    <div className="item">
      <Link to={`/contact/${id}`} state={{ contact: props.contact }}>
        <div className="content left floated">
          <img src={User} className="ui avatar image" alt={`User: ${name}`} />
          <div className="header">{name}</div>
          <div>{email}</div>
        </div>
      </Link>
      <Link to={`/update/${id}`} state={{ contact: props.contact }}>
        <i
          className="edit alternate outline icon right floated"
          style={{ color: "blue", marginTop: "7px" }}
        ></i>
      </Link>
      <i
        className="trash alternate outline icon right floated"
        style={{ color: "red", marginTop: "7px" }}
        onClick={(e) => {
          props.removeContactHandler(id);
        }}
      ></i>
    </div>
  );
};

export default ContactCard;
