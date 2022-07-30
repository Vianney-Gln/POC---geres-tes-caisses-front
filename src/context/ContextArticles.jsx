// imports hooks
import React, { createContext, useState, useEffect } from 'react';
// import proptypes
import PropTypes from 'prop-types';
// import services
import getArticles from '../services/articles';
// create context
const ContextArticles = createContext(null);
export const ContextArticlesProvider = ({ children }) => {
  // States
  const [articles, setArticles] = useState([]); // state getting differents articles
  const [typeStock, setTypeStock] = useState('caisses-vrac'); // state getting the type of stock (vrac, total, fagots) --- default caisses-vrac

  // Function getting all articles and update articles state
  useEffect(() => {
    getArticles()
      .then((result) => {
        setArticles(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <ContextArticles.Provider value={{ articles, typeStock, setTypeStock }}>
      {children}
    </ContextArticles.Provider>
  );
};

ContextArticlesProvider.propTypes = {
  children: PropTypes.node
};

ContextArticles.propTypes = {
  articles: PropTypes.array,
  typeStock: PropTypes.string,
  setTypeStock: PropTypes.func
};
export default ContextArticles;
