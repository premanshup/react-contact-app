import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateContact = (props) => {
  const location = useLocation();
  const navigateHome = useNavigate();
  const { id, name, email } = location.state.contact;
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);

  const update = (e) => {
    e.preventDefault();
    if (newName === "" || newEmail === "") {
      alert("Please fill all the fields!");
      return;
    }
    props.updateContactHandler({ id: id, name: newName, email: newEmail });

    setNewName("");
    setNewEmail("");
    navigateHome("/");
  };
  return (
    <div className="ui main">
      <h2>Update Contact</h2>
      <form className="ui form" onSubmit={update}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={newName}
            placeholder="Name"
            onChange={(e) => {
              setNewName(e.target.value);
            }}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={newEmail}
            placeholder="Email"
            onChange={(e) => {
              setNewEmail(e.target.value);
            }}
          />
        </div>
        <button className="ui button blue">Update</button>
      </form>
    </div>
  );
};

export default UpdateContact;
