import React, { useContext, useEffect } from 'react';
import ContextArticles from '../../context/ContextArticles';

const Reception = () => {
  const contextArticles = useContext(ContextArticles);
  const { setActivate } = contextArticles;

  // function desactivate the Menu-Left on component mounting
  useEffect(() => {
    setActivate(false);
  }, []);
  return <div>Reception</div>;
};

export default Reception;
