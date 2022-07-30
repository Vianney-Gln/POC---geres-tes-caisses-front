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
  return <ContextArticles.Provider value={{ articles }}>{children}</ContextArticles.Provider>;
};

ContextArticlesProvider.propTypes = {
  children: PropTypes.node
};

ContextArticles.propTypes = {
  articles: PropTypes.array
};
export default ContextArticles;
