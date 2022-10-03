import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getArticles from '../services/articles';

const ContextArticles = createContext(null);
export const ContextArticlesProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [areActivateFilters, setAreActivateFilters] = useState(true);
  const [idArticles, setIdArticles] = useState(null);
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
        areActivateFilters,
        setAreActivateFilters
      }}>
      {children}
    </ContextArticles.Provider>
  );
};

ContextArticlesProvider.propTypes = {
  children: PropTypes.node
};

export default ContextArticles;
