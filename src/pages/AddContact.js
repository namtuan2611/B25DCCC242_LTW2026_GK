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
    <div style={{ maxWidth: '480px', marginTop: '10px' }}>
      <h2>Thêm liên hệ mới</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          <label htmlFor="name" style={{ width: '120px', fontWeight: '500' }}>Họ tên</label>
          <input
            id="name"
            type="text"
            style={{ flex: 1, padding: '8px' }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          <label htmlFor="phone" style={{ width: '120px', fontWeight: '500' }}>Số điện thoại</label>
          <input
            id="phone"
            type="text"
            style={{ flex: 1, padding: '8px' }}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          <label htmlFor="email" style={{ width: '120px', fontWeight: '500' }}>Email</label>
          <input
            id="email"
            type="text"
            style={{ flex: 1, padding: '8px' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <label htmlFor="group" style={{ width: '120px', fontWeight: '500' }}>Nhóm</label>
          <select
            id="group"
            style={{ flex: 1, padding: '8px' }}
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          >
            {GROUPS.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        <button type="submit" style={{ padding: '8px 20px', cursor: 'pointer' }}>Thêm</button>
      </form>

      {errorMessage && (
        <p style={{ color: 'red', marginTop: '15px', fontWeight: 'bold' }}>{errorMessage}</p>
      )}
    </div>
  );
};

export default AddContact;