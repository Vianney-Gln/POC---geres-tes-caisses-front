// import react hooks
import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import style css
import './menuLeft.scss';
// import components context
import ContextArticles from '../../context/ContextArticles';
import ContextStock from '../../context/ContextStock';

const MenuLeft = () => {
  //useNavigate
  const navigate = useNavigate();
  // use context
  const contextArticles = useContext(ContextArticles); // context articles;
  const contextStock = useContext(ContextStock); // context stock
  const { articles, activate, idArticles, setIdArticles } = contextArticles;
  const { typeStock, setTypeStock, numberBoxes, setIdArticleCount } = contextStock;

  /**
   * Function generating the type of boxes as a string, depending of idArticles statement
   * @returns {string}
   */
  const generateStringCount = () => {
    switch (idArticles) {
      case 1:
        return ' 4m';
      case 2:
        return ' 4m20';
      case 3:
        return ' 4m60';
      default:
        return ' toutes caisses';
    }
  };

  return (
    <div className="menu-left">
      <select
        disabled={!activate}
        onChange={(e) => {
          setTypeStock(e.target.value);
          navigate('/');
        }}>
        <option value="caisses-vrac">Caisses vracs</option>
        <option value="caisses-total">Caisses total</option>
        <option value="fagots">Fagots</option>
      </select>
      <ul className="list-article">
        <li
          onClick={() => {
            setIdArticles(null);
            setIdArticleCount(null);
          }}
          className={
            activate && !idArticles
              ? 'unable current'
              : activate && idArticles
              ? 'unable'
              : !activate
              ? 'disable'
              : ''
          }>
          <Link to="/toutes caisses">Toutes caisses</Link>
        </li>
        {articles.length
          ? articles.map((article) => {
              return (
                <li
                  onClick={() => {
                    setIdArticles(article.id);
                    setIdArticleCount(article.id);
                  }}
                  className={
                    activate && idArticles === article.id
                      ? 'unable current'
                      : activate && idArticles !== article.id
                      ? 'unable'
                      : !activate
                      ? 'disable'
                      : ''
                  }
                  key={article.id}>
                  <Link to={`/${article.name}`}>{article.name}</Link>
                </li>
              );
            })
          : ''}
      </ul>
      <div className="quantity">
        <p>
          {typeStock === 'caisses-vrac'
            ? 'Nombre vrac' + generateStringCount() + ':'
            : typeStock === 'caisses-total'
            ? 'Nombre total' + generateStringCount() + ':'
            : typeStock === 'fagots'
            ? 'Nombre fagots' + generateStringCount() + ':'
            : ''}{' '}
        </p>
        <span>{numberBoxes}</span>
      </div>
    </div>
  );
};

export default MenuLeft;
