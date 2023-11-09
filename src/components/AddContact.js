import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddContact = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigateHome = useNavigate();

  const addContactHandler = (e) => {
    e.preventDefault();
    if (name === "" || email === "") {
      alert("Please fill all the fields!");
      return;
    }

    props.addContactHandler({ name: name, email: email });

    setName("");
    setEmail("");

    navigateHome("/");
  };
  return (
    <div className="ui main">
      <h2>Add Contacts</h2>
      <form className="ui form" onSubmit={addContactHandler}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={email}
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <button className="ui button blue">Add</button>
      </form>
    </div>
  );
};

export default AddContact;
