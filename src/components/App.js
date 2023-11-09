import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import api from "../api/contacts";
import { v4 } from "uuid";
import Header from "./Header";
import ContactList from "./ContactList";
import AddContact from "./AddContact";
import UpdateContact from "./UpdateContact";
import ContactDetail from "./ContactDetail";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTearm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  // Retrieve contacts.
  const retrieveContacts = async () => {
    const response = await api.get("contacts");
    return response.data;
  };

  const addContactHandler = async (contact) => {
    const request = {
      id: v4(),
      ...contact,
    };

    const response = await api.post("contacts", request);

    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);

    setContacts([...contacts, response.data]);
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };

    getAllContacts();
  }, []);

  useEffect(() => {
    if (contacts) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts || []));
    }
  }, [contacts]);

  return (
    <div className="ui container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/add"
            element={<AddContact addContactHandler={addContactHandler} />}
          />
          <Route
            path="/"
            element={
              <ContactList
                contacts={searchTearm.length > 0 ? searchResults : contacts}
                removeContactHandler={removeContactHandler}
                term={searchTearm}
                searchHandler={searchHandler}
              />
            }
          />
          <Route path="/contact/:id" element={<ContactDetail />} />
          <Route
            path="/update/:id"
            element={
              <UpdateContact updateContactHandler={updateContactHandler} />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
