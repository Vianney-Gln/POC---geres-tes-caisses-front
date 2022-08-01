//import react hooks
import React from 'react';
// import routing with react router dom
import { useNavigate } from 'react-router-dom';
// import style css
import './header.scss';
const Header = () => {
  // useNavigate
  const navigate = useNavigate();
  return (
    <header className="container-header">
      <div onClick={() => navigate('/')} className="logo">
        <p>Logo</p>
      </div>
      <div className="title">
        <h1>Gères tes caisses</h1>
      </div>
    </header>
  );
};

export default Header;
