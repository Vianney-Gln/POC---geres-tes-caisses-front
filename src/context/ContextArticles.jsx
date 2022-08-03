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
  const [activate, setActivate] = useState(true); // state active or inactive filter
  const [idArticles, setIdArticles] = useState(null); // state filters stock by articles
  const [articleName, setArticleName] = useState('');

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
    <ContextArticles.Provider
      value={{
        articles,
        idArticles,
        articleName,
        setArticleName,
        setIdArticles,
        activate,
        setActivate
      }}>
      {children}
    </ContextArticles.Provider>
  );
};

ContextArticlesProvider.propTypes = {
  children: PropTypes.node
};

export default ContextArticles;
