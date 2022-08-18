import React, { useContext, useEffect } from 'react';
// import style css
import './bundling.scss';
// import Context
import ContextArticles from '../../context/ContextArticles';
const Bundling = () => {
  const contextArticle = useContext(ContextArticles);
  const { setActivate } = contextArticle;

  useEffect(() => {
    setActivate(false);
  }, []);

  return <div className="container-bundling">Bundling</div>;
};

export default Bundling;
