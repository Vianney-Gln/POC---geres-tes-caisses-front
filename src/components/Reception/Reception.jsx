import React, { useContext, useEffect } from 'react';
// import context
import ContextArticles from '../../context/ContextArticles';
// import style css
import './reception.scss';

const Reception = () => {
  const contextArticles = useContext(ContextArticles);
  const { setActivate } = contextArticles;

  // function desactivate the Menu-Left on component mounting
  useEffect(() => {
    setActivate(false);
  }, []);
  return <div className="container-reception">Reception</div>;
};

export default Reception;
