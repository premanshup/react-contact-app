import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
  const inputSearch = useRef("");
  const getSearchTerm = () => {
    props.searchHandler(inputSearch.current.value);
  };
  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        key={contact.id}
        contact={contact}
        removeContactHandler={props.removeContactHandler}
      />
    );
  });
  return (
    <div className="ui main">
      <h2>
        Contact List
        <Link to="/add">
          <button className="ui button blue right">Add Contact</button>
        </Link>
      </h2>
      <div className="ui search ">
        <div className="ui icon input">
          <input
            ref={inputSearch}
            type="text"
            value={props.term}
            placeholder="Search Contact"
            className="prompt"
            onChange={getSearchTerm}
          />
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">
        {renderContactList.length > 0
          ? renderContactList
          : "No Contacts Found!!"}
      </div>
    </div>
  );
};

export default ContactList;
