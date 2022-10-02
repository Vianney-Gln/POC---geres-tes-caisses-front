//import react hooks
import React, { useContext } from 'react';
// import routing with react router dom
import { useNavigate } from 'react-router-dom';
// import style css
import './header.scss';
// import image
import logo from '../../images/logo-free.jpg';
// Import component context
import ContextArticles from '../../context/ContextArticles';
import ContextStock from '../../context/ContextStock';

const Header = () => {
  // useNavigate
  const navigate = useNavigate();
  // Context
  const contextArticles = useContext(ContextArticles);
  const { setIdArticles } = contextArticles;
  const { setIdArticleCount } = useContext(ContextStock);

  return (
    <header className="container-header">
      <div className="logo">
        <img
          src={logo}
          alt="logo-free"
          onClick={() => {
            setIdArticles(null);
            setIdArticleCount(null);
            navigate('/');
          }}
        />
      </div>
      <div className="title">
        <h1>Gestion des caisses</h1>
      </div>
    </header>
  );
};

export default Header;
