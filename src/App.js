import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Layout from './components/Layout';
import Home from './pages/Homes';
import ContactList from './pages/ContactList';
import AddContact from './pages/AddContact';
import ContactDetail from './pages/ContactDetail';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const localData = localStorage.getItem('gk_contacts');
    if (localData) {
      setContacts(JSON.parse(localData));
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    axios
      .get('/data/contacts.json', { signal: controller.signal })
      .then((res) => {
        setContacts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          setError('Không tải được dữ liệu.');
          setLoading(false);
        }
      });
    return () => {
      controller.abort();
    };
  }, []);
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('gk_contacts', JSON.stringify(contacts));
    }
  }, [contacts, loading]);
  const handleToggleFavorite = (id) => {
    setContacts((prevContacts) =>
      prevContacts.map((c) =>
        c.id === id ? { ...c, favorite: !c.favorite } : c
      )
    );
  };
  const handleDelete = (id) => {
    setContacts((prevContacts) => prevContacts.filter((c) => c.id !== id));
  };
  const handleAddContact = (newContactData) => {
    setContacts((prevContacts) => {
      const maxId = prevContacts.reduce(
        (max, c) => (c.id > max ? c.id : max),
        0
      );
      const newContact = {
        id: maxId + 1,
        ...newContactData,
        favorite: false,
      };
      return [...prevContacts, newContact];
    });
  };
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            loading ? (
              <p>Đang tải...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <Home contacts={contacts} />
            )
          }
        />
        <Route
          path="contacts"
          element={
            loading ? (
              <p>Đang tải...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <ContactList
                contacts={contacts}
                onToggleFavorite={handleToggleFavorite}
                onDelete={handleDelete}
              />
            )
          }
        />
        <Route
          path="contacts/new"
          element={<AddContact onAddContact={handleAddContact} />}
        />
        <Route
          path="contacts/:id"
          element={<ContactDetail contacts={contacts} />}
        />
      </Route>
    </Routes>
  );
};
export default App;