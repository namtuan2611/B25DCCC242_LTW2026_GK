import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ContactDetail = ({ contacts }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isCalling, setIsCalling] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [callEndedMessage, setCallEndedMessage] = useState('');
  const contact = contacts.find((c) => c.id === Number(id));
  useEffect(() => {
    let timer = null;
    if (isCalling) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isCalling]);

  if (!contact) {
    return (
      <div>
        <p>Không tìm thấy liên hệ.</p>
        <button onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    );
  }
  const handleStartCall = () => {
    setSeconds(0);
    setCallEndedMessage('');
    setIsCalling(true);
  };
  const handleEndCall = () => {
    setIsCalling(false);
    setCallEndedMessage(`Cuộc gọi kết thúc sau ${seconds} giây`);
  };
  return (
    <div>
      <h2>Chi tiết liên hệ</h2>
      <p>Họ tên: {contact.name}</p>
      <p>Số điện thoại: {contact.phone}</p>
      <p>Email: {contact.email}</p>
      <p>Nhóm: {contact.group}</p>
      <p>Yêu thích: {contact.favorite ? 'Có' : 'Không'}</p>

      <div style={{ marginTop: '15px', marginBottom: '15px' }}>
        {!isCalling ? (
          <button onClick={handleStartCall}>Gọi</button>
        ) : (
          <div>
            <span>Đang gọi... {seconds} giây </span>
            <button onClick={handleEndCall}>Kết thúc</button>
          </div>
        )}
        {callEndedMessage && <p>{callEndedMessage}</p>}
      </div>

      <button onClick={() => navigate(-1)}>Quay lại</button>
    </div>
  );
};
export default ContactDetail;