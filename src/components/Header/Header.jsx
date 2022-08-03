//import react hooks
import React from 'react';
// import routing with react router dom
import { useNavigate } from 'react-router-dom';
// import style css
import './header.scss';
// import image
import logoIdea from '../../images/logo-idea.png';
const Header = () => {
  // useNavigate
  const navigate = useNavigate();
  return (
    <header className="container-header">
      <div className="logo">
        <img src={logoIdea} alt="logo-idea" onClick={() => navigate('/')} />
      </div>
      <div className="title">
        <h1>Gères tes caisses</h1>
      </div>
    </header>
  );
};

export default Header;
