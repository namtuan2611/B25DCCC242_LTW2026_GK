import React from 'react';
const Home = ({ contacts }) => {
  const totalContacts = contacts.length;
  const favoriteCount = contacts.reduce(
    (acc, curr) => (curr.favorite ? acc + 1 : acc),
    0
  );
  const gmailCount = contacts.filter((c) =>
    c.email ? c.email.toLowerCase().endsWith('@gmail.com') : false
  ).length;
  return (
    <div>
      <h1>Danh bạ</h1>
      <p>Tổng số liên hệ: {totalContacts}</p>
      <p>Số liên hệ yêu thích: {favoriteCount}</p>
      <p>Số liên hệ dùng Gmail: {gmailCount}</p>
    </div>
  );
};
export default Home;