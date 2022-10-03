import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './header.scss';
import logo from '../../images/logo-free.jpg';
import ContextArticles from '../../context/ContextArticles';
import ContextStock from '../../context/ContextStock';

const Header = () => {
  const navigate = useNavigate();

  const contextArticles = useContext(ContextArticles);
  const { setIdArticles } = contextArticles;
  const { setIdArticleCountForCountFunctions } = useContext(ContextStock);

  return (
    <header className="container-header">
      <div className="logo">
        <img
          src={logo}
          alt="logo-free"
          onClick={() => {
            setIdArticles(null);
            setIdArticleCountForCountFunctions(null);
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
