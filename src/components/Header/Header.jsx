import React from 'react';
// style css
import './header.scss';
const Header = () => {
  return (
    <header className="container-header">
      <div className="logo">
        <p>Logo</p>
      </div>
      <div className="title">
        <h1>Gères tes caisses</h1>
      </div>
    </header>
  );
};

export default Header;
