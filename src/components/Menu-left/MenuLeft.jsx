import React, { useState, useEffect } from 'react';
// style css
import './menuLeft.scss';
// service
import getArticles from '../../services/articles';

const MenuLeft = () => {
  const [articles, setArticles] = useState([]); // states getting articles

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
    <div className="menu-left">
      <select>
        <option>Caisses vracs</option>
        <option>Caisses total</option>
        <option>Fagots</option>
      </select>
      <ul className="list-article">
        {articles.length
          ? articles.map((article) => {
              return <li key={article.id}>{article.name}</li>;
            })
          : ''}
      </ul>
      <div className="quantity">
        <p>Nombre caisses:</p>
      </div>
    </div>
  );
};

export default MenuLeft;
