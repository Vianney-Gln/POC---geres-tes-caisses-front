// import react hooks
import React, { useContext } from 'react';
// import style css
import './menuLeft.scss';
// import components context
import ContextArticles from '../../context/ContextArticles';
import ContextStock from '../../context/ContextStock';

const MenuLeft = () => {
  // use context
  const contextArticles = useContext(ContextArticles); // context articles;
  const contextStock = useContext(ContextStock); // context stock
  const { articles } = contextArticles;
  const { setTypeStock } = contextStock;
  return (
    <div className="menu-left">
      <select onChange={(e) => setTypeStock(e.target.value)}>
        <option value="caisses-vrac">Caisses vracs</option>
        <option value="caisses-total">Caisses total</option>
        <option value="fagots">Fagots</option>
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
