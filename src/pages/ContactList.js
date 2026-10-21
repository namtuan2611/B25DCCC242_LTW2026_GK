import React, { useState } from 'react';
import FilterBar from '../components/FilterBar';
import ContactTable from '../components/ContactTable';
const ContactList = ({ contacts, onToggleFavorite, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('Tất cả');
  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm);

    const matchesGroup =
      selectedGroup === 'Tất cả' || contact.group === selectedGroup;

    return matchesSearch && matchesGroup;
  });
  return (
    <div>
      <h2>Danh sách liên hệ</h2>
      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
      />
      <p>Tìm thấy {filteredContacts.length} liên hệ</p>
      <ContactTable
        contacts={filteredContacts}
        onToggleFavorite={onToggleFavorite}
        onDelete={onDelete}
      />
    </div>
  );
};

export default ContactList;