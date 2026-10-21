import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GROUPS } from '../data';

const AddContact = ({ onAddContact }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [group, setGroup] = useState('Bạn bè');
  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!name.trim() || !phone.trim() || !email.trim()) {
      setErrorMessage('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(phone.trim())) {
      setErrorMessage('Số điện thoại phải gồm 10 chữ số và bắt đầu bằng số 0');
      return;
    }
    if (!email.includes('@')) {
      setErrorMessage('Email không hợp lệ');
      return;
    }
    onAddContact({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      group: group,
    });
    navigate('/contacts', { replace: true });
  };

  return (
    <div>
      <h2>Thêm liên hệ mới</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="name">Họ tên: </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="phone">Số điện thoại: </label>
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="group">Nhóm: </label>
          <select
            id="group"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          >
            {GROUPS.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        <button type="submit">Thêm</button>
      </form>

      {errorMessage && (
        <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>
      )}
    </div>
  );
};

export default AddContact;